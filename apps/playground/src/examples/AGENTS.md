# PLAYGROUND EXAMPLES

This scoped AGENTS file is a routing bridge for assistants editing `apps/playground/src/examples/**`.

Before editing files here, read and obey these `.github` sources:

1. `.github/assistant-rules.md`
2. `.github/copilot-instructions.md`
3. `.github/instructions/typescript-functional-style.instructions.md`
4. `.github/instructions/vue-sfc.instructions.md`
5. `.github/instructions/soybean-ui-component-overview.instructions.md` when the playground change is part of component work
6. `.github/instructions/soybean-ui-playground.instructions.md`

If the task is part of component delivery, also apply the relevant checklist file at the end.

Use this file only as routing and local path context. Normative rules stay in `.github/`.

## LOCAL CONTEXT

- `apps/playground/src/examples/{component}/index.vue` now acts as a thin entry and should normally render only `<PlaygroundGallery component="{component}" />`
- Child demo filenames now use `NN-name.vue`; the gallery extracts `order` from the prefix, but resolves titles from the de-prefixed `name` via `playground.examples.{component}.{name}` locale keys
- If the de-prefixed `name` starts with `_`, the discovery layer ignores that demo file completely
- Child demo files should not render local `h3.playground-title` headings
- Remove meaningless outer `<div>` wrappers; keep a container only when layout, width, scroll, or multi-node grouping actually requires it
