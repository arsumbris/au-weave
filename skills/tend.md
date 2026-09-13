---
type: mcp.skill::au-mcp-sdk
name: tend
description: Audit the graph for duplicates, drift, coverage gaps and orphans, repair safe issues and develop its maps. Use for whole-graph maintenance or to create a starting map. New nodes belong to weave.
---

Audit the whole graph using its premise and existing orientation.
Read the full node roster, then open pages needed to judge findings.

Use a fresh agent if you wove any of these nodes.
Set a stop budget before starting.

Hold risky changes for human review, following [[the-precision-asymmetry]]:

- Merges or splits
- Pruning or retirement

## Find pending work

Read graph diagnostics, including warning details.
Read the full `map::au-base-types` roster, including subtypes.
Reuse it while current.

List `extraction::au-weave` instances with `au_instances_of`.
Page through the full roster and select this graph's files.
Read candidate lists with `au_resolved`.

**Weave candidates**

Pending candidates have `verdict: weave` and empty `resolves_to`.
A resolved mention elsewhere does not complete them.

Compare unresolved candidates across distinct sources.
Find prominent, recurring subjects still lacking nodes.
Use meaning and candidate kind alongside names.
Matching surface strings alone do not establish identity.

**Enrichments**

Pending enrichments have:

- `verdict: enrich`
- A `resolves_to` target
- No `folded: true`

Group them by resolved target.
Report missing targets for [[cut]] to correct.
Route folds to [[reweave]].

**Uncut and parked candidates**

Route uncut sets to [[cut]].
Report parked decisions with their reasons.

## Check identity and meaning

**Gaps and stale markers**

Compare unresolved candidates with the premise and held nodes.
Hand knowledge gaps to [[weave]].

Compare pending weave candidates with compatible nodes, including phrasing a name search misses.
Route clear matches through [[weave]] for passage checks and resolution.

**Duplicates**

Compare the node kinds' identity fields and content.
Read suspected matches.
Different kinds can hold distinct roles over one subject.
See [[one-subject-many-kinds]].

**Drift and connections**

Compare nodes with their sources.
Check whether linked sentences still hold.

Use engine references to check whether apparent orphans are unreachable.
Revisit older nodes that should connect to newer knowledge, following [[reweave]].

## Check map coverage

Use `weave_map_coverage` with the graph's `repo` to find woven nodes on no map.
Set `include_mapped: true` to inspect their existing memberships.
If the tool is unavailable, derive coverage from the graph's map roster and live body links.
Check manually authored nodes separately; the tool follows extraction resolutions.

Every node needs coverage from at least one map in the full type closure.
Maps reserved for human editing still count.
Respect those reservations.

Place uncovered nodes on the slices their meaning earns.
Check boundary nodes for missing memberships by kind and region.
Include sibling slices their edges never reached.

Read each map's content and reading route.
Resolving links alone does not establish that its prose is true.

## Grow navigation

Locate home through the repo's orientation.
Preserve its identity and location.

If woven nodes lack a home, use a suitable map kind from the consumer's vocabulary.
Follow the consumer's home convention, defaulting to `map - start here.md`.
Report a missing navigation contract if no suitable map kind exists.

Read unfamiliar map guidance and [[author-a-map::au-agent-guides]].
Apply the map kind's guidance.

When navigation becomes crowded, create a map for a useful region or relation.
Use a suitable kind from the consumer's vocabulary.
Gather older nodes that belong by meaning.

Split a crowded map only when finer routes help a reader.
A map split is safe growth, distinct from splitting a content node.
Give each slice reasoned links to siblings and home.

## Check repairs and report

After an approved identity change or alias, revisit matching candidates across sources.
Use [[weave]] for pending resolutions and [[reweave]] for pending folds.
Keep former identities and inbound routes during approved merges or retirements.

Check map coverage against the saved graph.
Follow changed homes and navigation maps as a newcomer.
They should lead to substantive notes without schema knowledge or queries.

Report safe fixes applied and risky proposals held with evidence.
Report remaining gaps or decisions when the budget ends.
