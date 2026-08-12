# Portfolio debugging protocol

Use this rule for bugs, runtime errors, failing checks, broken builds,
deployment problems, routing failures, or performance regressions.

## Evidence first

- Capture the exact error, failing command, route, viewport, environment, and
  expected versus actual behavior.
- Inspect the recent diff and the smallest relevant component, data record,
  service, hook, route, or build configuration.
- State one current hypothesis and what evidence would disprove it.

## Fix loop

1. Reproduce or localize the failure.
2. Fix the smallest shared root cause, not only the visible symptom.
3. Run the narrowest relevant check.
4. Read a failed check before changing direction.
5. Add regression coverage when the behavior is important and economical to
   prove automatically.

## Minimum verification

| Change                         | Check                                                            |
| ------------------------------ | ---------------------------------------------------------------- |
| Copy or static data            | `npm run check:changed`                                          |
| React or TypeScript logic      | `npm run check:changed`                                          |
| Routing or build configuration | `npm run check:release`                                          |
| Visual or interaction behavior | `npm run check:changed` plus a rendered smoke check              |
| Release/deployment surface     | `npm run check:release` plus preview verification when available |

Report the root cause, the scoped fix, commands run, and any remaining risk.
