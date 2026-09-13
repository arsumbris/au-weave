---
type: guide.principle::au-agent-guides
goal: judge coverage separately from the premise and workflow
rule: Search existing nodes to establish coverage, then judge missing knowledge against the premise and domain guidance.
---

# The premise is not coverage

Search the graph for a node that holds the candidate's intended knowledge.
Mentioning a subject in the premise does not establish that coverage.
Using a principle in a workflow does not establish it either.

Judge relevance against the consumer's premise and candidate guidance.
The scope may include:

- Human effects
- Artifacts
- Workflow behavior
- Other subjects the premise includes

Use that graph's exclusions.
Preserve framing the source needs.

Reuse an existing node when its identity and kind fit.
Otherwise judge the candidate's contribution using [[admit-on-salience]].
Apply [[the-precision-asymmetry]] to uncertain commitments.
