import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createPlugin } from '../scripts/weave-map-coverage.mjs'

const graph = '/vault/graph'
const extraction = `${graph}/extraction.md`
const a = `${graph}/A.md`
const b = `${graph}/B.md`
const map = `${graph}/map.md`
const identity = (name, repo) => ({ name, repo, hash: `${repo}/${name}` })
const candidate = identity('candidate', 'au-weave')
const shape = { kind: 'list', inner: { kind: 'inline-or-reference', name: 'finding-candidate' } }

function inline(target, start) {
  return {
    value: { kind: 'inline_record', value: { resolves_to: target } },
    contributions: [{ location: { byte_range: { start, end: start + 90 } } }],
  }
}
function resolution(target, start, extra = {}) {
  return {
    field: 'resolves_to', surface: 'frontmatter', kind: 'field-reference',
    target: target ?? 'Missing', resolved: target, span: { start, end: start + 5 }, ...extra,
  }
}
function body(target, extra = {}) {
  return { surface: 'body', kind: 'navigational', resolved: target, ...extra }
}

function fixture() {
  const profile = identity('review', 'domain')
  const rows = [{
    path: extraction, member: 'graph', claim: ['review::domain'],
    instance: {
      resolved: true, diagnostics: [],
      effective_values: [
        { field: 'findings', containers: [inline('[[A]]', 10), inline('[[B]]', 110), inline(null, 210)] },
        // A similarly named field outside the profile contract must not become a node.
        { field: 'metadata', containers: [inline('[[Noise]]', 310)] },
      ],
    },
  }]
  const maps = [{ path: map, member: 'graph', claim: ['room::domain'] }]
  const edges = new Map([
    [extraction, [resolution(a, 20), resolution(b, 120), resolution(`${graph}/Noise.md`, 320)]],
    [map, [body(a)]],
  ])
  const types = new Map([
    ['candidate::au-weave', { identity: candidate, ancestors: [candidate], fields: [] }],
    ['extraction::au-weave', { identity: identity('extraction', 'au-weave'), fields: [] }],
    ['map::au-base-types', { identity: identity('map', 'au-base-types'), fields: [] }],
    ['review::domain', {
      identity: profile, fields: [{ name: 'findings', shape_ast: shape, origin: identity('base-review', 'domain') }],
    }],
    ['finding-candidate::domain', { identity: identity('finding-candidate', 'domain'), ancestors: [candidate] }],
  ])
  const calls = []
  const members = [{ repo: 'graph', root: graph }, { repo: 'domain', root: '/vocabulary' }]
  const targets = new Map()
  const blocks = new Map()
  const instances = new Map()
  const state = { version: 1, ready: true, override: null }
  const broker = {
    available: () => true,
    async read(op, args = {}) {
      calls.push([op, args])
      if (state.override) {
        const result = state.override(op, args)
        if (result) return result
      }
      let result
      if (op === 'members') result = members
      else if (op === 'instance_counts') result = { aborted_at_load: false }
      else if (op === 'diagnostics') {
        assert.deepEqual(args, { repo: 'graph', severity: 'error', limit: 1 })
        result = []
      } else if (op === 'type_closure') result = types.has(args.name) ? [types.get(args.name)] : []
      else if (op === 'instances_of') {
        assert.deepEqual(args.origins, ['file']) // Nested maps never count as map files.
        if (args.type === 'extraction::au-weave') result = rows
        else if (args.type === 'map::au-base-types') result = maps
        else assert.fail(`Unexpected type ${args.type}`)
      } else if (op === 'references_out') result = edges.get(args.path) ?? []
      else if (op === 'resolve_target') result = targets.get(args.target) ?? null
      else if (op === 'resolve_block_id') result = blocks.get(args.block_id) ?? null
      else if (op === 'instance') result = instances.get(args.path) ?? null
      else assert.fail(`Unexpected read ${op}`)
      return { type: 'response', ready: state.ready, version: state.version, result }
    },
    mutate() { assert.fail('Coverage must never mutate the graph') },
  }
  return { plugin: createPlugin({ broker }), rows, maps, edges, calls, members, targets, blocks, instances, state, types }
}

