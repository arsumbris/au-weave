---
type: mcp.skill::au-mcp-sdk
name: reweave
description: Add owed links to existing nodes, place new nodes on their maps and fold the cut's enrichments. Use after a weave wave, for pending enrichments, or to revisit a named, sparse or stale node. Whole-graph audits belong to tend.
---

Revisit a named node, a recent weave wave or pending enrichments.
Use a separate agent from the one that wove the nodes.

Run one writer at a time after the weave wave.
Nodes, maps and extraction flags are shared.

## Find the work

Use new nodes' incoming and outgoing links to find older nodes worth revisiting.

List `extraction::au-weave` instances with `au_instances_of`.
Page through the full roster and select this graph's files.
Read candidate lists with `au_resolved`.

Pending enrichments have:

- `verdict: enrich`
- A `resolves_to` target
- No `folded: true`

Group them by resolved target.
Report missing targets for [[cut]] to correct.

Read the graph's full `map::au-base-types` roster, including subtypes.
Reuse it while current.

## Judge the revision

Read each selected node in full.
For an enrichment, compare its content with:

- The source
- The candidate note
- The cut's reason

Read the target kind's fields and writing guidance.
Fold related facets into one revision serving the premise and target's purpose.
Use the cut's target.
Preserve its required structure and accurate prose.

Add forward links using [[the-reasoned-edge]].
Sharpen statements when newer evidence earns it.
Use the target's relation fields when their semantics fit the evidence and consumer needs.

Hold risky changes for human review with evidence, following [[the-precision-asymmetry]]:

- Splits or merges
- Pruning or retirement

## Check source passages

Read unfamiliar `passages` guidance on [[candidate]] with `au_type`.
Check source blocks against the facet, even when it is already present in the target.
Recheck retained passages when the candidate's meaning or target changed.

Reuse block IDs or call `assign_block_id` at a fresh UTF-8 byte offset in the source.
Re-read positions after each source mutation.
New anchors require an editable source member.

Qualify cross-repo links.
Follow them from the extraction's origin and check:

- The intended text
- Source identity against extraction `of`
- Relevant diagnostics, including anchor warnings

Save checked, distinct links in `passages` before revising the node.
If an anchor cannot be created or checked, leave the fold pending and report why.

## Place nodes on maps

Use `weave_map_coverage` with the graph's `repo` and `include_mapped: true` to inspect existing placements.
If unavailable, use live body links from the graph's map roster.
Existing coverage does not establish that every appropriate slice includes the node.

Every map subtype counts, including domain kinds.
Maps reserved for human editing still count toward coverage.
Respect those reservations.

Place each node on every slice its meaning earns.
Include sibling regions its links never reach.
Give the reason in the map's idiom.

Read unfamiliar map guidance and [[author-a-map::au-agent-guides]].
Apply the map kind's guidance.
Preserve its reading route and place additions under the question they serve.

Keep the existing home as the entry point.
Report missing slices to [[tend]].

## Save the fold

After the facet and required domain grounding land, check the saved node's meaning and relevant diagnostics.
Set the candidate's `folded: true` before moving to another target.
Preserve its other fields.

After an interruption, read the target before repeating the fold.
If the facet is present, complete its passage check and save missing links before setting the flag.
Neither `resolves_to` nor saved passages alone establishes that the facet landed.

Preserve historical fold flags lacking passages unless an evidence backfill was requested.
Preserve old identities and inbound routes during approved merges or retirements.

## Check and report

Check saved map coverage for the nodes in scope and report remaining gaps.
Read changed navigation maps as a newcomer.
Their entry points and onward routes should reach substantive notes without queries.

Hold uncertain links and risky proposals with their evidence.
