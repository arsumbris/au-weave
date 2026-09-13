---
type: guide.principle::au-agent-guides
goal: resolve a mention to one identity before minting a node
rule: Search for an existing identity before minting, reusing only a clear match.
example:
---

# Search before you mint

Before minting a node, search for one that already fits.
A source may name something the graph holds under another name.

Duplicate nodes divide its links.
They can drift until a later pass merges them.

## Compare identities

Search the kind's identity fields.
Include aliases when its contract declares them.
For example, a source might use:

- Postgres
- PostgreSQL
- PG

When names are close, read the notes to check identity.
"mercury, the planet" and "mercury, the metal" name different things.

## Choose from the evidence

- A clear match: reuse the existing node
- No match: mint a new node
- An uncertain match: mint and keep the nodes separate

Keeping uncertain identities apart leaves a later merge possible.
A false merge joins knowledge about different things.
Apply [[the-precision-asymmetry]] before committing to a match.
