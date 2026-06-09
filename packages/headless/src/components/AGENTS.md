# HEADLESS COMPONENTS

This scoped AGENTS file is a routing bridge for assistants editing `packages/headless/src/components/**`.

Before editing files here, read and obey these `.github` sources:

1. `.github/assistant-rules.md`
2. `.github/copilot-instructions.md`
3. `.github/instructions/typescript-functional-style.instructions.md`
4. `.github/instructions/vue-sfc.instructions.md` for `.vue` files
5. `.github/instructions/soybean-ui-component-overview.instructions.md`
6. `.github/instructions/soybean-ui-headless.instructions.md`
7. `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`

If the task affects public delivery surfaces, also apply the relevant docs, playground, testing, and checklist files under `.github/instructions/`.

Use this file only as routing and local path context. Normative rules stay in `.github/`.

## LOCAL CONTEXT

- Public component export changes must be reflected in `packages/headless/src/index.ts`, then synced via `pnpm sui headless` to update `packages/headless/src/constants/components.ts` and `packages/headless/src/namespaced/index.ts`
- Headless component barrels are the source for per-component sub-path exports such as `@soybeanjs/headless/dialog`; keep this surface aligned when adding or renaming components
- Stable, data-driven composite structure should prefer headless `*Compact` implementations instead of pushing iteration and default content up into the UI layer
- If a headless change affects public docs, demos, or tests, also sync `apps/docs/src/generated/api/`, `apps/docs/src/generated/api-locales/`, and the related delivery surfaces rather than stopping at implementation files
