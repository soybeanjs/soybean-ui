# UI COMPONENTS

This scoped AGENTS file is a routing bridge for assistants editing `src/components/**`.

Before editing files here, read and obey these `.github` sources:

1. `.github/assistant-rules.md`
2. `.github/copilot-instructions.md`
3. `.github/instructions/import-order.instructions.md`
4. `.github/instructions/typescript-functional-style.instructions.md`
5. `.github/instructions/vue-sfc.instructions.md` for `.vue` files
6. `.github/instructions/soybean-ui-component-overview.instructions.md`
7. `.github/instructions/soybean-ui-ui-layer.instructions.md`
8. `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`

If the task affects public delivery surfaces, also apply the relevant docs, playground, testing, and checklist files under `.github/instructions/`.

Use this file only as routing and local path context. Normative rules stay in `.github/`.

## LOCAL CONTEXT

- UI component barrels should re-export wrapper-facing types with `export type` from `@soybeanjs/headless/{component}` sub-paths, matching the newer export constraint used across the repo
- In UI-layer `types.ts`, component-specific headless types should come from `@soybeanjs/headless/{component}`, while headless global types such as `ClassValue` should come from `@soybeanjs/headless/types`
- Public UI export changes must be reflected in `src/index.ts`, then synced via `pnpm gen:ui` to update `src/constants/components.ts`
- Multi-slot wrappers should continue to inject class tokens through `provide{Name}Ui(ui)` and leave ARIA, keyboard, and state logic in headless
- If wrapper changes affect component delivery, also update the matching playground examples, docs pages, API generated data, and tests instead of treating UI files as the only required surface
