# COMPONENT TESTS

This scoped AGENTS file is a routing bridge for assistants editing `test/specs/components/**`.

Before editing files here, read and obey these `.github` sources:

1. `.github/assistant-rules.md`
2. `.github/copilot-instructions.md`
3. `.github/instructions/import-order.instructions.md`
4. `.github/instructions/typescript-functional-style.instructions.md`
5. `.github/instructions/soybean-ui-component-overview.instructions.md` when the tests change is part of component work
6. `.github/instructions/soybean-ui-testing.instructions.md`
7. `.github/instructions/soybean-ui-accessibility-rtl.instructions.md` when the assertions involve a11y or RTL semantics

If the task is part of component delivery, also apply the relevant checklist file at the end.

Use this file only as routing and local path context. Normative rules stay in `.github/`.

## LOCAL CONTEXT

- Component tests should track the current delivery model: implementation changes often require synchronized updates across docs, playground examples, generated API data, and tests
- When a public API or behavior changes, verify that the corresponding docs page now uses `UsageCode`, `PlaygroundGallery`, and `ComponentApi`, and that generated API data has been refreshed via `pnpm gen:api` when needed
- For demo-driven assertions, remember that `playground/examples/{component}/index.vue` is now a thin `PlaygroundGallery` entry point and child demos no longer carry local title headings by default
