# HEADLESS PACKAGE — @soybeanjs/headless

## AI ASSISTANT BRIDGE

For any AI assistant editing files under `packages/headless/`:

1. Load the project skill at `.agents/skills/soybean-ui-component-development/` — start with `SKILL.md`, then `layers.md` (Headless section) as the task requires.
2. For `**/*.{ts,tsx,js,jsx}` edits, also load the global `typescript-functional-style` skill.
3. For `**/*.vue` edits, also load the global `typescript-functional-style` and `vue-sfc-structure` skills.
4. For `packages/headless/src/components/**`, the nearer `packages/headless/src/components/AGENTS.md` narrows the exact component-rule set.

The remaining content in this file is package knowledge and local context. Normative component rules live in the skill.

**Package:** `packages/headless/` → publishes as `@soybeanjs/headless`
**Role:** Logic layer. State, a11y, keyboard nav, focus management. Zero visual styles. Also hosts Compact aggregations when structure belongs in headless rather than the UI wrapper. New families must pass [Headless admission](../../.agents/skills/soybean-ui-component-development/layers.md#headless-admission).

## EXPORTS

Dev mode resolves to `./src/...` (source); publishConfig switches to `./dist/...`.
Core exports include root, `/constants`, `/composables`, `/date`, `/shared`, `/nuxt`, `/resolver`, `/namespaced`, `/types`, plus per-component sub-paths under `./*`.

After public export changes, rerun `pnpm sui headless` so `packages/headless/src/constants/components.ts` and `packages/headless/src/namespaced/index.ts` stay aligned with `packages/headless/src/index.ts`.

## KEY PATTERNS

- **useContext**: Factory returning `[provideX, injectX]` pair via `Symbol` key. Components call `injectX('ComponentName')` — throws if missing provider.
- **useUiContext**: High-fanout bridge to the UI layer. Returns `[provideXUi, useUi]`; 67 component contexts currently consume it, so changes require direct contract tests plus broad component verification.
- **useControllableState**: Controlled/uncontrolled prop pattern. If initial prop is `undefined`, uses internal `shallowRef`; otherwise returns computed proxy.
- **useForwardElement**: Exposes inner DOM element via `defineExpose`. Prefer over direct DOM access.
- **Compact components**: Stable, data-driven compositions can live in headless as `{Name}Compact` only for a family that already passed Headless admission. Compact does not admit a new family.
- **Composing another family**: Per-slot alias vs domain SFC. Rule lives in `.agents/skills/soybean-ui-component-development/layers.md` (Step 3.1). Remediations for Autocomplete, Segment, BottomSheet, and Combobox Anchor/GroupLabel/ItemIndicator are done; remaining aliases are documented Portal/Arrow/Menu-leaf cases.
- **Type export surface**: UI wrappers should prefer per-component sub-path type re-exports such as `@soybeanjs/headless/dialog`, not ad hoc deep imports.

## STRUCTURE

```
packages/headless/src/
├── components/   # 94 component dirs (92 publicly exported; _common/_icon are internal). Base primitives plus Compact aggregations. See components/AGENTS.md
├── composables/  # 27 reusable hooks. See composables/AGENTS.md
├── shared/       # Pure TS utilities (no Vue). See shared/AGENTS.md
├── constants/    # ARIA attrs, collection markers, component constants
├── date/         # Shared date and calendar helpers
├── locale/       # Locale registry and language bundles
├── nuxt/         # Nuxt auto-registration module
├── resolver/     # unplugin-vue-components resolver
├── types/        # Global types: ClassValue, UiClass, component/DOM/event types
└── index.ts      # Barrel: re-exports components + composables + shared + types
```

## ANTI-PATTERNS

- **NO imports from `@soybeanjs/ui`** — circular dependency
- **NO visual token styles** — not even `hidden`, `sr-only`; layout-contract geometry is allowed (admission R8)
- **NO presentation logic** — colors, sizing, spacing belong in UI layer
- **NO new family that fails the deletion test** — see Headless admission; do not clone Empty/List/Badge/Skeleton
- **NO direct DOM mutation** — use Vue refs + `useForwardElement`
- **NO UI-side reimplementation of stable aggregate structure** — if a data-driven composite is reusable, prefer a headless `*Compact`
