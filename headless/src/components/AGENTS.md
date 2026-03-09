# HEADLESS COMPONENTS

**50 primitives**, one directory each. Every component follows identical anatomy.

## ANATOMY (per component dir)

| File | Role |
|---|---|
| `types.ts` | Props/emits interfaces. Extends from `../types/` globals. |
| `context.ts` | `useContext()` call → `[provideX, injectX]`. Optional `useUiContext()` → `[provideXUi, useXUi]`. |
| `*.vue` | SFCs: `<ComponentName>Root`, `<ComponentName>Trigger`, `<ComponentName>Content`, etc. |
| `index.ts` | Barrel: re-exports SFCs + types. Named exports only, no default. |

## NAMING

- SFC files: `kebab-case.vue` matching component part (e.g., `accordion-root.vue`)
- Types: `<ComponentName><Part>Props`, `<ComponentName><Part>Emits`
- Context: `provide<ComponentName>Context`, `inject<ComponentName>Context`

## STATE SHARING

Components use `provide`/`inject` via `useContext` factory:
- Root provides state → children inject
- `injectX('ChildName')` throws if used outside provider (enforces nesting)
- UI token injection: `provideXUi(ui)` from styled layer → `useXUi('slot')` in headless

## CONVENTIONS

- WAI-ARIA roles/attrs set directly on template elements
- Keyboard handlers in SFCs, reusable logic extracted to composables
- `useForwardElement` for exposing DOM refs to parent
- `useControllableState` for controlled/uncontrolled prop patterns
