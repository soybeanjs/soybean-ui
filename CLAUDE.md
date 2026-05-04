# AI Assistant Bridge — soybean-ui

`.github/` is the single source of truth. If this file conflicts with `.github/`, `.github/` wins.

Read the root `AGENTS.md` first for the repository map and scoped bridge locations, then follow `.github/assistant-rules.md` and `.github/copilot-instructions.md`.

## Universal rules (read for every edit)

- `.github/instructions/import-order.instructions.md`
- `.github/instructions/typescript-functional-style.instructions.md`
- `.github/instructions/vue-sfc.instructions.md` (for .vue files)

## Component work (editing `headless/` or `src/components/`)

- `.github/instructions/soybean-ui-component-overview.instructions.md`
- `.github/instructions/soybean-ui-headless.instructions.md` (for `headless/src/components/`)
- `.github/instructions/soybean-ui-ui-layer.instructions.md` (for `src/components/`)
- `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`

## Delivery surfaces

- `.github/instructions/soybean-ui-playground.instructions.md` (for `playground/`)
- `.github/instructions/soybean-ui-docs.instructions.md` (for `docs/`)
- `.github/instructions/soybean-ui-testing.instructions.md` (for `test/`)

If a component task changes public exports, docs rendering, playground delivery, or API descriptions, also apply `.github/instructions/soybean-ui-checklist.instructions.md` at the finish.

## Commit / changelog

- `.github/instructions/git-commit-convention.instructions.md`

## Architecture constraints — never violate

- Data flow: `headless/` → `src/` only. Never import `@soybeanjs/ui` from `headless/`
- No CSS classes or `<style>` blocks in headless SFCs
- No ARIA / `role` / `tabindex` / keyboard handlers in `src/` (UI layer)
- Never use `any`, `@ts-ignore`, `@ts-expect-error`
- Context values must be `ComputedRef` or `ShallowRef` — never plain reactive primitives
- `variants.ts` must start with `// @unocss-include`
- Never export `use{Name}Ui` from headless barrel; only export `provide{Name}Ui`

## Generated surfaces

- Public export changes must be synced through the official scripts, not hand-edited generated files.
- Use `pnpm gen:headless` for `headless/src/constants/components.ts` and `headless/src/namespaced/index.ts`.
- Use `pnpm gen:ui` for `src/constants/components.ts`.
- Use `pnpm gen:api` and, when needed, `pnpm gen:api:i18n` for `docs/src/generated/api/` and `docs/src/generated/api-locales/`, then `pnpm translate:api:i18n -- --locale <locale>` for non-English API descriptions.
- Use `pnpm gen:changelog` for `docs/src/generated/changelog/` and `docs/src/generated/changelog-locales/`, then `pnpm translate:changelog:i18n -- --locale <locale>` for non-English changelog summaries.
