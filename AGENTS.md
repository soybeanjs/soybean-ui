# PROJECT KNOWLEDGE BASE

## AI ASSISTANT ENTRYPOINT

Component development rules live in the self-contained skill at `.agents/skills/vean-develop/`:

- [SKILL.md](.agents/skills/vean-develop/SKILL.md) — pattern classification, phase order, workflows, guardrails, delivery surfaces, generation workflow.
- [layers.md](.agents/skills/vean-develop/layers.md) — aria admission, aria/UI layer rules, a11y/RTL.
- [surfaces.md](.agents/skills/vean-develop/surfaces.md) — playground, docs, testing delivery surface rules.
- [e2e.md](.agents/skills/vean-develop/e2e.md) — browser e2e testing (Tier 1 component-level + Tier 2 app-level smoke), env setup, core scenarios, assertion standards.
- [process.md](.agents/skills/vean-develop/process.md) — finish checklist, git commit convention.
- [audit.md](.agents/skills/vean-develop/audit.md) — assessment methodology, seven check dimensions (D1–D7, 106 items), severity, acceptance, regression flows for already-shipped components.
- [EXAMPLES.md](.agents/skills/vean-develop/EXAMPLES.md) — request shapes that trigger the skill.

**Global skill rules (mandatory for all agents, applied before any task):**

- When editing `**/*.{ts,tsx,js,jsx}` files, first `read_skill typescript-functional-style` and follow it.
- When editing `**/*.vue` files, first `read_skill typescript-functional-style` and `read_skill vue-sfc-structure`, and follow both.

Both skills are installed globally in the skills store and can be loaded from any project. They are the single source of truth for TypeScript functional style and Vue SFC structure; the component development skill does not restate their content.

Load the component development skill for any task that creates, migrates, extends, standardizes, fixes, or audits a Vean component. For auditing or re-evaluating already-shipped components, load [audit.md](.agents/skills/vean-develop/audit.md) for the assessment methodology.

If a nearer scoped `AGENTS.md` exists for your target path, use it only to narrow which skill sections apply.

**Generated:** 2026-09-06
**Version:** 0.31.0
**Monorepo:** pnpm workspaces (private root + 9 child workspaces: 6 packages + 2 apps + `skills/`; 5 publishable packages, 1 private package — `@vean/scripts` — and 2 private apps)
**Stack:** Vue 3 + TypeScript (strict) + UnoCSS + @soybeanjs/cva

## ARCHITECTURE

The canonical workspace map, labeled dependency graph, build/test flows, and
sources of truth live in [docs/architecture.md](docs/architecture.md).
Prioritized structural findings and acceptance criteria live in
[docs/optimize.md](docs/optimize.md).

Core Aria/Styled separation:

- **@vean/aria** (`packages/aria/`): Logic, state, a11y. Zero styles. 96 component directories (94 publicly exported; `_common`/`_icon` are internal), 29 composables. Includes base primitives, date utilities, and Compact aggregations.
- **@vean/ui** (`packages/ui/`): Styled wrappers. UnoCSS + `cv()` / `scv()`. 96 component directories / 144 S-prefixed exports.

Compile-time dependency direction is **UI → Aria**: UI imports public
aria entry points; aria MUST NOT import UI. Runtime class injection goes
from the styled wrapper to its nested aria parts via `provideXUi(ui)` and
`useUiContext`.

Other publishable modules:

- **@vean/theme** (`packages/theme/`): theme engine — core tokens, deterministic derivation, light/dark levels, SSR/storage helpers.
- **@vean/unocss** (`packages/unocss/`): UnoCSS preset over `@vean/theme`.
- **@vean/cli** (`packages/cli/`, bin `vean`): source-distribution CLI, registry, schemas, templates, and MCP.
- **@vean/skills** (`skills/`): generated consumer-facing agent skills.

