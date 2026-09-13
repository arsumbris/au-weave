---
type: mcp.skill::au-mcp-sdk
name: cut
description: Judge a mined source's candidates against the premise and existing graph, and mark each a verdict with a one-line why. Use to cut a source extraction.
---

Judge what earns a node before [[weave]] writes one.
Use the uncut extraction, graph premise and existing nodes.

## Read the contracts

Read the extraction's profile and candidate kinds.
Include their resolution targets and domain guidance.

Judge admission against the premise's intent and exclusions.
Mentioning a subject in the premise does not establish graph coverage.
See [[the-premise-is-not-coverage]].

Apply the judgment guides:

- [[search-before-you-mint]]
- [[admit-on-salience]]
- [[the-precision-asymmetry]]
- [[one-subject-many-kinds]]

## Choose a verdict

**Weave**

Mark `weave` when the candidate earns a distinct node of its intended kind that the graph lacks.
A facet with its own use and query earns a sibling.

A re-attestation also uses `weave`.
Name the existing node in `why` and leave resolution to weave.
Same-kind overlap is reuse.

**Enrich**

Mark `enrich` when the facet serves an existing node's purpose.
Name exactly what it adds.
Set `resolves_to` to that node.

**Park or drop**

Mark a genuine maybe `parked`.
Mark an off-premise candidate or a non-referent `dropped`.
Give the reason.

## Save the judgment

Preserve the mined `surface`, `salience` and `note`.
Move candidates between kind fields only to correct their kind.

Add the verdict and a one-line `why` explaining the decision.
Leave `resolves_to` empty for `weave`.
Fill it for `enrich` and leave `folded` absent.

When re-cutting a folded enrichment to a different target, clear `folded`.
The new target still needs the facet.
