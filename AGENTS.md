# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-16
**Version:** 0.14.0
**Monorepo:** pnpm workspaces (`headless/`, `docs/`; root = `@soybeanjs/ui`)
**Stack:** Vue 3 + TypeScript (strict) + UnoCSS + tailwind-variants ^3.2.2

## ARCHITECTURE

Headless/Styled separation. Two packages ship independently:

- **@soybeanjs/headless** (`headless/`): Logic, state, a11y. Zero styles. 74 component directories, 26 composables. Includes base primitives and Compact aggregations.
- **@soybeanjs/ui** (`src/`): Styled wrappers. UnoCSS + `tv()`. 74 components, `S`-prefixed.
- **@soybeanjs/ui-docs** (`docs/`): Vite + vite-ssg + unplugin-vue-markdown. NOT VitePress.

Data flow: `headless` → `src` (never reverse). UI injects styles via `provideXUi(ui)` → headless reads via `useUiContext`.

## WHERE TO LOOK

| Task                   | Location                            | Key Pattern                                                                  |
| ---------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| New component (logic)  | `headless/src/components/[name]/`   | types.ts → context.ts → base \*.vue → optional compact/hook files → index.ts |
| New component (styled) | `src/components/[name]/`            | variants.ts → types.ts → `*.vue` → index.ts                                  |
| Variant definitions    | `src/components/[name]/variants.ts` | `tv()` with `// @unocss-include` at top                                      |
| Shared hooks           | `headless/src/composables/`         | `use-*.ts`, pure Vue composables (26 total)                                  |
| Theme/sizing           | `src/theme/`                        | `cn()`, `provideSizeContext`, `ThemeColor` (8), `ThemeSize` (xs…2xl)         |
| Utility functions      | `headless/src/shared/`              | Pure TS helpers (DOM, focus, tree, form, guard, comparison)                  |
| Global types           | `headless/src/types/`               | `ClassValue`, `UiClass<S>`, `PropsToContext<T,K>`, `PrimitiveProps`          |
| Docs content           | `docs/src/docs/[en\|zh-CN]/`        | Markdown with ` ```playground ` blocks                                       |
| Demo source            | `playground/examples/[component]/`  | Vue SFCs referenced by docs                                                  |

## BUILD & CI

```bash
pnpm dev              # Playground (Vite)
pnpm build            # headless (tsdown) → ui (tsdown) → css (unocss build)
pnpm lint             # oxlint --fix && eslint --fix (uses @soybeanjs/eslint-config-vue)
pnpm fmt              # oxfmt (formatter)
pnpm test             # vitest run (happy-dom, @vue/test-utils)
pnpm typecheck        # vue-tsc --noEmit --skipLibCheck
pnpm release          # Publish packages (soy release)
pnpm stub             # tsx scripts/stub.ts — link src to dist for local dev
```

- **Pre-commit hook** (simple-git-hooks): `pnpm typecheck && pnpm lint-staged`
- **CI**: Tag-triggered release only (`release.yml`). No PR check workflow.
- **Formatter**: `oxfmt`

## PACKAGE EXPORTS

**@soybeanjs/headless** sub-path exports:

- `.` → all components + types
- `./composables` → 26 composables (useContext, useControllableState, useUiContext, …)
- `./shared` → pure TS utilities
- `./constants` → ARIA constants, component keys
- `./namespaced` → named-export namespace (e.g. `Headless.AccordionRoot`)
- `./*` → `./components/*/index.ts` (per-component sub-path: `@soybeanjs/headless/accordion`)

**@soybeanjs/ui** sub-path exports:

- `.` → all S-prefixed components + theme utilities
- `./nuxt` → Nuxt auto-registration module
- `./resolver` → unplugin-vue-components resolver
- `./styles.css` → built UnoCSS stylesheet

## DEPENDENCY RULES

- `headless` → MUST NOT import from `@soybeanjs/ui` (circular dep)
- `src` → imports `@soybeanjs/headless` (via package.json alias, dev points to source)
- Components re-exported from barrel files: `headless/src/index.ts`, `src/index.ts`

## KEY PATTERNS (verified from source)

- **UiClass**: Use `UiClass<UiSlot>` (from `headless/src/types`), not `Record<UiSlot, ClassValue>`
- **Props**: Always `extends /** @vue-ignore */ HTMLAttributes` to suppress IDE noise
- **Context values**: Must be reactive — use `transformPropsToContext(props, keys)` to wrap in `ComputedRef`
- **ui() two forms**: `use{Name}Ui('root')` → `ComputedRef<ClassValue>` (single slot); `use{Name}Ui()` → full map
- **mergeSlotVariants**: Always pass `{ root: props.class }` as third arg to merge the `class` prop
- **Multi-slot**: `provide{Name}Ui(ui)` pattern; only export `provide`, not `use`
- **Compact aggregations**: For stable, data-driven composites (currently `AccordionCompact`, `TableCompact`), headless owns iteration, default content, and internal composition; UI wrappers stay thin and only handle variants, class injection, and prop/slot forwarding
- **Single-class**: No UiContext; use `cn(variants({...}), props.class)` directly
- **index.ts re-exports**: UI component barrels re-export headless types from sub-path `@soybeanjs/headless/{component}`; `types.ts` should follow the established import style of neighboring components instead of mixing arbitrary paths

## ANTI-PATTERNS

- **DO NOT** add styles/classes to `headless` components (not even `hidden`, `sr-only`)
- **DO NOT** put ARIA/state logic in `src` (UI) layer
- **DO NOT** use raw CSS/SCSS — UnoCSS utility classes only
- **DO NOT** use `as any` / `@ts-ignore` / `@ts-expect-error`
- **DO NOT** store non-reactive values in context (breaks reactivity)
- **DO NOT** modify `typed-router.d.ts` (auto-generated)
- **DO NOT** export `use{Name}Ui` from headless index (internal only; export only `provide{Name}Ui`)
- **DO NOT** omit `class` from `useOmitProps` list (causes double-binding)

## COMPONENT DEVELOPMENT

**Skill**: `skill(name="soybean-ui-component-development")` — loads full workflow guide with templates.

Minimal flow: headless types → headless context → headless base SFCs → optional Compact SFCs/hooks → UI variants → UI wrapper → barrel exports.

Three component patterns:

- **Multi-slot base components** (badge, accordion, dialog…): has `UiSlot` + `UiClass`, uses `mergeSlotVariants`
- **Compact aggregations** (`AccordionCompact`, `TableCompact`): live in headless, compose base primitives, and expose `*CompactProps` / `*CompactEmits` / `*CompactSlots`
- **Single-class** (button, link…): no UiContext, uses `cn(variants, props.class)` directly
