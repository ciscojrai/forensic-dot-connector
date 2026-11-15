# Delegation result examples

> **All JSON, business content, and waiting flows here are synthetic structural illustrations, not runtime-tested and not real NAS responses. Example photos are fictional; never use them as real photos, paths, or downstream inputs.**

## Structural boundary

Public terminal `delegation_result` states are only `completed`, `failed`, and `cancelled`. `completed` includes `summary` and an object-valued `result`; the basic structure for the other two has no `result`. Business text can live in `summary`, and `result: {}` is valid. Business keys inside `result` depend on the actual response: `matches` below is illustrative, not a fixed schema.

These examples describe only the public delegate structure. **The catalog's `example.output` values are synthetic shape illustrations, not device responses, and CLI return fields remain a separate contract concern**; do not infer CLI `{ok,data,error}`, business fields, or completion evidence from these examples. Do not expose internal checkpoints or resume correlation IDs as public results.

## `completed` with business content (synthetic, not runtime-tested)

```json
{
  "kind": "delegation_result",
  "status": "completed",
  "targetAgent": "photo-agent",
  "summary": "Found 1 matching photo within the requested scope: fictional example photo A.",
  "result": {}
}
```

Business content is in `summary`; this is not an empty business result. But a dependent step requiring a photo ID or exact path must stop here: neither is supplied, and neither may be guessed from the photo name.

## Empty result (synthetic, not runtime-tested)

```json
{
  "kind": "delegation_result",
  "status": "completed",
  "targetAgent": "photo-agent",
  "summary": "Searched the requested scope and found no matching photos.",
  "result": { "matches": [] }
}
```

An explicit no-match fact supports accepting an empty result. An empty `result` alone does not. Do not broaden the scope or substitute similar photos.

## `failed` (synthetic, not runtime-tested)

```json
{
  "kind": "delegation_result",
  "status": "failed",
  "targetAgent": "file-agent",
  "summary": "Could not complete this file organization task."
}
```

Stop dependent work and report only confirmed facts. Do not invent a `result`, error code, or failure details.

## `cancelled` (synthetic, not runtime-tested)

```json
{
  "kind": "delegation_result",
  "status": "cancelled",
  "targetAgent": "file-agent",
  "summary": "Delegation cancelled."
}
```

Cancellation does not prove that all effects were rolled back. Do not automatically retry operations that may duplicate effects.

## Partial completion (synthetic, not runtime-tested)

These are two separate terminal results in one workflow, not a new aggregate envelope.

Step one, extract a conclusion:

```json
{
  "kind": "delegation_result",
  "status": "completed",
  "targetAgent": "document-agent",
  "summary": "Synthetic conclusion: this example calls for checking the list before arranging archival.",
  "result": {}
}
```

Step two, save that conclusion:

```json
{
  "kind": "delegation_result",
  "status": "failed",
  "targetAgent": "knowledge-agent",
  "summary": "Could not confirm that the conclusion was saved."
}
```

Parent assessment: extraction completed; saving failed; a subsequent read requiring the saved path was not executed. Do not claim overall completion or a saved file. Partial completion is not a `partial` status. Likewise, a single `completed` result whose business facts cover only part of the goal does not establish full completion.

## Waiting and resume flows (synthetic, not runtime-tested)

**These are platform control flows, not terminal stdout JSON. Do not construct a `delegation_result` with `status: waiting_user/waiting_approval`.**

```text
waiting_user: the expert needs a scope clarification
  → the service relays the checkpoint through ctx.ask as a platform question
  → the user answers in the platform → the platform/relay resumes the same delegation
  → inspect completed / failed / cancelled (or another wait)

waiting_approval: the expert needs operation approval
  → the service relays the checkpoint through ctx.ask as platform approval
  → the platform collects the decision → the relay maps it and resumes the same delegation
  → inspect completed / failed / cancelled (or another wait)
```

Do not launch parallel replacements or claim completion while waiting. Conversational agreement does not replace platform approval. Do not predict the terminal status after rejection either; use the actual resumed outcome.

See [expert orchestration](expert-orchestration.md) and [completion and errors](completion-and-errors.md).
