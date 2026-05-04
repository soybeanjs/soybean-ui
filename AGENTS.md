# PROJECT KNOWLEDGE BASE

## AI ASSISTANT ENTRYPOINT

This repository keeps the normative AI coding rules under `.github/`.

For any AI assistant working in this repository:

- If any bridge file conflicts with `.github/`, `.github/` wins.
- If multiple `AGENTS.md` files apply, the nearest scoped file only narrows which `.github` rules to read for the current path.

**Universal rules (read for every edit):**

- `.github/instructions/import-order.instructions.md`
- `.github/instructions/typescript-functional-style.instructions.md`
- `.github/instructions/vue-sfc.instructions.md` (for .vue files)

**Component work (editing `headless/` or `src/components/`):**

- `.github/instructions/soybean-ui-component-overview.instructions.md`
- `.github/instructions/soybean-ui-headless.instructions.md` (for `headless/src/components/`)
- `.github/instructions/soybean-ui-ui-layer.instructions.md` (for `src/components/`)
- `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`

**Delivery surfaces:**

- `.github/instructions/soybean-ui-playground.instructions.md` (for `playground/`)
- `.github/instructions/soybean-ui-docs.instructions.md` (for `docs/`)
- `.github/instructions/soybean-ui-testing.instructions.md` (for `test/`)

**Commit / changelog:** `.github/instructions/git-commit-convention.instructions.md`

The remaining content in this file is repository knowledge and project context. It is informative, but the rule source of truth stays in `.github/`.

### Scoped AGENTS map

- `headless/src/components/AGENTS.md` routes headless component work to the relevant `.github` rules
- `headless/src/composables/AGENTS.md` routes headless composable work to the relevant `.github` rules
- `headless/src/shared/AGENTS.md` routes headless shared utility work to the relevant `.github` rules
- `src/components/AGENTS.md` routes styled wrapper work to the relevant `.github` rules
- `src/theme/AGENTS.md` routes theme-layer work to the relevant `.github` rules
- `playground/examples/AGENTS.md` routes playground demo work to the relevant `.github` rules
- `docs/src/docs/AGENTS.md` routes component docs work to the relevant `.github` rules
- `test/specs/components/AGENTS.md` routes component test work to the relevant `.github` rules

**Generated:** 2026-05-04
**Version:** 0.17.0
**Monorepo:** pnpm workspaces (`headless/`, `docs/`; root = `@soybeanjs/ui`)
**Stack:** Vue 3 + TypeScript (strict) + UnoCSS + tailwind-variants ^3.2.2

## ARCHITECTURE

Headless/Styled separation. Two packages ship independently:

- **@soybeanjs/headless** (`headless/`): Logic, state, a11y. Zero styles. 95 component directories, 25 composables. Includes base primitives, date utilities, and Compact aggregations.
- **@soybeanjs/ui** (`src/`): Styled wrappers. UnoCSS + `tv()`. 91 components, `S`-prefixed.
- **@soybeanjs/ui-docs** (`docs/`): Vite + vite-ssg + unplugin-vue-markdown + markdown-exit. NOT VitePress.

Data flow: `headless` → `src` (never reverse). UI injects styles via `provideXUi(ui)` → headless reads via `useUiContext`.

## WHERE TO LOOK

