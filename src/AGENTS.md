# UI STYLED LAYER — @soybeanjs/ui

**Package:** `src/` → publishes as `@soybeanjs/ui`
**Role:** Styled wrappers over headless primitives. UnoCSS + tailwind-variants.

## COMPONENT PATTERN

Every styled component follows this flow:

1. Import headless component(s) from `@soybeanjs/headless`
2. Define `variants.ts` with `tv()` (MUST have `// @unocss-include` at top)
3. In wrapper SFC: `useOmitProps` to separate style props from logic props
4. Inject UI tokens: `provideXUi(ui)` where `ui` = computed slot→class map
5. Merge classes: `cn(variants(...), props.class)` or `mergeSlotVariants`

## STRUCTURE

```
src/
├── components/   # 48 styled components (S-prefixed: SButton, SDialog...)
│   └── [name]/   # index.ts, *.vue, types.ts, variants.ts
├── theme/        # cn(), size context, ThemeColor/ThemeSize. See theme/AGENTS.md
├── constants/    # UI-layer constants
├── nuxt/         # Nuxt module (auto-registration)
├── resolver/     # unplugin-vue-components resolver
└── index.ts      # Barrel: all components + theme exports
```

## VARIANTS

`tailwind-variants` `tv()` definitions per component:
- `base` / `slots` — default classes
- `variants` — `color`, `size`, `variant` axes
- `compoundVariants` — conditional combos
- `defaultVariants` — fallback values

Size uses `ThemeSize` (`xs|sm|md|lg|xl|2xl`). Color uses `ThemeColor` (8 values including `primary`, `destructive`, `success`, etc.).

## INTEGRATIONS

- **Nuxt**: `@soybeanjs/ui/nuxt` module for auto component registration
- **unplugin**: `@soybeanjs/ui/resolver` for `unplugin-vue-components`
- **CSS**: `@soybeanjs/ui/styles.css` — built by `unocss build` step

## ANTI-PATTERNS

- **NO `<style>` blocks or raw CSS** — UnoCSS classes only
- **NO ARIA/state logic** — belongs in headless layer
- **NO prop redefinition** — extend headless props via `types.ts`
