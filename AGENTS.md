# PROJECT KNOWLEDGE BASE

## AI ASSISTANT ENTRYPOINT

Component development rules live in the self-contained skill at `.agents/skills/soybean-ui-component-development/`:

- [SKILL.md](.agents/skills/soybean-ui-component-development/SKILL.md) — pattern classification, phase order, workflows, guardrails, delivery surfaces, generation workflow.
- [layers.md](.agents/skills/soybean-ui-component-development/layers.md) — headless/UI layer rules, a11y/RTL.
- [surfaces.md](.agents/skills/soybean-ui-component-development/surfaces.md) — playground, docs, testing delivery surface rules.
- [e2e.md](.agents/skills/soybean-ui-component-development/e2e.md) — browser e2e testing (Tier 1 component-level + Tier 2 app-level smoke), env setup, core scenarios, assertion standards.
- [process.md](.agents/skills/soybean-ui-component-development/process.md) — finish checklist, git commit convention.
- [audit.md](.agents/skills/soybean-ui-component-development/audit.md) — assessment methodology, seven check dimensions (D1–D7, 100 items), severity, acceptance, regression flows for already-shipped components.
- [EXAMPLES.md](.agents/skills/soybean-ui-component-development/EXAMPLES.md) — request shapes that trigger the skill.

**Global skill rules (mandatory for all agents, applied before any task):**

- When editing `**/*.{ts,tsx,js,jsx}` files, first `read_skill typescript-functional-style` and follow it.
- When editing `**/*.vue` files, first `read_skill typescript-functional-style` and `read_skill vue-sfc-structure`, and follow both.

Both skills are installed globally in the skills store and can be loaded from any project. They are the single source of truth for TypeScript functional style and Vue SFC structure; the component development skill does not restate their content.

Load the component development skill for any task that creates, migrates, extends, standardizes, fixes, or audits a SoybeanUI component. For auditing or re-evaluating already-shipped components, load [audit.md](.agents/skills/soybean-ui-component-development/audit.md) for the assessment methodology; the project-level snapshot (component list, task table, priority, execution order, concrete benchmark findings) lives in `docs/check.md`.

If a nearer scoped `AGENTS.md` exists for your target path, use it only to narrow which skill sections apply.

**Generated:** 2026-08-02
**Version:** 0.29.3
**Monorepo:** pnpm workspaces (`packages/`, `apps/`; root = `@soybeanjs/ui`)
**Stack:** Vue 3 + TypeScript (strict) + UnoCSS + @soybeanjs/cva

## ARCHITECTURE

Headless/Styled separation. Two packages ship independently:

- **@soybeanjs/headless** (`packages/headless/`): Logic, state, a11y. Zero styles. 94 component directories (92 publicly exported; `_common`/`_icon` are internal), 27 composables. Includes base primitives, date utilities, and Compact aggregations.
- **@soybeanjs/ui** (`packages/ui/`): Styled wrappers. UnoCSS + `cv()` / `scv()`. 88 component directories / 110 S-prefixed exports.
- **@soybeanjs/ui-docs** (`apps/docs/`): Vite + vite-ssg + unplugin-vue-markdown + markdown-exit. NOT VitePress.

Data flow: `packages/headless` → `packages/ui` (never reverse). UI injects styles via `provideXUi(ui)` → headless reads via `useUiContext`.

## WHERE TO LOOK

| Task                     | Location                                                                  | Key Pattern                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| New component (logic)    | `packages/headless/src/components/[name]/`                                | types.ts → context.ts → base \*.vue → optional compact/hook files → index.ts                                               |
| New component (styled)   | `packages/ui/src/components/[name]/` + `packages/ui/src/styles/[name].ts` | style recipe → types.ts → `*.vue` → index.ts                                                                               |
| Variant definitions      | `packages/ui/src/styles/[name].ts`                                        | `cv()` / `scv()` with `// @unocss-include` at top                                                                          |
| Shared hooks             | `packages/headless/src/composables/`                                      | `use-*.ts`, pure Vue composables (27 total)                                                                                |
| Theme/sizing             | `packages/ui/src/theme/`                                                  | `ThemeColor` (8), `ThemeSize` (xs…2xl)                                                                                     |
| Utility functions        | `packages/headless/src/shared/`                                           | Pure TS helpers (DOM, focus, tree, form, guard, comparison)                                                                |
| Global types             | `packages/headless/src/types/`                                            | `ClassValue`, `UiClass<S>`, `PropsToContext<T,K>`, `PrimitiveProps`                                                        |
| Generated API data       | `apps/docs/src/generated/api/`                                            | `pnpm sui api` baseline + `pnpm sui api-translate` locale descriptions                                                     |
| Generated changelog data | `apps/docs/src/generated/changelog/`                                      | `pnpm sui changelog` baseline + `pnpm sui changelog-translate` locale summaries                                            |
| Docs content             | `apps/docs/src/docs/[en\|zh-CN]/`                                         | Markdown rendering `<UsageCode>`, `<PlaygroundGallery>`, `<ComponentApi>`                                                  |
| Demo source              | `apps/playground/src/examples/[component]/`                               | Vue SFCs referenced by docs                                                                                                |
| Browser e2e tests        | `packages/ui/test/browser/`                                               | `vitest.browser.config.ts` + `vitest-browser-vue` + `axe-core` (color-contrast on)                                         |
| Component dev skill      | `.agents/skills/soybean-ui-component-development/`                        | SKILL.md + layers.md + surfaces.md + e2e.md + process.md + audit.md + EXAMPLES.md                                          |
| Component audit snapshot | `docs/check.md`                                                           | 88-component task table (C01–C90), P0–P3 priority, 13-round order, benchmark findings; methodology sourced from `audit.md` |

