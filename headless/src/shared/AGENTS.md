# HEADLESS SHARED UTILITIES

**14 files** of pure TypeScript helpers. No Vue dependency (except `vue.ts`).

## MODULES

| File            | Contents                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `dom.ts`        | `getActiveElement`, `isHTMLElement`, `getCollectionItemElements`, `getAriaLabel`, `removeLinks` |
| `focus.ts`      | Focus detection, focusable element queries, focus movement                                      |
| `form.ts`       | Form field helpers, validation trigger utilities                                                |
| `tree.ts`       | Tree data traversal (flatten, find, walk) — used by Tree/TreeMenu                               |
| `geometry.ts`   | Point-in-polygon, rect intersection — used by grace area calculations                           |
| `event.ts`      | Event helper functions                                                                          |
| `guard.ts`      | Type guards: `isNullish`, `isString`, `isFunction`, etc.                                        |
| `object.ts`     | Object utilities (pick, omit, deep merge)                                                       |
| `string.ts`     | String manipulation helpers                                                                     |
| `value.ts`      | Value comparison, normalization                                                                 |
| `comparison.ts` | Generic comparison functions                                                                    |
| `env.ts`        | Environment detection (SSR, browser, platform)                                                  |
| `vue.ts`        | Vue-specific utilities (the one file that imports Vue)                                          |
| `index.ts`      | Barrel re-export                                                                                |

## CONVENTIONS

- **No Vue imports** (except `vue.ts`) — keeps utilities testable/portable
- **No side effects** — pure functions only
- Consumed by both `composables/` and `components/` via `../shared/`
- Exported as `@soybeanjs/headless/shared` sub-path
