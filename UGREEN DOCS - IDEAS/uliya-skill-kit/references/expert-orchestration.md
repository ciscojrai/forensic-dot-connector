# Expert orchestration

Choose the single `agent` recorded for each CLI. Make each delegation self-contained, preserve real user entities and constraints, and pass only verified business results to dependent steps.

## Result handoff

Use the public terminal `delegation_result`, not an assumed view of each internal CLI `{ok,data,error}` envelope. Business text can live in `summary`; `result: {}` is valid for `completed`, and business keys inside `result` have no fixed schema. See [delegation result examples](delegation-result-examples.md) (synthetic illustrations, not runtime-tested) and [completion and errors](completion-and-errors.md).

The public terminal states are:

- `completed`: start dependent work only when the returned facts satisfy the current step and downstream requirements.
- `failed`: stop dependent work and preserve already confirmed results.
- `cancelled`: report incomplete work; do not automatically retry operations that may duplicate effects.

`waiting_user` and `waiting_approval` are platform interruption/resume flows through `ctx.ask`, not terminal stdout JSON envelopes. Wait for the same delegation to resume after the user's answer or platform approval; do not launch parallel replacements or treat conversational agreement as platform approval. Check the eventual terminal result rather than treating resume as completion.

If a required downstream path, ID, text, or other business value is missing, stop and explain the gap; never guess. Report partial completion by separating completed, failed/cancelled, waiting, and dependency-blocked steps, not by inventing a `partial` terminal status.

Accept an explicitly reported empty query result without broadening filters or substituting similar objects. An empty `result` alone is not evidence of no matches. Keep an unspecified batch scope to the smallest usable scope the user supplied.