test('defaults to unmapped nodes; all view includes distinct maps and deduplicates resolutions', async () => {
  const f = fixture()
  f.rows[0].instance.effective_values[0].containers.push(inline('[[A]]', 410))
  // Inferred imported candidates can have this coarser edge kind in the live engine.
  f.edges.get(extraction).push(resolution(a, 420, { kind: 'field-string-wikilink' }))
  f.edges.get(map).push(body(a))
  const anotherMap = `${graph}/human map.md`
  f.maps.push({ path: anotherMap, member: 'graph', claim: ['curated-room::domain'] })
  f.edges.set(anotherMap, [body(a, { kind: 'contributing', field: 'route' })])
  const missing = await f.plugin.invoke({ repo: 'graph' })
  assert.deepEqual(missing, { content: { repo: 'graph', checked: 2, unmapped: 1, nodes: [{ node: b, maps: [] }] } })
  const all = await f.plugin.invoke({ repo: 'graph', include_mapped: true })
  assert.deepEqual(all.content.nodes, [{ node: a, maps: [anotherMap, map].sort() }, { node: b, maps: [] }])
  assert.equal(f.calls.filter(([op, args]) => op === 'references_out' && args.path === extraction).length, 2)
})

test('metadata, historical pins, block values and maps in other repos do not cover a node', async () => {
  const f = fixture()
  f.edges.set(map, [
    body(a, { surface: 'frontmatter' }), body(a, { surface: 'docstring' }),
    body(a, { commit: 'abcdef' }), body(a, { block_id: { id: 'record', referent: true } }),
  ])
  f.maps.push({ path: '/vocabulary/map.md', member: 'domain' })
  f.edges.set('/vocabulary/map.md', [body(a), body(b)])
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.unmapped, 2)
  f.edges.get(map).push(body(a, { block_id: { id: 'paragraph', referent: false } }))
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.unmapped, 1)
})

test('a removed map link is reflected on the next invocation', async () => {
  const f = fixture()
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.unmapped, 1)
  f.edges.set(map, [])
  f.state.version++
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.unmapped, 2)
})

test('inherited custom candidate lists work without concepts, claims or entities', async () => {
  const f = fixture()
  f.types.set('finding-candidate::domain', { ancestors: [identity('candidate', 'unrelated')] })
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.checked, 0)
  f.types.set('finding-candidate::domain', { ancestors: [candidate] })
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.checked, 2)
})

test('referenced candidate files and typed records contribute their resolutions', async () => {
  const f = fixture()
  const candidateFile = '/vocabulary/candidate.md'
  f.targets.set('candidate::domain', { path: candidateFile })
  // Native record resolution locates the ID scalar, not the whole record.
  f.blocks.set('pick', { file_path: candidateFile, kind: 'record', span: { start: 100, end: 104 } })
  f.edges.set(candidateFile, [resolution(a, 20), resolution(b, 120, { source_block_id: 'pick' })])
  f.instances.set(candidateFile, { resolved: true, effective_values: [
    { field: 'resolves_to', containers: [inline('[[A]]', 10)] },
  ] })
  f.rows[0].instance.effective_values = [{ field: 'findings', containers: [
    { value: { kind: 'reference', target: 'candidate', repo: 'domain' } },
    { value: { kind: 'reference', target: 'candidate', repo: 'domain', block_id: { id: 'pick', referent: true } } },
  ] }]
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.checked, 2)
})

test('referenced records distinguish pending candidates from invalid records', async () => {
  const f = fixture()
  const candidateFile = '/vocabulary/candidate.md'
  f.blocks.set('pick', { file_path: candidateFile, kind: 'record', span: { start: 100, end: 104 } })
  f.rows[0].instance.effective_values = [{ field: 'findings', containers: [
    { value: { kind: 'reference', target: 'candidate', repo: 'domain', block_id: { id: 'pick', referent: true } } },
  ] }]
  f.edges.set(candidateFile, [resolution(a, 20, { source_block_id: 'another-pick' })])
  f.instances.set(candidateFile, { resolved: true, diagnostics: [] })
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).content.checked, 0)
  f.instances.get(candidateFile).diagnostics.push({ severity: 'error', code: 'field-shape-mismatch' })
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).isError, true)
})

