# PROJECT KNOWLEDGE BASE

## AI ASSISTANT ENTRYPOINT

Component development rules live in the self-contained skill at `.agents/skills/soybean-ui-component-development/`:

- [SKILL.md](.agents/skills/soybean-ui-component-development/SKILL.md) — pattern classification, phase order, workflows, guardrails, delivery surfaces, generation workflow.
- [layers.md](.agents/skills/soybean-ui-component-development/layers.md) — headless/UI layer rules, a11y/RTL.
- [surfaces.md](.agents/skills/soybean-ui-component-development/surfaces.md) — playground, docs, testing delivery surface rules.
- [e2e.md](.agents/skills/soybean-ui-component-development/e2e.md) — browser e2e testing (Tier 1 component-level + Tier 2 app-level smoke), env setup, core scenarios, assertion standards.
- [process.md](.agents/skills/soybean-ui-component-development/process.md) — finish checklist, git commit convention.
- [audit.md](.agents/skills/soybean-ui-component-development/audit.md) — assessment methodology, seven check dimensions (D1–D7, 105 items), severity, acceptance, regression flows for already-shipped components.
- [EXAMPLES.md](.agents/skills/soybean-ui-component-development/EXAMPLES.md) — request shapes that trigger the skill.

**Global skill rules (mandatory for all agents, applied before any task):**

- When editing `**/*.{ts,tsx,js,jsx}` files, first `read_skill typescript-functional-style` and follow it.
- When editing `**/*.vue` files, first `read_skill typescript-functional-style` and `read_skill vue-sfc-structure`, and follow both.

Both skills are installed globally in the skills store and can be loaded from any project. They are the single source of truth for TypeScript functional style and Vue SFC structure; the component development skill does not restate their content.

Load the component development skill for any task that creates, migrates, extends, standardizes, fixes, or audits a SoybeanUI component. For auditing or re-evaluating already-shipped components, load [audit.md](.agents/skills/soybean-ui-component-development/audit.md) for the assessment methodology; the project-level snapshot (component list, task table, priority, execution order, concrete benchmark findings) lives in `docs/check.md`.

If a nearer scoped `AGENTS.md` exists for your target path, use it only to narrow which skill sections apply.

**Generated:** 2026-08-02
**Version:** 0.29.3
**Monorepo:** pnpm workspaces (private root + 9 child workspaces; 6 publishable packages, 3 private apps)
**Stack:** Vue 3 + TypeScript (strict) + UnoCSS + @soybeanjs/cva

## ARCHITECTURE

The canonical workspace map, labeled dependency graph, build/test flows, and
sources of truth live in [docs/architecture.md](docs/architecture.md).
Prioritized structural findings and acceptance criteria live in
[docs/optimize.md](docs/optimize.md).

Core Headless/Styled separation:

- **@soybeanjs/headless** (`packages/headless/`): Logic, state, a11y. Zero styles. 94 component directories (92 publicly exported; `_common`/`_icon` are internal), 27 composables. Includes base primitives, date utilities, and Compact aggregations.
- **@soybeanjs/ui** (`packages/ui/`): Styled wrappers. UnoCSS + `cv()` / `scv()`. 88 component directories / 110 S-prefixed exports.

Compile-time dependency direction is **UI → Headless**: UI imports public
headless entry points; headless MUST NOT import UI. Runtime class injection goes
from the styled wrapper to its nested headless parts via `provideXUi(ui)` and
`useUiContext`.

Other publishable modules:

- **@soybeanjs/shadcn-theme** (`packages/shadcn-theme/`): token and CSS-variable generator.
- **@soybeanjs/unocss-shadcn** (`packages/unocss-shadcn/`): UnoCSS adapter over the theme generator.
- **sbean** (`packages/sbean/`): source-distribution CLI, registry, schemas, templates, and MCP.
- **@soybeanjs/ui-skills** (`skills/`): generated consumer-facing agent skills.

Private applications:

- **@soybeanjs/ui-docs** (`apps/docs/`): Vite + vite-ssg + unplugin-vue-markdown + markdown-exit. NOT VitePress.
- **@soybeanjs/ui-playground** (`apps/playground/`): shared examples and manual/visual validation.
- **@soybeanjs/ui-nuxt** (`apps/nuxt/`): Nuxt integration fixture.

## WHERE TO LOOK