| Task                     | Location                            | Key Pattern                                                                      |
| ------------------------ | ----------------------------------- | -------------------------------------------------------------------------------- |
| New component (logic)    | `headless/src/components/[name]/`   | types.ts → context.ts → base \*.vue → optional compact/hook files → index.ts     |
| New component (styled)   | `src/components/[name]/`            | variants.ts → types.ts → `*.vue` → index.ts                                      |
| Variant definitions      | `src/components/[name]/variants.ts` | `tv()` with `// @unocss-include` at top                                          |
| Shared hooks             | `headless/src/composables/`         | `use-*.ts`, pure Vue composables (26 total)                                      |
| Theme/sizing             | `src/theme/`                        | `cn()`, `provideSizeContext`, `ThemeColor` (8), `ThemeSize` (xs…2xl)             |
| Utility functions        | `headless/src/shared/`              | Pure TS helpers (DOM, focus, tree, form, guard, comparison)                      |
| Global types             | `headless/src/types/`               | `ClassValue`, `UiClass<S>`, `PropsToContext<T,K>`, `PrimitiveProps`              |
| Generated API data       | `docs/src/generated/api/`           | `pnpm gen:api` baseline + `pnpm translate:api:i18n` locale descriptions          |
| Generated changelog data | `docs/src/generated/changelog/`     | `pnpm gen:changelog` baseline + `pnpm translate:changelog:i18n` locale summaries |
| Docs content             | `docs/src/docs/[en\|zh-CN]/`        | Markdown rendering `<UsageCode>`, `<PlaygroundGallery>`, `<ComponentApi>`        |
| Demo source              | `playground/examples/[component]/`  | Vue SFCs referenced by docs                                                      |

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
pnpm gen:headless     # Regenerate headless/src/constants/components.ts + headless/src/namespaced/index.ts from headless/src/index.ts
pnpm gen:ui           # Regenerate src/constants/components.ts from src/index.ts
pnpm gen:api          # Regenerate docs/src/generated/api/*.json and docs/src/generated/api-locales/*.json base data
pnpm gen:api:i18n     # Regenerate API i18n locale template data without re-running type extraction
pnpm translate:api:i18n -- --locale <locale>  # Translate generated English API descriptions into a non-English locale
pnpm gen:changelog    # Regenerate docs/src/generated/changelog/*.json and docs/src/generated/changelog-locales/*.json base data
pnpm translate:changelog:i18n -- --locale <locale>  # Translate generated English changelog summaries into a non-English locale
```

- **Pre-commit hook** (simple-git-hooks): `pnpm typecheck && pnpm lint-staged`
- **CI**: Tag-triggered release only (`release.yml`). No PR check workflow.
- **Formatter**: `oxfmt`

## PACKAGE EXPORTS

**@soybeanjs/headless** sub-path exports:

- `.` → all components + types
- `./composables` → 25 composables (useContext, useControllableState, useUiContext, …)
- `./shared` → pure TS utilities
- `./constants` → ARIA constants, component keys
- `./date` → shared date utilities and calendar helpers
- `./namespaced` → named-export namespace (e.g. `Headless.AccordionRoot`)
- `./types` → shared type surface for component, DOM, and utility types
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
- **Compact aggregations**: For stable, data-driven composites, headless owns iteration, default content, and internal composition; UI wrappers stay thin and only handle variants, class injection, and prop/slot forwarding. Current examples span accordion, card, date-field, dialog, editable, hover-card, layout, navigation-menu, pagination, popover, stepper, and table flows.
- **Single-class**: No UiContext; use `cn(variants({...}), props.class)` directly
- **index.ts re-exports**: UI component barrels re-export headless types from sub-path `@soybeanjs/headless/{component}`; `types.ts` should follow the established import style of neighboring components instead of mixing arbitrary paths
- **Generated metadata**: after public export, API, or changelog mapping/docs-surface changes, rerun `pnpm gen:headless`, `pnpm gen:ui`, `pnpm gen:api`, and `pnpm gen:changelog` as needed; for non-English generated text, also run `pnpm translate:api:i18n -- --locale <locale>` and `pnpm translate:changelog:i18n -- --locale <locale>`

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

组件开发规范入口：`.github/copilot-instructions.md` + `.github/instructions/*.instructions.md`。

Minimal flow: headless types → headless context → headless base SFCs → optional Compact SFCs/hooks → UI variants → UI wrapper → barrel exports.

Three component patterns:

- **Multi-slot base components** (badge, accordion, dialog…): has `UiSlot` + `UiClass`, uses `mergeSlotVariants`
- **Compact aggregations** (`AccordionCompact`, `TableCompact`): live in headless, compose base primitives, and expose `*CompactProps` / `*CompactEmits` / `*CompactSlots`
- **Single-class** (button, link…): no UiContext, uses `cn(variants, props.class)` directly
