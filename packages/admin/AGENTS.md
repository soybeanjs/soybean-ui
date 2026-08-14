# @soybeanjs/admin

This scoped AGENTS file is a routing bridge for assistants editing `packages/admin/**`.

Before editing files here:

1. Load the project skill at `.agents/skills/soybean-ui-component-development/` — start with `SKILL.md`, then `layers.md` (UI Layer section) and `surfaces.md`.
2. For `**/*.{ts,tsx,js,jsx}` edits, also load the global `typescript-functional-style` skill.
3. For `**/*.vue` edits, also load the global `typescript-functional-style` and `vue-sfc-structure` skills.
4. If the task is part of component delivery, apply `process.md` (finish checklist) at the end.

Use this file only as routing and local path context. Normative component rules live in the skill.

## LOCAL CONTEXT

- Package: `@soybeanjs/admin` (peripheral package, single-package — domain logic + styles coexist in `src/`)
- Component prefix: `S` + `App*`
- Depends on: `@soybeanjs/headless`, `@soybeanjs/ui`, `@soybeanjs/theme`
- peerDeps: vue, vue-router, unplugin-vue-components, nuxt (optional)`+ admin 追加 @soybeanjs/chart (optional)`
- See `docs/ecosystem.md` §2.2 for layering, §4 for prefix rules, §5 for dependency whitelist.