| Task                     | Location                                                                  | Key Pattern                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| New component (logic)    | `packages/headless/src/components/[name]/`                                | types.ts → context.ts → base \*.vue → optional compact/hook files → index.ts                                               |
| New component (styled)   | `packages/ui/src/components/[name]/` + `packages/ui/src/styles/[name].ts` | style recipe → types.ts → `*.vue` → index.ts                                                                               |
| Variant definitions      | `packages/ui/src/styles/[name].ts`                                        | `cv()` / `scv()` with `// @unocss-include` at top                                                                          |
| Shared hooks             | `packages/headless/src/composables/`                                      | `use-*.ts`, pure Vue composables (27 total)                                                                                |
| Theme/sizing             | `packages/ui/src/theme/`                                                  | `ThemeColor` (8), `ThemeSize` (xs…2xl)                                                                                     |
| Theme CSS generation     | `packages/shadcn-theme/`                                                  | `createShadcnTheme(options).getCss()`                                                                                      |
| UnoCSS adapter           | `packages/unocss-shadcn/`                                                 | `presetShadcn()` / `presetSbean()`                                                                                         |
| Source-distribution CLI  | `packages/sbean/`                                                         | commands → registry/schema/templates/MCP                                                                                   |
| Utility functions        | `packages/headless/src/shared/`                                           | Pure TS helpers (DOM, focus, tree, form, guard, comparison)                                                                |
| Global types             | `packages/headless/src/types/`                                            | `ClassValue`, `UiClass<S>`, `PropsToContext<T,K>`, `PrimitiveProps`                                                        |
| Generated API data       | `apps/docs/src/generated/api/`                                            | `pnpm sui api` baseline + `pnpm sui api-translate` locale descriptions                                                     |
| Generated changelog data | `apps/docs/src/generated/changelog/`                                      | `pnpm sui changelog` baseline + `pnpm sui changelog-translate` locale summaries                                            |
| Docs content             | `apps/docs/src/docs/[en\|zh-CN]/`                                         | Markdown rendering `<UsageCode>`, `<PlaygroundGallery>`, `<ComponentApi>`                                                  |
| Demo source              | `apps/playground/src/examples/[component]/`                               | Vue SFCs referenced by docs                                                                                                |
| Browser e2e tests        | `packages/ui/test/browser/`                                               | `vitest.browser.config.ts` + `vitest-browser-vue` + `axe-core` (color-contrast on)                                         |
| Workspace architecture   | `docs/architecture.md`                                                    | Package/app map, dependency graph, generation/build/test/release flows                                                     |
| Architecture assessment  | `docs/optimize.md`                                                        | Evidence-ranked maintainability, scalability, and quality recommendations                                                  |
| Component dev skill      | `.agents/skills/soybean-ui-component-development/`                        | SKILL.md + layers.md + surfaces.md + e2e.md + process.md + audit.md + EXAMPLES.md                                          |
| Component audit snapshot | `docs/check.md`                                                           | 88-component task table (C01–C90), P0–P3 priority, 13-round order, benchmark findings; methodology sourced from `audit.md` |

## BUILD & CI

```bash
pnpm dev:playground    # Playground (Vite)
pnpm dev:docs         # Docs site (Vite + vite-ssg)
pnpm build            # headless → ui → sbean via Vite Plus pack
pnpm build:libs       # shadcn-theme → unocss-shadcn
pnpm build:docs       # package build → sbean registry → docs SSG
pnpm build:playground # Playground production build
pnpm lint             # vp lint --fix && pnpm lint:vue (uses @soybeanjs/eslint-config-vue)
pnpm fmt              # vp fmt (formatter)
pnpm test             # recursive workspace unit tests (UI/headless + sbean)
pnpm test:e2e         # browser e2e (Vitest Browser Mode + playwright chromium; run `pnpm exec playwright install chromium` first)
pnpm typecheck        # vue-tsc --noEmit --skipLibCheck (runs across all workspaces)
pnpm release          # Generate changelog + sync templates + publish (soy release)
pnpm stub             # switch headless development exports to src (`--reset` restores dist exports)
pnpm sui headless     # Regenerate packages/headless/src/constants/components.ts + packages/headless/src/namespaced/index.ts from packages/headless/src/index.ts
pnpm sui ui           # Regenerate packages/ui/src/constants/components.ts from packages/ui/src/index.ts
pnpm sui api          # Regenerate apps/docs/src/generated/api/*.json and apps/docs/src/generated/api-locales/*.json base data
pnpm sui api-locales     # Regenerate API i18n locale template data without re-running type extraction
pnpm sui api-translate -- --locale <locale>  # Translate generated English API descriptions into a non-English locale
pnpm sui changelog    # Regenerate apps/docs/src/generated/changelog/*.json and apps/docs/src/generated/changelog-locales/*.json base data
pnpm sui changelog-translate -- --locale <locale>  # Translate generated English changelog summaries into a non-English locale
```

- **Pre-commit hook** (Vite Plus, `.vite-hooks/pre-commit`): `vp staged`
- **CI**: `ci.yml` runs typecheck / lint / test + browser e2e on PRs and pushes to `main`/`master`; it does not currently build packages/docs or check generated drift. `release.yml` handles tag-triggered build and release.
- **Formatter**: `vp fmt`

## PACKAGE EXPORTS

**@soybeanjs/headless** sub-path exports:

- `.` → all components + types
- `./composables` → 27 composables (useContext, useControllableState, useUiContext, …)
- `./shared` → pure TS utilities
- `./constants` → ARIA constants, component keys
- `./date` → shared date utilities and calendar helpers
- `./locale` and `./locale/*` → locale registry and language bundles
- `./nuxt` → Nuxt auto-registration module
- `./resolver` → unplugin-vue-components resolver
- `./namespaced` → named-export namespace (e.g. `Headless.AccordionRoot`)
- `./types` → shared type surface for component, DOM, and utility types
- `./*` → `./components/*/index.ts` (per-component sub-path: `@soybeanjs/headless/accordion`)

**@soybeanjs/ui** sub-path exports:

- `.` → all S-prefixed components + theme utilities
- `./nuxt` → Nuxt auto-registration module
- `./resolver` → unplugin-vue-components resolver
- `./styles.css` → built UnoCSS stylesheet

## DEPENDENCY RULES

- `packages/ui` → imports public `@soybeanjs/headless` entry points
- `packages/headless` → MUST NOT import from `@soybeanjs/ui` (would create a circular dependency)
- `packages/unocss-shadcn` → imports `@soybeanjs/shadcn-theme`; token ownership stays in the theme package
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
