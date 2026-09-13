---
type: guide.pattern::au-agent-guides
goal: model support and tension in the shipped research vocabulary
rule: Record support and disagreement as reasoned links, adding typed relations when queried and leaving evaluation to the consumer.
example:
---

# The argument edge

Use a reasoned link to record how one idea supports or disagrees with another.

This guide applies to the shipped [[concept]] and [[claim]] kinds.
They inherit two relations from [[idea::au-base-types:example]]:

- `based_on` for support
- `in_tension_with` for disagreement

Other domains define their own relations and interpretation guidance.

## Record the disagreement

A tension records a point on which ideas pull against each other.
For example, organizing notes through folders or links offers different positions worth holding.

The edge records that disagreement.
A research or epistemic consumer judges its significance:

- Which position holds
- Whether one has been refuted
- How confident to be
- Whether the disagreement is resolved
- Other evaluations the consumer needs

Keep those judgments out of the tension edge.

## Add a typed relation when queried

Start with a prose link that explains the relation, following [[the-reasoned-edge]].
Use `[[X:in_tension_with]]` or `[[X:based_on]]` when a query needs the relation by name.
Include the corresponding frontmatter key, such as `based_on:`, and check the resolved field value.
For example, a design-space map may gather disagreements.
[[add-structure-when-queried::au-agent-guides]] explains when the field earns its place.

**Tension is symmetric**

Write `in_tension_with` once on the node in hand.
The backlink exposes the disagreement from the other side.

**Support is directional**

Write `based_on` on the idea that rests on the target.
Its backlink shows what depends on that target.
It does not assert support in reverse.

## Give an argument its own claim

Keep a simple tension as a relation between nodes.
When the tension carries an argument the graph reasons from, write it as a claim.
Apply [[hold-only-what-the-web-uses]] to that admission.

The claim holds the argument.
Its tension edge names the idea it opposes.

## Keep source provenance separate

`based_on` records support from one idea to another.
The extraction's `resolves_to` links record a claim's source provenance.
Do not duplicate that provenance as `based_on`.

Likewise, `in_tension_with` relates opposing ideas.
A source provides evidence for an idea.
Use ideas as tension targets.

Before adding a typed edge, name the query it answers.
Check that it records the relation without evaluating which idea wins.
