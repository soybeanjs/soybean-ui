# HEADLESS COMPOSABLES

**26 hooks** shared across all headless primitives. Pure Vue Composition API.

## CATEGORIES

| Category      | Composables                                                                    | Purpose                                                               |
| ------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **State**     | `use-context`, `use-controllable-state`, `use-state-machine`                   | Provider/consumer, controlled/uncontrolled props, FSM                 |
| **Focus**     | `use-focus-scope`, `use-focus-guards`, `use-arrow-navigation`                  | Trap focus, guard focus escapes, arrow key nav                        |
| **Layer**     | `use-dismissable-layer`, `use-escape-key-down`, `use-body-scroll-lock`         | Click-outside, Esc key, scroll lock                                   |
| **Floating**  | `use-floating`, `use-grace-area`, `use-popup-events`                           | Positioning (floating-ui), hover grace zones, popup triggers          |
| **DOM**       | `use-forward-element`, `use-exposed-element`, `use-hide-others`                | Ref forwarding, `aria-hidden` siblings                                |
| **Selection** | `use-selection`, `use-collection`, `use-typeahead`                             | Multi-select state, item registration, type-to-search                 |
| **Bridge**    | `use-ui-context`, `use-props`, `use-forward-listeners`                         | UI↔headless class injection, prop utilities, event forwarding         |
| **Misc**      | `use-presence`, `use-image-loading-status`, `use-is-using-keyboard`, `use-kbd` | Enter/exit animation, image load state, input modality, key constants |

## KEY PATTERNS

- **Factory pattern**: `useContext` returns `[provide, inject]` tuple — used by every component's `context.ts`
- **useUiContext**: Only bridge to UI layer. Returns `[provideXUi, useXUi]`. The single `@ts-expect-error` in codebase lives here.
- **useControllableState**: If `prop()` returns `undefined` → internal `shallowRef`; otherwise → computed proxy. Deduplicates via `skip` flag + `nextTick`.

## CONVENTIONS

- File naming: `use-[feature].ts` (kebab-case)
- All exported from `composables/index.ts` barrel
- No Vue SFC files — pure `.ts` composables only
- Import shared utilities from `../shared/`, types from `../types/`
