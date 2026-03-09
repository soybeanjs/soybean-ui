# HEADLESS PACKAGE — @soybeanjs/headless

**Package:** `headless/` → publishes as `@soybeanjs/headless`
**Role:** Logic layer. State, a11y, keyboard nav, focus management. Zero styles.

## EXPORTS

Dev mode resolves to `./src/...` (source); publishConfig switches to `./dist/...`.
Three sub-path exports: root, `/composables`, `/shared` — each has own barrel.

## KEY PATTERNS

- **useContext**: Factory returning `[provideX, injectX]` pair via `Symbol` key. Components call `injectX('ComponentName')` — throws if missing provider.
- **useUiContext**: Bridge to UI layer. Returns `[provideXUi, useUi]`. Headless reads class tokens injected by UI layer. Only file with `@ts-expect-error`.
- **useControllableState**: Controlled/uncontrolled prop pattern. If initial prop is `undefined`, uses internal `shallowRef`; otherwise returns computed proxy.
- **useForwardElement**: Exposes inner DOM element via `defineExpose`. Prefer over direct DOM access.

## STRUCTURE

```
headless/src/
├── components/   # 50 primitives (one dir each). See components/AGENTS.md
├── composables/  # 26 reusable hooks. See composables/AGENTS.md
├── shared/       # Pure TS utilities (no Vue). See shared/AGENTS.md
├── constants/    # ARIA attrs, collection markers, component constants
├── types/        # Global types: ClassValue, UiClass, component/DOM/event types
└── index.ts      # Barrel: re-exports components + composables + shared + types
```

## ANTI-PATTERNS

- **NO imports from `@soybeanjs/ui`** — circular dependency
- **NO styles** — not even `hidden`, `sr-only`, or inline styles
- **NO presentation logic** — colors, sizing, spacing belong in UI layer
- **NO direct DOM mutation** — use Vue refs + `useForwardElement`