test('referenced typed fences use their full span and ignore neighboring records', async () => {
  const f = fixture()
  const candidateFile = '/vocabulary/candidate.md'
  f.blocks.set('pick', { file_path: candidateFile, kind: 'typed_block', span: { start: 100, end: 200 } })
  f.rows[0].instance.effective_values = [{ field: 'findings', containers: [
    { value: { kind: 'reference', target: 'candidate', repo: 'domain', block_id: { id: 'pick', referent: true } } },
  ] }]
  f.edges.set(candidateFile, [resolution(a, 20), resolution(b, 120)])
  f.instances.set(candidateFile, { resolved: true, diagnostics: [] })
  assert.deepEqual((await f.plugin.invoke({ repo: 'graph' })).content.nodes, [{ node: b, maps: [] }])
})

test('an aborted index cannot be mistaken for an empty graph', async () => {
  const f = fixture()
  f.rows.length = 0
  f.state.override = op => op === 'instance_counts'
    ? { type: 'response', ready: true, version: 1, result: { aborted_at_load: true } } : null
  const result = await f.plugin.invoke({ repo: 'graph' })
  assert.equal(result.isError, true)
  assert.match(result.content, /could not index/)
})

test('parse errors cannot silently remove an extraction from the audit', async () => {
  const f = fixture()
  f.rows.length = 0
  f.state.override = op => op === 'diagnostics' ? {
    type: 'response', ready: true, version: 1,
    result: [{ code: 'yaml-parse-error', severity: 'error', span: { file: extraction }, message: 'Invalid YAML' }],
  } : null
  const result = await f.plugin.invoke({ repo: 'graph' })
  assert.equal(result.isError, true)
  assert.ok(result.content.includes(extraction))
})

test('nested repo ownership wins and excluded targets stay visible', async () => {
  const f = fixture()
  const external = `${graph}/other/C.md`
  f.members.push({ repo: 'other', root: `${graph}/other` })
  f.rows[0].instance.effective_values[0].containers.push(inline('[[C::other]]', 410))
  f.edges.get(extraction).push(resolution(external, 420))
  const result = await f.plugin.invoke({ repo: 'graph' })
  assert.equal(result.content.checked, 2)
  assert.deepEqual(result.content.outside_repo, [external])
})

test('a missing recorded target is an error, never an empty successful result', async () => {
  const f = fixture()
  f.edges.set(extraction, [resolution(null, 20), resolution(b, 120)])
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).isError, true)
  f.edges.set(extraction, [])
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).isError, true)
})

test('rejects unavailable, partial and changing reads', async () => {
  assert.equal((await createPlugin({}).invoke({ repo: 'graph' })).isError, true)
  for (const frame of [
    { type: 'error', message: 'Disconnected' },
    { ready: false }, { ready: true, version: 1, result: null },
    { ready: true, version: 2, result: [] },
  ]) {
    const f = fixture()
    f.state.override = op => op === 'references_out' ? frame : null
    assert.equal((await f.plugin.invoke({ repo: 'graph' })).isError, true)
  }
  const f = fixture()
  f.rows[0].instance.resolved = false
  assert.equal((await f.plugin.invoke({ repo: 'graph' })).isError, true)
})

test('rejects bad inputs and unknown repositories', async () => {
  const f = fixture()
  for (const input of [null, {}, { repo: '' }, { repo: 'missing' },
    { repo: 'graph', include_mapped: 'yes' }, { repo: 'graph', path: a }]) {
    assert.equal((await f.plugin.invoke(input)).isError, true)
  }
})

test('an empty graph returns an explicit zero checked count', async () => {
  const f = fixture()
  f.rows.length = 0
  assert.deepEqual(await f.plugin.invoke({ repo: 'graph' }), {
    content: { repo: 'graph', checked: 0, unmapped: 0, nodes: [] },
  })
})
