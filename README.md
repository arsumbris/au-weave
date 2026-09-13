---
type: au.engine.readme::au-engine
tldr: Six skills to build and maintain source-grounded knowledge graphs with your own profiles and node types.
---

# Repo Overview

> Work in progress and not thoroughly tested.
> Expect breaking changes.

## General Context

`au-weave` turns source material into connected notes in Arsumbris.
Other projects can reuse the resulting knowledge.

## What this is

The graph grows from sources:

- A premise defines what belongs
- An extraction profile chooses the kinds of knowledge to capture
- Extractions record candidates and decisions
- Nodes combine knowledge across sources with links to evidence
- Maps give readers a way into the graph

Several articles about linked notes can contribute to one node on backlinks.

The shipped profile captures:

- Concepts
- Claims
- Entities

Other profiles supply their own vocabulary.

## How to use this

**Inspect a worked graph**

See [au-weave-example on GitHub](https://github.com/arsumbris/au-weave-example) for a graph built with the shipped vocabulary.
Start at `map - start here` and inspect:

- Short concept, claim and entity notes
- Reasoned links and map placement
- Extraction candidates connected to source passages

Add `au-weave-example` and `au-tr-example` to your workspace's `discover` list to inspect the graph and its sources.
The source articles live in `au-tr-example`.

**Set up the graph**

A graph can live in its own Arsumbris repo or a declared subrepo of your project.
Keep sources alongside it or reference an existing corpus.

Declare `au-weave` in the consumer repository's dependencies.
The engine mounts it through that dependency.

**Choose skills**

Select the skills your task needs alongside the engine's read and write tools:

| Skill | Use |
| --- | --- |
| [[premise]] | Define the scope and select a profile |
| [[mine]] | Read one source into candidates |
| [[cut]] | Decide which candidates belong |
| [[weave]] | Create or reuse nodes with source evidence |
| [[reweave]] | Enrich existing nodes and connect the graph |
| [[tend]] | Check the whole graph and develop its maps |

Refresh the runtime after changing skills or tools.

**Prepare sources**

Sources use `source::au-base-types` or a type that inherits from it.
Compatible corpus types need no extra tagging.

Creating passage anchors requires editable sources.

**Work in batches**

After premise setup, process sources in batches:

```text
mine → cut → weave → reweave → …
```

Run tend when the first nodes need a starting map.
Repeat it periodically as the graph grows.

Choose which sources to process and when to stop.

**Check map coverage**

The read-only `weave_map_coverage` tool finds woven nodes on no map:

- Pass the graph's `repo` to check it
- Add `include_mapped: true` to list all woven nodes with their maps

Repair graph errors before running the check.
This keeps broken extractions from disappearing from its results.

Reweave and tend judge which maps each node belongs on.

**File layout**

The shipped vocabulary defaults to:

```text
premise - <name>.md
map - start here.md
claims/
  <claim itself>.md
entities/
  <entity name>.md
concepts/
  <concept name>.md
extractions/
  extraction - <source name>.yaml
sources/
  source - <name>.md
```

Existing graphs and other profiles can use their own layout.

## How to extend this

Reuse the shipped vocabulary or define profiles and node types for your domain.
Supply your own writing guidance.

[[authoring-a-domain-bundle]] explains how to connect the parts.
