---
type: guide::au-agent-guides
goal: configure a consumer's source-to-knowledge path using au-weave
rule: Reuse suitable vocabulary and check the configured path on a real source.
example:
---

# Authoring a domain bundle

Choose a [[weave-premise:example]] and an extraction profile for the consumer's work.
The profile selects candidate kinds that resolve to the intended node kinds.

## Reuse the vocabulary that fits

The shipped [[research-extraction:example]] holds candidates for:

- [[concept:example]], a defined meaning
- [[claim:example]], a proposition and its grounds
- [[entity:example]], a named thing

Reuse these definitions when their fields and writing guidance fit.
Author a domain profile when the consumer needs distinctions they cannot hold.
Pair each new candidate kind with its intended node kind.

Follow the owning guides:

- [[authoring-an-extraction-profile]] for profiles and candidates
- [[authoring-a-node-kind]] for the nodes they resolve to

Declare the vocabulary owners as dependencies.
A mounted package supplies definitions.
The consumer also supplies:

- A premise in the graph's repository that names the selected profile
- Source material
- Selected runtime capabilities

## Choose where the work belongs

**Repositories**

Use the consumer's existing repositories.
The skills scope each graph by its repository.
Keep independent graphs in separate repositories or declared subrepos.

Separate corpus and graph when they need independent ownership or colliding names.
Folders alone do not create a repository scope.
Qualify references across repository boundaries.

**Home maps**

Use the consumer's existing home, including Arscontexta's `maps/home.md`.
[[reweave]] places nodes on existing maps.
[[tend]] develops the map structure.

For a graph with nodes but no home, tend defaults to `map - start here.md`.
Consumer conventions take precedence.
Record maps reserved for human editing in the consumer's instructions.

**File paths**

Preserve existing paths.
Keep filenames unique across the repository.
For new files, follow consumer conventions before these defaults:

- Premise: `premise - <name>.md`
- Extraction: `extractions/extraction - <source name>.yaml`
- Nodes: the folder defaults of their kinds

## Two setup choices

These are hypothetical setups based on the shipped type contracts.

**Reuse for reading notes**

A student wants to retain definitions and compare claims from readings.
Inspect the shipped profile before creating equivalent local types.
Check one reading to see whether the resulting notes preserve the needed distinctions.

**Extend for experiments**

A consumer needs to query experimental conditions and measured outcomes.
The shipped candidate lists do not define those structured fields.
Inspect existing domain types before authoring a missing node and candidate pair.
General prose alone cannot supply the query's typed fields.

## Check the configured path

Start with one representative source:

1. [[mine]] its candidates
2. [[cut]] them against the premise
3. [[weave]] the admitted candidates, minting the first node when none fits
4. Use [[reweave]] for existing-node changes and map placement

Check that the extraction preserves the source's meaning.
Check that each admitted candidate resolves to the intended node kind.
Inspect write diagnostics.
Repair introduced errors.

Keep blocking prerequisites or uncertain identities on the existing work.
Report what remains.
A saved configuration alone does not demonstrate the consumer's promised behavior.
