---
type: mcp.skill::au-mcp-sdk
name: weave
description: Find or mint canonical nodes from the cut's picks, write source-grounded pages and forward edges, and resolve their candidates. Use to weave a named pick or continue a cut's pending picks. Enrichment belongs to reweave.
---

Write nodes and resolve candidates marked `weave` with empty `resolves_to`.
Use the premise and work through pending candidates in the requested scope.

Run one writer at a time because nodes can share an extraction.
After the wave, [[reweave]] owns:

- Changes to existing node prose
- Backward links
- Map placement
- Enrichment folds

## Read the evidence

Use the premise and the cut's `why` to orient the work.
The cut has already judged worth.
Read the sources needed to judge identity and content.

## Find the node

Read the candidate kind's `resolves_to` contract, including inherited fields.
It determines compatible node kinds.
Use the selected kind's identity fields and consumer naming conventions.
For new nodes, follow the consumer's folder convention or the node kind's default.
Preserve existing node paths.
Check filename uniqueness across the repository, including other folders.

Apply [[search-before-you-mint]].
Reuse a clear match.
Create a node when none fits.
Keep uncertain identities separate.

Distinguish kinds over one subject with [[one-subject-many-kinds]].
Correct a wrong kind while retaining distinct roles.

## Check source passages

Read unfamiliar `passages` guidance on [[candidate]] with `au_type`.
Check the source blocks supporting each candidate's interpretation.
Do this for reuse and re-attestation too.
Keep every passage needed to preserve the source's qualifications.

Reuse block IDs or call `assign_block_id` at a fresh UTF-8 byte offset in the source.
Re-read positions after each source mutation.
New anchors require an editable source member.

Qualify cross-repo links.
Follow them from the extraction's origin and check that each block:

- Belongs to extraction `of`
- Contains the intended evidence

A successful write or clean diagnostics alone cannot establish this.
Save checked, distinct links in `passages` before writing the node.
If an anchor cannot be created or checked, leave the candidate pending and report why.

## Write the node

Read unfamiliar node guidance with `au_type`, qualified by its owning repo.
Apply the node kind and consumer guidance to its fields and prose.

Ground the content in sources and serve the premise.
Let the domain determine its structure, length and framing.
Follow domain guidance for disagreements and uncertainty.
Assert no more than the sources establish.

Write forward links using [[the-reasoned-edge]].
Use declared relation fields when their semantics fit the evidence and consumer needs.

A needed target can be woven first from the cut's admitted candidates.
Keep other unresolved ideas as prose until they have nodes.
[[tend]] creates maps when a region needs a way in.

## Record resolutions

Gather the candidates the node draws on across sources.
Search by the kind's identity fields and by meaning to find differently phrased mentions.

Complete each candidate's passage check before recording its resolution.
Preserve grounding records required by the node kind.
Check the saved node's meaning and relevant diagnostics.
Then fill `resolves_to`, for reuse as well as new nodes.

## Resume and report

After an interruption, check whether the node exists before writing it again.
Saved passages do not establish resolution.
Leave uncertain matches pending.

Preserve historical resolutions lacking passages unless an evidence backfill was requested.
Report candidates left pending and why.
