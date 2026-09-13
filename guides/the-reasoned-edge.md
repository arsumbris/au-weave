---
type: guide.pattern::au-agent-guides
goal: explain and support the relation a link asserts
rule: Explain each prose link in its sentence and follow the selected type's contract for structured relations and navigation.
example:
---

# A link carries its reason

Place each prose link in the sentence that explains its relation.
This is an agent writing check.
The engine does not establish that the reason holds.

For structured relations and navigation, follow the selected type's guidance.
A domain may represent a viewpoint through a query or a relation.
It may use a record when the viewpoint carries its own detail.

## State only what the evidence supports

The relation word is itself a claim.
Choose one no stronger than the evidence supports.
"after" is not "because".
A passing mention is not a dependency.

Use [[an-edge-is-a-claim::au-agent-guides]] to check the relation.

## Choose the form the relation needs

- **Prose link**, `[[X]]` in the sentence that explains it
- **Typed fill**, `[[X:field]]` when a query needs the relation by name
  Include the corresponding frontmatter key, such as `about:`, and check the resolved field value
  [[idea::au-base-types:example]] and its `about` field show this form
- **Inline record**, a small typed record when the relation carries its own details
  Those might include a date or source, among other values
- **Node**, when the relation is contested or connects more than two parties

## Write the title into the sentence

Use the node's full title, `[[the full title]]`.
Piped display text (`[[title|words]]`) does not resolve here.
A claim's title may be a whole sentence.
Work that title into your prose.

Read each link with its surrounding sentence.
Rewrite or cut a link whose reason is missing.
