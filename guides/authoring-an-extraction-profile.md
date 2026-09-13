---
type: guide::au-agent-guides
goal: author a domain's extraction profile and its candidate kinds
rule: Define the kinds to mine through an extraction profile and typed candidate targets, then judge admission against the premise.
example:
---

# Authoring an extraction profile

Use the profile to select which kinds of candidates to extract.
Use the premise to judge which candidates earn nodes.

## Reuse or extend a profile

A profile is a concrete subtype of [[extraction]].
Its frontmatter lists hold subtypes of [[candidate]].

Reuse [[research-extraction:example]] when the work fits its candidate kinds:

- Concepts
- Claims
- Entities

For a missing kind, use [[concept-candidate:example]] as an example of a typed resolution target.
Read unfamiliar contracts through the engine.
A wrong target kind produces a diagnostic even when the write lands.

## Define what to mine

Declare the candidate kinds the consumer needs to retain from sources.
Author each kind together with its node target, following [[authoring-a-node-kind]].
Put domain distinctions and extraction guidance on those types.

Mine what the source says within the profile's kinds.
Cut applies the premise's admission criteria.

## Keep the shared workflow contract

Each candidate kind extends [[candidate]].
It declares a typed `resolves_to` reference to compatible nodes.

Retain the shared workflow fields:

- Verdict
- Evidence
- Completion

Additional domain requirements still apply.
Choose field names for the domain.
The skills discover candidate lists from the profile's effective fields.

Node kinds own their identity contracts.
Their fields define relations.
Their documentation guides writing.
Consumer map kinds define navigation.
The shipped vocabulary is one implementation of these contracts.

## Preserve stored candidates

A new optional field lets existing extractions omit that kind.
It can still constrain values stored under the same name.
Inspect diagnostics for the affected data.

Before retiring or renaming a populated field, migrate its candidates and consuming queries.
Preserve cut decisions and resolution links.
Removing a declaration can leave stored values as unchecked extras.
Clean diagnostics alone do not prove that migration succeeded.

Run the source check in [[authoring-a-domain-bundle]].
Check that the profile preserves the needed distinctions.
Check that each resolution reaches the intended node kind.
