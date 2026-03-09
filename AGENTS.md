# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-09
**Monorepo:** pnpm workspaces (`headless/`, `docs/`; root = `@soybeanjs/ui`)
**Stack:** Vue 3 + TypeScript (strict) + UnoCSS + tailwind-variants ^3.2.2

## ARCHITECTURE

Headless/Styled separation. Two packages ship independently:

- **@soybeanjs/headless** (`headless/`): Logic, state, a11y. Zero styles. 50 primitives, 26 composables.
- **@soybeanjs/ui** (`src/`): Styled wrappers. UnoCSS + `tv()`. 48 components, `S`-prefixed.
- **@soybeanjs/ui-docs** (`docs/`): Vite + vite-ssg + unplugin-vue-markdown. NOT VitePress.

Data flow: `headless` → `src` (never reverse). UI injects styles via `provideXUi(ui)` → headless reads via `useUiContext`.

## WHERE TO LOOK

| Task                   | Location                            | Key Pattern                                                         |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| New component (logic)  | `headless/src/components/[name]/`   | types.ts → context.ts → \*.vue → index.ts                           |
| New component (styled) | `src/components/[name]/`            | Import headless → `useOmitProps` → `cn(variants(...), props.class)` |
| Variant definitions    | `src/components/[name]/variants.ts` | `tv()` with `// @unocss-include` at top                             |
| Shared hooks           | `headless/src/composables/`         | `use-*.ts`, pure Vue composables                                    |
| Theme/sizing           | `src/theme/`                        | `cn()`, `provideSizeContext`, `ThemeColor`, `ThemeSize`             |
| Utility functions      | `headless/src/shared/`              | Pure TS helpers (DOM, focus, tree, form)                            |
| Docs content           | `docs/src/docs/[en                  | zh-CN]/`                                                            | Markdown with ````playground` blocks |
| Demo source            | `playground/examples/[component]/`  | Vue SFCs referenced by docs                                         |

## BUILD & CI

```bash
pnpm dev              # Playground (Vite)
pnpm build            # headless (tsdown) → ui (tsdown) → css (unocss build)
pnpm lint             # oxlint --fix && eslint --fix (uses @soybeanjs/eslint-config-vue)
pnpm test             # vitest run (happy-dom, @vue/test-utils)
pnpm typecheck        # vue-tsc --noEmit
pnpm release          # Publish packages
```

- **Pre-commit hook** (simple-git-hooks): `pnpm typecheck && pnpm lint-staged`
- **CI**: Tag-triggered release only (`release.yml`). No PR check workflow.
- **Formatter**: `oxfmt`

## DEPENDENCY RULES

- `headless` → MUST NOT import from `@soybeanjs/ui` (circular dep)
- `src` → imports `@soybeanjs/headless` (via package.json alias, dev points to source)
- Components re-exported from barrel files: `headless/src/index.ts`, `src/index.ts`

## ANTI-PATTERNS

- **DO NOT** add styles/classes to `headless` components (not even `hidden`)
- **DO NOT** put ARIA/state logic in `src` (UI) layer
- **DO NOT** use raw CSS/SCSS — UnoCSS utility classes only
- **DO NOT** use `as any` / `@ts-ignore` / `@ts-expect-error`
- **DO NOT** modify `typed-router.d.ts` (auto-generated)

## COMPONENT DEVELOPMENT

**Skill**: `skill(name="soybean-ui-component-development")` — loads full workflow guide with templates.

Minimal flow: headless types → headless context → headless SFCs → UI variants → UI wrapper → barrel exports → docs.
