# Completion and errors

## Parent result contract

Use business facts in the public terminal `delegation_result`, not an assumed view of the expert's internal CLI `{ok,data,error}` envelope or Action `completionEvidence`. Business text can live in `summary`; `result: {}` is valid for `completed` and does not itself mean there is no business result. Business keys inside `result` are not a fixed schema.

See [delegation result examples](delegation-result-examples.md) (synthetic illustrations, not runtime-tested). The catalog's `example.output` values are synthetic shape illustrations, not device responses; these delegate examples do not establish CLI output fields.

Continue dependent work only after `completed` supplies the verified business facts needed by both the current step and the next one, with no unresolved user or approval wait. Dispatch, a request ID, or the absence of an exception is not completion.

## Public terminal states

- `completed`: validate required paths, IDs, text, or other business values in the returned facts. If a required value is missing, report that delegation completed but downstream input cannot be verified, and stop dependent work; never guess.
- `failed`: stop dependent work. Report the failed step, target expert, safe error facts, and previously confirmed results without inventing success.
- `cancelled`: report the step as incomplete. Do not automatically switch experts or retry operations that may duplicate effects.

## Platform interruption and resume

`waiting_user` and `waiting_approval` are resumable waiting flows, not terminal stdout JSON with `kind: "delegation_result"`. The service relays the child's checkpoint through `ctx.ask`; the platform resumes the same delegation after a response. Do not construct a waiting envelope or handle private correlation IDs in the parent Skill.

- `waiting_user`: wait for the user's answer and resume the same delegation; do not start a parallel replacement task.
- `waiting_approval`: wait for platform approval and relay/resume; conversational agreement is not a substitute for platform approval. Resume itself does not prove success: check the eventual terminal result.

## Empty and partial results

- A completed query explicitly reporting no matches is a valid empty result. Do not invent candidates or broaden the scope. An empty `result` alone does not establish no matches.
- Unparseable results or missing required values stop dependent work.
- Partial completion is a workflow assessment, not an additional public terminal status. List completed, failed/cancelled, waiting, and dependency-blocked steps separately.
- Explain duplication risks before any retry that may repeat effects; do not retry automatically.

## Saving, extraction, and indexing

- `save-text` verification (`verified`) is not index readiness (`index-ready`). A confirmed save does not prove the text is searchable in the knowledge index.
- For `process-materials`, `extractionStatus: complete`, `coverage.modelContentComplete`, and index readiness are separate facts. Completed extraction does not prove complete model-visible content or a ready search index.
- If the expert returns a verified Markdown (`.md`) path, pass that exact path to the responsible expert for direct reading; do not make known-path reading depend on knowledge-search indexing. Never invent a path when it is missing.
- These are business acceptance distinctions, not fixed `delegation_result.result` fields. Request the facts needed for the next step and stop if required downstream values are absent.

## External verification boundary

Report only confirmed facts when permissions, installation requirements, or runtime conditions are unknown. Do not invent stable error codes or describe local static checks as a real NAS terminal outcome.
