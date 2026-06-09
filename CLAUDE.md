# AI Assistant Bridge — soybean-ui

`.github/` is the single source of truth. If this file conflicts with `.github/`, `.github/` wins.

Read the root `AGENTS.md` first for the repository map and scoped bridge locations, then follow `.github/assistant-rules.md` and `.github/copilot-instructions.md`.

## Universal rules (read for every edit)

- `.github/instructions/typescript-functional-style.instructions.md`
- `.github/instructions/vue-sfc.instructions.md` (for .vue files)

## Component work (editing `packages/headless/` or `packages/ui/src/components/`)

- `.github/instructions/soybean-ui-component-overview.instructions.md`
- `.github/instructions/soybean-ui-headless.instructions.md` (for `packages/headless/src/components/`)
- `.github/instructions/soybean-ui-ui-layer.instructions.md` (for `packages/ui/src/components/`)
- `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`

## Delivery surfaces

- `.github/instructions/soybean-ui-playground.instructions.md` (for `apps/playground/`)
- `.github/instructions/soybean-ui-docs.instructions.md` (for `apps/docs/`)
- `.github/instructions/soybean-ui-testing.instructions.md` (for `packages/ui/test/`)

If a component task changes public exports, docs rendering, playground delivery, or API descriptions, also apply `.github/instructions/soybean-ui-checklist.instructions.md` at the finish.

## Commit / changelog

- `.github/instructions/git-commit-convention.instructions.md`

## Architecture constraints — never violate

- Data flow: `packages/headless/` → `packages/ui/` only. Never import `@soybeanjs/ui` from `packages/headless/`
- No CSS classes or `<style>` blocks in headless SFCs
- No ARIA / `role` / `tabindex` / keyboard handlers in `packages/ui/` (UI layer)
- Never use `any`, `@ts-ignore`, `@ts-expect-error`
- Context values must be `ComputedRef` or `ShallowRef` — never plain reactive primitives
- `variants.ts` must start with `// @unocss-include`
- Never export `use{Name}Ui` from headless barrel; only export `provide{Name}Ui`

## Generated surfaces

- Public export changes must be synced through the official scripts, not hand-edited generated files.
- Use `pnpm sui headless` for `packages/headless/src/constants/components.ts` and `packages/headless/src/namespaced/index.ts`.
- Use `pnpm sui ui` for `packages/ui/src/constants/components.ts`.
- Use `pnpm sui api` and, when needed, `pnpm sui api-locales` for `apps/docs/src/generated/api/` and `apps/docs/src/generated/api-locales/`, then `pnpm sui api-translate -- --locale <locale>` for non-English API descriptions.
- Use `pnpm sui changelog` for `apps/docs/src/generated/changelog/` and `apps/docs/src/generated/changelog-locales/`, then `pnpm sui changelog-translate -- --locale <locale>` for non-English changelog summaries.
