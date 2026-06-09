# UI STYLED LAYER — @soybeanjs/ui

## AI ASSISTANT BRIDGE

For any AI assistant editing files under `packages/ui/`:

1. Read `.github/assistant-rules.md`.
2. Follow `.github/copilot-instructions.md`.
3. Apply the relevant files from `.github/instructions/`, especially the common TypeScript/Vue rules.
4. For `packages/ui/src/components/**`, the nearer `packages/ui/src/components/AGENTS.md` narrows the exact UI-component rule set.

The remaining content in this file is package knowledge and local context. Normative rules still live in `.github/`.

**Package:** `packages/ui/` → publishes as `@soybeanjs/ui`
**Role:** Styled wrappers over headless primitives. UnoCSS + @soybeanjs/cva.

## COMPONENT PATTERN

Every styled component follows this flow:

1. Import headless component(s) from `@soybeanjs/headless`
2. Define the style recipe in `packages/ui/src/styles/{name}.ts` with `cv()` / `scv()` (MUST have `// @unocss-include` at top)
3. In wrapper SFC: `useOmitProps` to separate style props from logic props
4. Inject UI tokens: `provideXUi(ui)` where `ui` = computed slot→class map
5. Merge classes: single-class wrappers use `${name}Variants({...}, props.class)`; multi-slot wrappers pass `props.ui` and `{ root: props.class }` directly into the recipe call
6. Import or re-export wrapper-facing component types from `@soybeanjs/headless/{component}` sub-paths, and import headless global types from `@soybeanjs/headless/types`, then rerun `pnpm sui ui` after public export changes

## STRUCTURE

```
packages/ui/src/
├── components/   # 91 styled components (S-prefixed: SButton, SDialog...)
│   └── [name]/   # index.ts, *.vue, types.ts
├── styles/       # cv/scv recipe files consumed by wrappers
├── theme/        # size context, ThemeColor/ThemeSize. See theme/AGENTS.md
├── constants/    # UI-layer constants
├── nuxt/         # Nuxt module (auto-registration)
├── resolver/     # unplugin-vue-components resolver
└── index.ts      # Barrel: all components + theme exports
```

## VARIANTS

`@soybeanjs/cva` recipe definitions per component:

- `base` / `slots` — default classes
- `variants` — `color`, `size`, `variant` axes
- `compoundVariants` — conditional combos
- `defaultVariants` — fallback values

Size uses `ThemeSize` (`xs|sm|md|lg|xl|2xl`). Color uses `ThemeColor` (8 values including `primary`, `destructive`, `success`, etc.).

## INTEGRATIONS

- **Nuxt**: `@soybeanjs/ui/nuxt` module for auto component registration
- **unplugin**: `@soybeanjs/ui/resolver` for `unplugin-vue-components`
- **CSS**: `@soybeanjs/ui/styles.css` — built by `unocss build` step
- **Generated component names**: `packages/ui/src/constants/components.ts` is generated from `packages/ui/src/index.ts`; rerun `pnpm sui ui` after changing public UI exports

## ANTI-PATTERNS

- **NO `<style>` blocks or raw CSS** — UnoCSS classes only
- **NO ARIA/state logic** — belongs in headless layer
- **NO prop redefinition** — extend headless props via `types.ts`