> There is **no** `@soybeanjs/admin` or `@soybeanjs/chart` package, and no standalone AI package: AI/chat components ship inside aria + ui under the standard `S` prefix — the component plan lives in [docs/ui-ai-roadmap.md](docs/ui-ai-roadmap.md). The former admin direction returns as an in-core **shell domain** (aria `src/shell/` + ui composites such as `SLayoutShell`/`SPageHeader`), planned in [docs/ui-shell-roadmap.md](docs/ui-shell-roadmap.md). Charts are not part of the core library: the docs site shows shadcn-styled demos built directly on [TanStack Charts](https://tanstack.com/charts) (see `apps/docs/src/examples/chart/` + the docs-local `apps/docs/src/components/chart/` theming shell).

Private packages and applications:

- **@vean/scripts** (`packages/scripts/`): private repo-service CLI `sui` (generators, stub, template sync). NOT published; do not merge with the consumer-facing `vean` CLI.
- **@vean/docs** (`apps/docs/`): ubean-based documentation site (SSG, Markdown, i18n). Owns the demo examples under `apps/docs/src/examples/`.
- **@vean/nuxt** (`apps/nuxt/`): Nuxt integration fixture.

## WHERE TO LOOK

| Task                     | Location                                                                  | Key Pattern                                                                          |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| New component (logic)    | `packages/aria/src/components/[name]/`                                    | types.ts → context.ts → base \*.vue → optional compact/hook files → index.ts         |
| New component (styled)   | `packages/ui/src/components/[name]/` + `packages/ui/src/styles/[name].ts` | style recipe → types.ts → `*.vue` → index.ts                                         |
| Variant definitions      | `packages/ui/src/styles/[name].ts`                                        | `cv()` / `scv()` with `// @unocss-include` at top                                    |
| Shared hooks             | `packages/aria/src/composables/`                                          | `use-*.ts`, pure Vue composables (29 total)                                          |
| Theme/sizing             | `packages/ui/src/theme/`                                                  | `ThemeColor` (8), `ThemeSize` (xs…2xl)                                               |
| Theme CSS generation     | `packages/theme/`                                                         | `createTheme(options)` (returns CSS string)                                          |
| UnoCSS adapter           | `packages/unocss/`                                                        | `presetUiUnocss()` / `presetVean()`                                                  |
| Source-distribution CLI  | `packages/cli/`                                                           | commands → registry/schema/templates/MCP                                             |
| Repo-service CLI (`sui`) | `packages/scripts/`                                                       | `gen` (offline) / `translate` (DeepL) / `check` groups, `stub`, `reorder-imports`    |
| Utility functions        | `packages/aria/src/shared/`                                               | Pure TS helpers (DOM, focus, tree, form, guard, comparison)                          |
| Global types             | `packages/aria/src/types/`                                                | `ClassValue`, `UiClass<S>`, `PropsToContext<T,K>`, `PrimitiveProps`                  |
| Generated API data       | `apps/docs/src/generated/api/`                                            | `pnpm sui gen api` baseline + `pnpm sui translate api --locale <locale>` locale text |
| Generated changelog data | `apps/docs/src/generated/changelog/`                                      | `pnpm sui gen changelog` baseline + `pnpm sui translate changelog` locale summaries  |
| Docs content             | `apps/docs/src/docs/[en\|zh-CN]/`                                         | Markdown rendering `<UsageCode>`, `<PlaygroundGallery>`, `<ComponentApi>`            |
| Demo source              | `apps/docs/src/examples/[component]/`                                     | Vue SFCs referenced by docs                                                          |
| Browser e2e tests        | `packages/ui/test/browser/`                                               | `vitest.browser.config.ts` + `vitest-browser-vue` + `axe-core` (color-contrast on)   |
| Workspace architecture   | `docs/architecture.md`                                                    | Package/app map, dependency graph, generation/build/test/release flows               |
| Architecture assessment  | `docs/optimize.md`                                                        | Evidence-ranked maintainability, scalability, and quality recommendations            |
| Component dev skill      | `.agents/skills/vean-develop/`                                            | SKILL.md + layers.md (admission) + surfaces.md + e2e.md + process.md + audit.md      |
| Aria admission gaps      | `docs/aria-admission-remediation.md`                                      | Anatomy shells, decorative slots, and parallel families to freeze or fix             |

## BUILD & CI

```bash
pnpm dev:docs         # Docs site (ubean dev)
pnpm build            # libs (theme, unocss) → aria → ui → @vean/cli via Vite Plus pack
pnpm build:libs       # theme → unocss
pnpm build:docs       # package build → vean registry → docs SSG + SEO
pnpm lint             # vp lint --fix && pnpm lint:vue (uses @soybeanjs/eslint-config-vue)
pnpm fmt              # vp fmt (formatter)
pnpm test             # recursive workspace unit tests (UI/aria + @vean/cli)
pnpm test:e2e         # browser e2e (Vitest Browser Mode + playwright chromium; run `pnpm exec playwright install chromium` first)
pnpm typecheck        # pnpm -r typecheck (per-workspace vue-tsc / tsc)
pnpm release          # Generate changelog + sync templates + publish (soy release)
pnpm stub             # switch aria development exports to src (`--reset` restores dist exports)
pnpm sui gen catalog           # Regenerate component catalogs: aria constants/namespaced + ui constants
pnpm sui gen catalog ui        # Regenerate only packages/ui/src/constants/components.ts
pnpm sui gen api               # Regenerate apps/docs/src/generated/api/*.json and apps/docs/src/generated/api-locales/*.json
pnpm sui gen api --force       # Regenerate even when the source fingerprint still matches the committed data
pnpm sui gen changelog         # Regenerate apps/docs/src/generated/changelog/*.json and changelog-locales/*.json
pnpm sui gen schema            # Generate vean JSON Schemas (vean.json, registry-item.json, registry.json)
pnpm sui gen skills            # Generate skill docs and distribution files (skills/skills from skills/skills-source)
pnpm sui gen all               # Regenerate every surface above
pnpm sui translate <api|changelog|locale|all> [--locale <locale>]  # Fill pending translations via DeepL (needs DEEPL_API_KEY)
pnpm sui check generated       # Regenerate every surface and diff it against git (also a CI gate)
pnpm sui check deps            # Enforce the dependency gate: banned import scan + runtime dependency whitelists
pnpm sui reorder-imports [--check] [targets...]  # Reorder Props before Emits in .vue import type blocks
pnpm sui sync-template-versions  # Sync the @soybeanjs/* version constant used by project templates
```

- **Pre-commit hook** (Vite Plus, `.vite-hooks/pre-commit`): `vp staged`
- **CI**: `ci.yml` runs `pnpm build` (all packages) then typecheck / lint / test, plus a separate `e2e` job for browser tests, on PRs and pushes to `main`/`master`; it does not currently build the docs site or check generated-output drift. `release.yml` handles tag-triggered build and release.
- **Formatter**: `vp fmt`

## PACKAGE EXPORTS

**@vean/aria** sub-path exports:

- `.` → all components + types
- `./composables` → 29 composables (useContext, useControllableState, useCollapseHeight, useUiContext, …)
- `./shared` → pure TS utilities
- `./constants` → ARIA constants, component keys
- `./date` → shared date utilities and calendar helpers
- `./locale` and `./locale/*` → locale registry and language bundles
- `./nuxt` → Nuxt auto-registration module
- `./resolver` → unplugin-vue-components resolver
- `./namespaced` → named-export namespace (e.g. `Aria.AccordionRoot`)
- `./types` → shared type surface for component, DOM, and utility types
- `./*` → `./components/*/index.ts` (per-component sub-path: `@vean/aria/accordion`)

**@vean/ui** sub-path exports:

- `.` → all S-prefixed components + theme utilities
- `./nuxt` → Nuxt auto-registration module
- `./resolver` → unplugin-vue-components resolver
- `./styles.css` → built UnoCSS stylesheet

## DEPENDENCY RULES

- `packages/ui` → imports public `@vean/aria` entry points
- `packages/aria` → MUST NOT import from `@vean/ui` (would create a circular dependency)
- `packages/unocss` → imports `@vean/theme`; token ownership stays in the theme package
- Components re-exported from barrel files: `packages/aria/src/index.ts`, `packages/ui/src/index.ts`

## KEY PATTERNS (verified from source)

- **UiClass**: Use `UiClass<UiSlot>` (from `packages/aria/src/types`), not `Record<UiSlot, ClassValue>`
- **Props**: Always `extends /** @vue-ignore */ HTMLAttributes` to suppress IDE noise
- **Context values**: Must be reactive — use `toContext(props, keys)` (from aria `shared/vue`) to wrap in `ComputedRef`; `fromContext(context, keys)` snapshots back to plain values
- **ui() two forms**: `use{Name}Ui('root')` → `ComputedRef<ClassValue>` (single slot); `use{Name}Ui()` → full map
- **Recipe merges**: For multi-slot wrappers, pass `props.ui` and `{ root: props.class }` directly into the `scv()` recipe call
- **Multi-slot**: `provide{Name}Ui(ui)` pattern; only export `provide`, not `use`
- **Compact aggregations**: For stable, data-driven composites, aria owns iteration, default content, and internal composition; UI wrappers stay thin and only handle variants, class injection, and prop/slot forwarding. Current examples span accordion, card, date-field, dialog, editable, hover-card, layout, navigation-menu, pagination, popover, stepper, and table flows.
- **Single-class**: No UiContext; use `{name}Variants({...}, props.class)` directly
- **index.ts re-exports**: UI component barrels re-export aria types from sub-path `@vean/aria/{component}`; `types.ts` should follow the established import style of neighboring components instead of mixing arbitrary paths
- **Generated metadata**: after public export, API, or changelog mapping/docs-surface changes, rerun `pnpm sui gen all` (or the specific `gen` target) as needed; for non-English generated text also run `pnpm sui translate <api|changelog>`, and `pnpm sui check generated` proves the committed data matches the sources.
- **CLI declaration**: `packages/scripts/src/cli.ts` declares every `sui` command with [cac](https://github.com/cacjs/cac) and passes parsed options into each action, so no command re-parses `process.argv` and `--help` / `--version` / unknown-option / missing-argument handling lives in one place. Add a command there and pin its surface in `packages/scripts/test/cli.spec.ts`; `index.ts` only parses and awaits.
- **Offline generation**: `gen` is deterministic and never touches the network; `translate` is the only networked group (DeepL) and the only one that needs `DEEPL_API_KEY`.
- **Stable `generatedAt`**: generators compare the produced payload against the committed file and skip the write when only `generatedAt` would differ, so a no-op regeneration produces no diff and the field keeps meaning "when the data last changed". Never hand-edit generated timestamps.
- **Fingerprint-guarded extraction**: `gen api` hashes its inputs (ui/aria/theme/scripts sources, tsconfigs, lockfile) plus the on-disk output, and skips the TypeDoc pass (~40s → ~0.15s) only when both match the recorded entry. The entry lives in `node_modules/.cache/sui/` and is never committed; `--force` bypasses the check.

## ANTI-PATTERNS

- **DO NOT** add styles/classes to `packages/aria` components (not even `hidden`, `sr-only`)
- **DO NOT** put ARIA/state logic in `packages/ui` (UI) layer
- **DO NOT** use raw CSS/SCSS — UnoCSS utility classes only
- **DO NOT** use `as any` / `@ts-ignore` / `@ts-expect-error`
- **DO NOT** store non-reactive values in context (breaks reactivity)
- **DO NOT** modify `typed-router.d.ts` (auto-generated)
- **DO NOT** export `use{Name}Ui` from aria index (internal only; export only `provide{Name}Ui`)
- **DO NOT** omit `class` from `useOmitProps` list (causes double-binding)

## COMPONENT DEVELOPMENT

组件开发规范入口：`.agents/skills/vean-develop/SKILL.md`。

Minimal flow: aria types → aria context → aria base SFCs → optional Compact SFCs/hooks → UI style recipe in `packages/ui/src/styles` → UI wrapper → barrel exports.

Three component patterns:

- **Multi-slot base components** (badge, accordion, dialog…): has `UiSlot` + `UiClass`, uses `scv()` results merged directly in the wrapper
- **Compact aggregations** (`AccordionCompact`, `TableCompact`): live in aria, compose base primitives, and expose `*CompactProps` / `*CompactEmits` / `*CompactSlots`
- **Single-class** (button, link…): no UiContext, uses `{name}Variants({...}, props.class)` directly
