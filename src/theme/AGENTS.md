# UI THEME SYSTEM

Design tokens, class merging, and size context for the styled layer.

## FILES

| File | Role |
|---|---|
| `types.ts` | `ThemeColor` (8 colors: primary, destructive, success, warning, info, carbon, secondary, accent) and `ThemeSize` (xs, sm, md, lg, xl, 2xl) |
| `merge.ts` | `cn(...inputs)` = `twMerge(clsx(inputs))` — the universal class merge utility |
| `config.ts` | `themeSizeMap` (px values per size), `themeSizeRatio` (relative to md=16px) |
| `context.ts` | `provideSizeContext` / `useSizeContext` — inject size from `ConfigProvider` down to children |
| `shared.ts` | `mergeSlotVariants(variants, ...uis)` — merges tv() output with UI context classes; `mergeUi(target, ...sources)` — merges class maps |
| `index.ts` | Barrel re-export |

## KEY CONCEPTS

- **cn()**: Used everywhere in UI components. Merges UnoCSS classes with conflict resolution.
- **Size context**: `ConfigProvider` → `provideSizeContext(size)` → any nested component reads via `useSizeContext()`. Defaults to `md`.
- **mergeSlotVariants**: Bridges `tv()` slot output with class tokens from headless `useUiContext`. Used in multi-slot components.

## CONVENTIONS

- Size ratio is relative to `md` (16px = 1.0). Use `themeSizeRatio` for proportional scaling.
- `ThemeColor` and `ThemeSize` are the canonical variant axis types — variant definitions in components must use these.
