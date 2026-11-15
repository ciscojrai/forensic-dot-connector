# Uliya Skill Development Standard

This guide is for third-party developers creating orchestration Skills for NAS workflows. Start with the user's desired result, then confirm that every required operation exists in the [public capability catalog](../references/cli-capabilities.md). The machine-readable source is `data/capability-catalog.json`.

## Core concepts

- A Skill is a Markdown entry point describing a user-facing workflow.
- A capability domain groups related NAS operations.
- A CLI capability is a published operation family; an Action is one operation within it.
- A registered expert performs the real NAS work after delegation.

## Contract and example boundaries

Catalog structure version `2.2.0` is independent of the installation package version. This catalog covers 9 CLIs and 84 public Actions checked against uclaw `release_2026930` (commit `95ba55b48fce0446ff6ec358c4f62a1af6c6b1db`), not a verified NAS deployment. Parameter `required` flags describe the base schema; descriptions also cover conditional requirements, mutually exclusive options and platform selectors. Paths, IDs and references in example commands are synthetic placeholders, not live NAS inputs.

`process-materials` replaces `collect-evidence` and accepts only `query/path/extension`, not the old `full` option. Direct reading of a saved Markdown file by its known path does not depend on the knowledge search index. Save verification, source extraction, model-visible content completeness and index readiness are different conditions; see [Completion and errors](../references/completion-and-errors.md).

Each Action example includes an `example.output` synthetic object that illustrates the shape of the `data` field; it is not a device response. Paths, IDs and references in example commands are synthetic placeholders. Treat the target environment response as authoritative and do not infer that fields are fixed or always present. Parent-facing [Delegation result examples](../references/delegation-result-examples.md) are separate, synthetic and untested. Waiting uses platform interruption/resumption rather than an ordinary terminal JSON result.

## Four-step workflow

1. Write a clear user goal, not a list of implementation steps.
2. Confirm the domain, CLI capabilities, Actions, data effects, approval needs, and completion evidence in the catalog.
3. Write `SKILL.md` with required input, capability evidence, expert orchestration, and completion/failure handling.
4. Run the controlled checker, review diagnostics, and build a versioned release without overwriting an existing version.

Use only capabilities present in the catalog. If a required step has no matching capability, state that it is unsupported; never infer support from a product name or UI label.
