# HEADLESS PACKAGE — @soybeanjs/headless

## AI ASSISTANT BRIDGE

For any AI assistant editing files under `headless/`:

1. Read `.github/assistant-rules.md`.
2. Follow `.github/copilot-instructions.md`.
3. Apply the relevant files from `.github/instructions/`, especially the common TypeScript/Vue rules.
4. For `headless/src/components/**`, the nearer `headless/src/components/AGENTS.md` narrows the exact component-rule set.

The remaining content in this file is package knowledge and local context. Normative rules still live in `.github/`.

**Package:** `headless/` → publishes as `@soybeanjs/headless`
**Role:** Logic layer. State, a11y, keyboard nav, focus management. Zero styles. Also hosts Compact aggregations when structure belongs in headless rather than the UI wrapper.

## EXPORTS

Dev mode resolves to `./src/...` (source); publishConfig switches to `./dist/...`.
Core exports include root, `/constants`, `/composables`, `/date`, `/shared`, `/nuxt`, `/resolver`, `/namespaced`, `/types`, plus per-component sub-paths under `./*`.

After public export changes, rerun `pnpm sui headless` so `headless/src/constants/components.ts` and `headless/src/namespaced/index.ts` stay aligned with `headless/src/index.ts`.

## KEY PATTERNS

- **useContext**: Factory returning `[provideX, injectX]` pair via `Symbol` key. Components call `injectX('ComponentName')` — throws if missing provider.
- **useUiContext**: Bridge to UI layer. Returns `[provideXUi, useUi]`. Headless reads class tokens injected by UI layer. Only file with `@ts-expect-error`.
- **useControllableState**: Controlled/uncontrolled prop pattern. If initial prop is `undefined`, uses internal `shallowRef`; otherwise returns computed proxy.
- **useForwardElement**: Exposes inner DOM element via `defineExpose`. Prefer over direct DOM access.
- **Compact components**: Stable, data-driven compositions can live in headless as `{Name}Compact`, reusing base parts while centralizing iteration, slot props, and default content. Current examples span accordion, card, date-field, dialog, editable, hover-card, layout, navigation-menu, pagination, popover, stepper, and table.
- **Type export surface**: UI wrappers should prefer per-component sub-path type re-exports such as `@soybeanjs/headless/dialog`, not ad hoc deep imports.

## STRUCTURE

```
headless/src/
├── components/   # 95 component dirs. Base primitives plus Compact aggregations. See components/AGENTS.md
├── composables/  # 25 reusable hooks. See composables/AGENTS.md
├── shared/       # Pure TS utilities (no Vue). See shared/AGENTS.md
├── constants/    # ARIA attrs, collection markers, component constants
├── date/         # Shared date and calendar helpers
├── types/        # Global types: ClassValue, UiClass, component/DOM/event types
└── index.ts      # Barrel: re-exports components + composables + shared + types
```

## ANTI-PATTERNS

- **NO imports from `@soybeanjs/ui`** — circular dependency
- **NO styles** — not even `hidden`, `sr-only`, or inline styles
- **NO presentation logic** — colors, sizing, spacing belong in UI layer
- **NO direct DOM mutation** — use Vue refs + `useForwardElement`
- **NO UI-side reimplementation of stable aggregate structure** — if a data-driven composite is reusable, prefer a headless `*Compact`
