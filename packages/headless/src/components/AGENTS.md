# HEADLESS COMPONENTS

This scoped AGENTS file is a routing bridge for assistants editing `packages/headless/src/components/**`.

Before editing files here:

1. Load the project skill at `.agents/skills/soybean-ui-component-development/` — start with `SKILL.md`, then `layers.md` (Headless section) and `surfaces.md` (Playground, Docs, Testing sections when the change touches delivery surfaces).
2. For `**/*.{ts,tsx,js,jsx}` edits, also load the global `typescript-functional-style` skill.
3. For `**/*.vue` edits, also load the global `typescript-functional-style` and `vue-sfc-structure` skills.
4. If the task affects public delivery surfaces, also apply `process.md` (finish checklist) at the end.

Use this file only as routing and local path context. Normative component rules live in the skill.

## LOCAL CONTEXT

- Public component export changes must be reflected in `packages/headless/src/index.ts`, then synced via `pnpm sui headless` to update `packages/headless/src/constants/components.ts` and `packages/headless/src/namespaced/index.ts`
- Headless component barrels are the source for per-component sub-path exports such as `@soybeanjs/headless/dialog`; keep this surface aligned when adding or renaming components
- Stable, data-driven composite structure should prefer headless `*Compact` implementations instead of pushing iteration and default content up into the UI layer
- If a headless change affects public docs, demos, or tests, also sync `apps/docs/src/generated/api/`, `apps/docs/src/generated/api-locales/`, and the related delivery surfaces rather than stopping at implementation files
