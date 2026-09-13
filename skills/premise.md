---
type: mcp.skill::au-mcp-sdk
name: premise
description: Create or refine a knowledge graph's premise from the user's intent. Use when starting a graph or clarifying what belongs in it.
---

Create the graph's [[weave-premise]] from the user's purpose and supplied context.
Ask only about unresolved choices that would change what earns a node.

## Find the premise

Query `weave-premise::au-weave` with `au_instances_of`.
Select the destination graph's premises.
Reuse or refine a match.

The graph's premise is independent of its source corpus's research premise.
Read the premise type and any selected consumer subtype before writing.

## Define the scope

Write two sections:

- `# Intent`: a short paragraph about the graph's subject and what its nodes should help the user understand or do
- `# Out-of-scope`: testable exclusions, each naming a kind of candidate that does not earn a node

## Select the profile

Keep the caller's selected profile or the existing premise's profile.
If neither exists, offer [[research-extraction]] when its vocabulary fits.
If another profile is needed, use [[authoring-a-domain-bundle]].

Read the selected profile's contract.
Set `profile` to its qualified type reference.

## Save and check

Save in the consumer's graph repository.
Honor consumer paths and preserve an existing premise's filename.
Default new premises to `premise - <name>.md`, using the graph's name.
Default the type to `weave-premise::au-weave`.

Check the saved note's diagnostics and profile reference.
Return its path and point to [[mine]] for the first source.