## BUILD & CI

```bash
pnpm dev:playground    # Playground (Vite)
pnpm dev:docs         # Docs site (Vite + vite-ssg)
pnpm build            # headless (tsdown) → ui (tsdown) → sbean (tsdown)
pnpm lint             # vp lint --fix && pnpm lint:vue (uses @soybeanjs/eslint-config-vue)
pnpm fmt              # vp fmt (formatter)
pnpm test             # vitest run (happy-dom, @vue/test-utils)
pnpm test:e2e         # browser e2e (Vitest Browser Mode + playwright chromium; run `pnpm exec playwright install chromium` first)
pnpm typecheck        # vue-tsc --noEmit --skipLibCheck (runs across all workspaces)
pnpm release          # Generate changelog + sync templates + publish (soy release)
pnpm stub             # tsx scripts/stub.ts — link src to dist for local dev
pnpm sui headless     # Regenerate packages/headless/src/constants/components.ts + packages/headless/src/namespaced/index.ts from packages/headless/src/index.ts
pnpm sui ui           # Regenerate packages/ui/src/constants/components.ts from packages/ui/src/index.ts
pnpm sui api          # Regenerate apps/docs/src/generated/api/*.json and apps/docs/src/generated/api-locales/*.json base data
pnpm sui api-locales     # Regenerate API i18n locale template data without re-running type extraction
pnpm sui api-translate -- --locale <locale>  # Translate generated English API descriptions into a non-English locale
pnpm sui changelog    # Regenerate apps/docs/src/generated/changelog/*.json and apps/docs/src/generated/changelog-locales/*.json base data
pnpm sui changelog-translate -- --locale <locale>  # Translate generated English changelog summaries into a non-English locale
```

- **Pre-commit hook** (simple-git-hooks): `vp staged`
- **CI**: `ci.yml` runs typecheck / lint / test + browser e2e on PRs and pushes to `main`/`master`; `release.yml` handles tag-triggered release.
- **Formatter**: `vp fmt`

## PACKAGE EXPORTS

**@soybeanjs/headless** sub-path exports:

- `.` → all components + types
- `./composables` → 27 composables (useContext, useControllableState, useUiContext, …)
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

- `packages/headless` → MUST NOT import from `@soybeanjs/ui` (circular dep)
- `packages/ui` → imports `@soybeanjs/headless` (via package.json alias, dev points to source)
- Components re-exported from barrel files: `packages/headless/src/index.ts`, `packages/ui/src/index.ts`

## KEY PATTERNS (verified from source)

- **UiClass**: Use `UiClass<UiSlot>` (from `packages/headless/src/types`), not `Record<UiSlot, ClassValue>`
- **Props**: Always `extends /** @vue-ignore */ HTMLAttributes` to suppress IDE noise
- **Context values**: Must be reactive — use `transformPropsToContext(props, keys)` to wrap in `ComputedRef`
- **ui() two forms**: `use{Name}Ui('root')` → `ComputedRef<ClassValue>` (single slot); `use{Name}Ui()` → full map
- **Recipe merges**: For multi-slot wrappers, pass `props.ui` and `{ root: props.class }` directly into the `scv()` recipe call
- **Multi-slot**: `provide{Name}Ui(ui)` pattern; only export `provide`, not `use`
- **Compact aggregations**: For stable, data-driven composites, headless owns iteration, default content, and internal composition; UI wrappers stay thin and only handle variants, class injection, and prop/slot forwarding. Current examples span accordion, card, date-field, dialog, editable, hover-card, layout, navigation-menu, pagination, popover, stepper, and table flows.
- **Single-class**: No UiContext; use `{name}Variants({...}, props.class)` directly
- **index.ts re-exports**: UI component barrels re-export headless types from sub-path `@soybeanjs/headless/{component}`; `types.ts` should follow the established import style of neighboring components instead of mixing arbitrary paths
- **Generated metadata**: after public export, API, or changelog mapping/docs-surface changes, rerun `pnpm sui headless`, `pnpm sui ui`, `pnpm sui api`, and `pnpm sui changelog` as needed; for non-English generated text, also run `pnpm sui api-translate -- --locale <locale>` and `pnpm sui changelog-translate -- --locale <locale>`

## ANTI-PATTERNS

- **DO NOT** add styles/classes to `packages/headless` components (not even `hidden`, `sr-only`)
- **DO NOT** put ARIA/state logic in `packages/ui` (UI) layer
- **DO NOT** use raw CSS/SCSS — UnoCSS utility classes only
- **DO NOT** use `as any` / `@ts-ignore` / `@ts-expect-error`
- **DO NOT** store non-reactive values in context (breaks reactivity)
- **DO NOT** modify `typed-router.d.ts` (auto-generated)
- **DO NOT** export `use{Name}Ui` from headless index (internal only; export only `provide{Name}Ui`)
- **DO NOT** omit `class` from `useOmitProps` list (causes double-binding)

## COMPONENT DEVELOPMENT

组件开发规范入口：`.agents/skills/soybean-ui-component-development/SKILL.md`。

Minimal flow: headless types → headless context → headless base SFCs → optional Compact SFCs/hooks → UI style recipe in `packages/ui/src/styles` → UI wrapper → barrel exports.

Three component patterns:

- **Multi-slot base components** (badge, accordion, dialog…): has `UiSlot` + `UiClass`, uses `scv()` results merged directly in the wrapper
- **Compact aggregations** (`AccordionCompact`, `TableCompact`): live in headless, compose base primitives, and expose `*CompactProps` / `*CompactEmits` / `*CompactSlots`
- **Single-class** (button, link…): no UiContext, uses `{name}Variants({...}, props.class)` directly
