# HEADLESS COMPONENTS

**74 component directories**. Most expose base primitives/parts; some also ship Compact aggregation APIs in the same directory.

## COMPONENT MODES

- **Base parts**: `Root`, `Trigger`, `Content`, `Item`, `Cell`, and similar headless primitives that the UI layer composes freely.
- **Compact aggregations**: For data-driven, structurally stable use cases, a directory can additionally expose `{Name}Compact`; headless owns item iteration, base-part composition, default content, and slot props. Current examples: `AccordionCompact`, `TableCompact`.

## ANATOMY (per component dir)

| File         | Role                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types.ts`   | Props/emits/interfaces. Includes base part types, and when present `{Name}CompactProps/Emits/Slots`.                                                           |
| `context.ts` | `useContext()` call → `[provideX, injectX]`. Optional `useUiContext()` → `[provideXUi, useXUi]`. Complex Compact APIs may add dedicated context here as well.  |
| `*.vue`      | Base SFC parts such as `<ComponentName>Root`, `<ComponentName>Trigger`, `<ComponentName>Content`. Some dirs also include `*-compact.vue` or `*-compact-*.vue`. |
| `hooks.ts`   | Optional. Used when Compact/state derivation becomes complex, for example `table/hooks.ts`.                                                                    |
| `shared.ts`  | Optional pure helpers shared by base and Compact implementations.                                                                                              |
| `index.ts`   | Barrel: re-exports base SFCs, optional `*Compact`, helpers, and types. Named exports only.                                                                     |

## NAMING

- SFC files: `kebab-case.vue` matching component part (e.g., `accordion-root.vue`)
- Compact SFC files: `{name}-compact.vue`, child pieces use `{name}-compact-{part}.vue`
- Types: `<ComponentName><Part>Props`, `<ComponentName><Part>Emits`
- Compact types: `<ComponentName>CompactProps`, `<ComponentName>CompactEmits`, `<ComponentName>CompactSlots`
- Context: `provide<ComponentName>Context`, `inject<ComponentName>Context`

## STATE SHARING

Components use `provide`/`inject` via `useContext` factory:

- Root provides state → children inject
- `injectX('ChildName')` throws if used outside provider (enforces nesting)
- UI token injection: `provideXUi(ui)` from styled layer → `useXUi('slot')` in headless
- Compact aggregations can define their own provider/injector pair when aggregate-only state should not leak into base part contexts

## CONVENTIONS

- WAI-ARIA roles/attrs set directly on template elements
- Keyboard handlers in SFCs, reusable logic extracted to composables
- `useForwardElement` for exposing DOM refs to parent
- `useControllableState` for controlled/uncontrolled prop patterns
- If a component ships `*Compact`, aggregation logic stays in headless; UI layer should only inject classes, merge variants, and forward UI-specific props/slots
