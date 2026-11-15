# Public NAS capability catalog

This document is a human-readable index of the capabilities available to Skill authors. Use `data/capability-catalog.json` as the source of truth for exact CLI, Action, parameter, effect, approval, and completion fields. The catalog is intentionally consulted before writing a delegation workflow.

The unpublished source-aligned catalog contains 9 CLIs and 84 public Actions. Its structure version is 2.2.0; this does not mean a target NAS has the same deployed version. Example paths and IDs are synthetic. Each Action example includes a synthetic output object that shows the shape of the `data` field; it is not a device response, and target-environment fields and values are authoritative. See [Delegation result examples](delegation-result-examples.md) for the separate, parent-facing result contract.
