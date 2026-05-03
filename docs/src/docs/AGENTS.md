# COMPONENT DOCS MARKDOWN

This scoped AGENTS file is a routing bridge for assistants editing `docs/src/docs/**`.

Before editing files here, read and obey these `.github` sources:

1. `.github/assistant-rules.md`
2. `.github/copilot-instructions.md`
3. `.github/instructions/soybean-ui-component-overview.instructions.md` when the docs change is part of component work
4. `.github/instructions/soybean-ui-docs.instructions.md`

If the task is part of component delivery, also apply the relevant checklist file at the end.

Use this file only as routing and local path context. Normative rules stay in `.github/`.

## LOCAL CONTEXT

- Component docs now default to `## Usage` + `<UsageCode component="..." />`, `## Demos` + `<PlaygroundGallery component="..." />`, and `## API` + `<ComponentApi component="..." />`
- `ComponentApi` reads generated data from `docs/src/generated/api/` and `docs/src/generated/api-locales/`
- Public API or type description changes require `pnpm gen:api`; if only locale template data needs refresh, use `pnpm gen:api:i18n`; non-English API descriptions are then filled via `pnpm translate:api:i18n -- --locale <locale>`
