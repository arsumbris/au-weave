// All graph interpretation comes from the engine. No filesystem scan or saved membership.
import { isAbsolute, relative } from 'node:path'
const CANDIDATE = 'candidate::au-weave'
const EXTRACTION = 'extraction::au-weave'
const MAP = 'map::au-base-types'
const qualify = (name, repo) => name.includes('::') ? name : `${name}::${repo}`
const sameType = (a, b) => a.name === b.name && a.hash === b.hash
const fail = (message) => { throw new Error(message) }

/** @param {import('@arsumbris/au-mcp-sdk').PluginContext} ctx */
export function createPlugin(ctx) {
  return {
    async invoke(input) {
      try {
        if (!input || typeof input.repo !== 'string' || !input.repo.trim() ||
            Object.keys(input).some(key => !['repo', 'include_mapped'].includes(key)) ||
            (input.include_mapped !== undefined && typeof input.include_mapped !== 'boolean')) {
          fail('Supply a repository name and, optionally, include_mapped: true.')
        }
        const broker = ctx.broker
        if (!broker?.available()) fail('Map coverage needs a running engine and broker: read.')

        // One invocation uses one engine version; a changing graph cannot yield a clean audit.
        let version
        const cache = new Map()
        async function read(op, args = {}) {
          const key = JSON.stringify([op, args])
          if (!cache.has(key)) cache.set(key, (async () => {
            const frame = await broker.read(op, args)
            if (frame.type === 'error') fail(frame.message ?? `${op} failed.`)
            if (frame.ready !== true || !Number.isInteger(frame.version)) {
              fail('The engine is not ready. Retry map coverage after it finishes building.')
            }
            version ??= frame.version
            if (frame.version !== version) fail('The graph changed during the check. Run map coverage again.')
            return frame.result // The MCP broker unwraps the native read envelope.
          })())
          return cache.get(key)
        }
        async function rows(op, args) {
          const result = await read(op, args)
          if (!Array.isArray(result)) fail(`${op} returned an incomplete result.`)
          return result
        }
        async function closure(name) {
          const result = await rows('type_closure', { name })
          if (result.length !== 1) fail(`Cannot resolve type ${name}.`)
          return result[0]
        }

        const members = await rows('members')
        if (!members.some(member => member.repo === input.repo && !member.disabled)) {
          fail(`Repository ${input.repo} is not mounted.`)
        }
        const counts = await read('instance_counts', { repo: input.repo })
        if (counts?.aborted_at_load !== false) {
          fail('The engine could not index the graph. Repair its diagnostics before checking coverage.')
        }
        // A malformed extraction can be missing from the roster altogether.
        const [diagnostic] = await rows('diagnostics', { repo: input.repo, severity: 'error', limit: 1 })
        if (diagnostic) {
          fail(`Repair graph errors before checking coverage: ${diagnostic.span?.file ?? input.repo}: ${diagnostic.message}`)
        }
        const owners = [...members].sort((a, b) => b.root.length - a.root.length)
        function ownerOf(path) {
          return owners.find(member => {
            const local = relative(member.root, path)
            return local !== '..' && !local.startsWith('../') && !local.startsWith('..\\') && !isAbsolute(local)
          })?.repo
        }
        const candidateType = (await closure(CANDIDATE)).identity
        await closure(EXTRACTION)
        await closure(MAP)
        const extractions = (await rows('instances_of', {
          type: EXTRACTION, origins: ['file'], instance: true,
        })).filter(row => row.member === input.repo)
        const maps = (await rows('instances_of', {
          type: MAP, origins: ['file'],
        })).filter(row => row.member === input.repo)

        // Use the structured shape and its declaring owner, including inherited profile fields.
        async function isCandidate(shape, owner) {
          if (['record', 'reference', 'inline-or-reference'].includes(shape?.kind)) {
            if (['any', 'file'].includes(shape.name)) return false
            const type = await closure(qualify(shape.name, owner))
            return type.ancestors.some(ancestor => sameType(ancestor, candidateType))
          }
          if (['union', 'intersection', 'compound-reference'].includes(shape?.kind)) {
            const branches = await Promise.all(shape.branches.map(branch => isCandidate(
              typeof branch === 'string' ? { kind: 'record', name: branch } : branch, owner,
            )))
            return shape.kind === 'intersection' || shape.op === 'intersection'
              ? branches.some(Boolean) : branches.every(Boolean)
          }
          return false
        }

        const nodes = new Map()
        const outsideRepo = new Set()
        async function addResolution(path, spans, required, recordId) {
          const edges = (await rows('references_out', { path })).filter(edge =>
            edge.field === 'resolves_to' && edge.surface !== 'docstring' &&
            (recordId !== undefined ? edge.source_block_id === recordId :
              spans.some(span => edge.span.start >= span.start && edge.span.end <= span.end)))
          if (!edges.length && required) fail(`Cannot read a candidate's resolves_to in ${path}.`)
          if (new Set(edges.map(edge => edge.resolved)).size > 1) {
            fail(`Candidate in ${path} has multiple resolution targets; inspect its record.`)
          }
          for (const edge of edges) {
            if (!edge.resolved || edge.commit || edge.block_id?.referent) {
              fail(`Candidate resolution in ${path} does not reach a live node: ${edge.target}.`)
            }
            const owner = ownerOf(edge.resolved)
            if (!owner) fail(`Cannot find the owner of ${edge.resolved}.`)
            if (owner !== input.repo) outsideRepo.add(edge.resolved)
            else if (!nodes.has(edge.resolved)) nodes.set(edge.resolved, new Set())
          }
        }

        for (const extraction of extractions) {
          const view = extraction.instance
          if (!view?.resolved || !Array.isArray(view.effective_values)) {
            fail(`Cannot read the extraction contract in ${extraction.path}.`)
          }
          if (view.diagnostics?.some(diagnostic => diagnostic.severity === 'error')) {
            fail(`Repair extraction errors in ${extraction.path} before checking coverage.`)
          }
          const fields = new Set()
          for (const claim of extraction.claim) {
            const profile = await closure(qualify(claim, extraction.member))
            for (const field of profile.fields) {
              if (field.shape_ast?.kind === 'list' &&
                  await isCandidate(field.shape_ast.inner, field.origin.repo)) fields.add(field.name)
            }
          }
          for (const group of view.effective_values.filter(group => fields.has(group.field))) {
            for (const container of group.containers) {
              const value = container.value
              if (value.kind === 'inline_record') {
                const target = value.value.resolves_to
                if (target == null) continue // Mining and pending weave candidates have no node yet.
                const spans = container.contributions.map(item => item.location.byte_range)
                await addResolution(extraction.path, spans, true)
              } else if (value.kind === 'reference') {
                // Candidate lists may also hold references to candidate files or typed records.
                const target = value.target + (value.repo ? `::${value.repo}` : '')
                if (value.block_id?.referent) {
                  const block = await read('resolve_block_id', {
                    target, block_id: value.block_id.id, origin: extraction.path,
                  })
                  if (!block || block.kind === 'marker') fail(`Cannot read candidate ${target}.`)
                  const candidate = await read('instance', { path: block.file_path })
                  if (!candidate?.resolved || candidate.diagnostics?.some(d => d.severity === 'error')) {
                    fail(`Cannot read a valid candidate in ${block.file_path}.`)
                  }
                  // A record's resolution span locates its ID, not the enclosing record.
                  await addResolution(block.file_path, [block.span], false,
                    block.kind === 'record' ? value.block_id.id : undefined)
                } else {
                  const resolved = await read('resolve_target', { target, origin: extraction.path })
                  if (!resolved) fail(`Cannot read candidate ${target}.`)
                  const candidate = await read('instance', { path: resolved.path })
                  if (!candidate?.resolved || candidate.diagnostics?.some(d => d.severity === 'error')) {
                    fail(`Cannot read a valid candidate in ${resolved.path}.`)
                  }
                  for (const field of candidate.effective_values.filter(field => field.field === 'resolves_to')) {
                    for (const value of field.containers) {
                      await addResolution(resolved.path, value.contributions.map(item => item.location.byte_range), true)
                    }
                  }
                }
              } else fail(`Invalid candidate value in ${extraction.path}.`)
            }
          }
        }

        for (const map of maps) {
          for (const edge of await rows('references_out', { path: map.path })) {
            if (edge.surface === 'body' && !edge.commit && !edge.block_id?.referent &&
                edge.resolved !== map.path) nodes.get(edge.resolved)?.add(map.path)
          }
        }
        const all = [...nodes].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
          .map(([node, membership]) => ({ node, maps: [...membership].sort() }))
        return { content: {
          repo: input.repo,
          checked: all.length,
          unmapped: all.filter(row => row.maps.length === 0).length,
          nodes: input.include_mapped ? all : all.filter(row => row.maps.length === 0),
          ...(outsideRepo.size ? { outside_repo: [...outsideRepo].sort() } : {}),
        } }
      } catch (error) {
        return { content: error instanceof Error ? error.message : String(error), isError: true }
      }
    },
  }
}
