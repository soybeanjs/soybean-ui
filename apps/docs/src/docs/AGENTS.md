# COMPONENT DOCS MARKDOWN

This scoped AGENTS file is a routing bridge for assistants editing `apps/docs/src/docs/**`.

Before editing files here:

1. Load the project skill at `.agents/skills/soybean-ui-component-development/` — start with `SKILL.md`, then `surfaces.md` (Docs section). If the docs change is part of component work, also load `layers.md` for the relevant implementation layer.
2. If the task is part of component delivery, apply `process.md` (finish checklist) at the end.

Use this file only as routing and local path context. Normative component rules live in the skill.

## LOCAL CONTEXT

- Component docs now default to `## Usage` + `<UsageCode component="..." />`, `## Demos` + `<PlaygroundGallery component="..." />`, and `## API` + `<ComponentApi component="..." />`
- Even when playground example files use `NN-name.vue`, docs still reference the de-prefixed example key such as `basic` or `size`
- `ComponentApi` reads generated data from `apps/docs/src/generated/api/` and `apps/docs/src/generated/api-locales/`
- Public API or type description changes require `pnpm sui api`; if only locale template data needs refresh, use `pnpm sui api-locales`; non-English API descriptions are then filled via `pnpm sui api-translate -- --locale <locale>`
- Component detail pages also inject a generated changelog section when version data exists; do not handwrite per-version release history in markdown
- Generated changelog data lives in `apps/docs/src/generated/changelog/` and `apps/docs/src/generated/changelog-locales/`; changelog mapping, release presentation, or locale template changes require `pnpm sui changelog` and, for non-English locales, `pnpm sui changelog-translate -- --locale <locale>`
