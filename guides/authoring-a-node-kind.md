---
type: guide::au-agent-guides
goal: author the node kinds a domain needs
rule: Put each needed distinction's fields and writing guidance in its node kind.
example:
---

# Authoring a node kind

Reuse an existing kind when it holds the required knowledge.
Author a new kind for a distinction the consumer needs to preserve or query.

Choose the base by what the note represents:

- A named thing uses [[thing::au-base-types]], like [[entity:example]]
- A definition or proposition uses [[idea::au-base-types]], like [[concept:example]] or [[claim:example]]
- Navigation uses [[map::au-base-types]], like [[map.synthesis:example]]
- For another distinction, choose the base whose contract fits it

## Put the guidance in the type

Declare fields for relations and values the consumer needs to query.
Put writing guidance in the type's documentation.
Add a body template when named sections help the reader.
Read unfamiliar contracts through the engine.

The shipped concept and claim kinds show why the distinction matters:

- A concept defines a meaning
- A claim states a proposition and its grounds

Both use source-grounded prose and the links described in [[the-reasoned-edge]].
Preserve the uncertainty in the sources.

The engine reports faults in declared structure after writes.
The agent judges whether the note supplies the knowledge its kind promises.

## Connect the kind to mining

Pair a mined kind with a candidate whose resolution target accepts it.
[[authoring-an-extraction-profile]] explains that connection.

Use [[a-role-is-not-a-type]] to distinguish a new kind from a viewpoint over an existing subject.
Keep uncertain identities separate as [[the-precision-asymmetry]] explains.

For a mined kind, run the source check in [[authoring-a-domain-bundle]].
For another kind, check a representative instance through its owning workflow.

Read the resulting note for meaning.
Inspect write diagnostics before relying on it.
