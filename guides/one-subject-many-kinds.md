---
type: guide.principle::au-agent-guides
goal: decide whether a subject already covered earns another node kind
rule: Judge each node by the knowledge it holds, its identity and the candidate's declared resolution target.
---

# One subject, many kinds

One subject can need several node kinds to hold different knowledge.
A definition can exist while a claim about that subject is still missing.

A kind describes what the node represents:

- A [[thing::au-base-types]] names something
- An [[idea::au-base-types]] holds a meaning or proposition
- A map gathers related notes
- Other bases represent subjects such as events or sources

Domains refine those distinctions.
au-weave's research vocabulary separates concepts from claims.
A scene graph might hold a system and a claim about it.
Judge each needed node against the premise and domain guidance.

## Match the candidate's target

Read the candidate kind's `resolves_to` contract, including inherited fields.
Reuse a node only when its kind is accepted and its identity matches.

For example, a [[concept-candidate]] resolves to a [[concept]].
Another candidate is not a compatible target.
A shared topic alone does not establish a match.
Correct a misclassified candidate through [[cut]] before resolving it.

## Compare existing nodes

During [[tend]], compare identity contracts and the knowledge each node holds.
Preserve distinct knowledge about the same subject.
Different type names alone prove neither separate identities nor duplication.
Hold proposed merges for review as tend requires.

## Check the missing knowledge

Name:

- What the candidate would contribute
- Which target kinds its contract accepts
- Whether an existing node already holds that knowledge

A missing contribution still needs to pass [[admit-on-salience]].
