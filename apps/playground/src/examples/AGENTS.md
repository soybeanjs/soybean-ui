# PLAYGROUND EXAMPLES

This scoped AGENTS file is a routing bridge for assistants editing `apps/playground/src/examples/**`.

Before editing files here:

1. Load the project skill at `.agents/skills/soybean-ui-component-development/` — start with `SKILL.md`, then `surfaces.md` (Playground section). If the playground change is part of component work, also load `layers.md` for the relevant implementation layer.
2. For `**/*.vue` edits, also load the global `typescript-functional-style` and `vue-sfc-structure` skills.
3. If the task is part of component delivery, apply `process.md` (finish checklist) at the end.

Use this file only as routing and local path context. Normative component rules live in the skill.

## LOCAL CONTEXT

- `apps/playground/src/examples/ui/{component}/index.vue` now acts as a thin entry and should normally render only `<PlaygroundGallery component="{component}" />`
- Child demo filenames now use `NN-name.vue`; the gallery extracts `order` from the prefix, but resolves titles from the de-prefixed `name` via `playground.examples.{component}.{name}` locale keys
- If the de-prefixed `name` starts with `_`, the discovery layer ignores that demo file completely
- Child demo files should not render local `h3.playground-title` headings
- Remove meaningless outer `<div>` wrappers; keep a container only when layout, width, scroll, or multi-node grouping actually requires it
