# SoybeanUI Delivery Surface Rules

Rules for playground examples, documentation, and tests. The companion [SKILL.md](SKILL.md) owns pattern classification, phase order, and guardrails; [layers.md](layers.md) owns implementation layer rules; [process.md](process.md) owns finish and commit rules.

## Playground

Applies to `apps/playground/src/examples/**/*.vue`.

Add playground only after the component body, exports, and major public capabilities are stable.

### Directory structure

Each component's playground lives in `apps/playground/src/examples/{component}/`.

Recommended structure:

- `index.vue`
- `01-basic.vue`
- `02-color.vue`
- `03-size.vue`
- `04-disabled.vue`
- `05-custom-styling.vue`

Not every component needs every example, but each file demonstrates only one capability.

### Writing order

1. Write `index.vue` first.
2. Add `01-basic.vue`.
3. Add `02-color.vue`, `03-size.vue`, `04-disabled.vue`, `05-custom-styling.vue` as public capabilities require.

### index.vue

- Standard pattern: import `../../components/playground-gallery.vue` and render `<PlaygroundGallery component="{component}" />`.
- `component` value uses the directory name itself (e.g. `accordion`, `date-range-picker`).
- Do not manually import and assemble all sub-examples in `index.vue`.

### Sub-examples

- File names use the two-digit prefixed `NN-name.vue` format (e.g. `01-basic.vue`, `02-size.vue`).
- `NN` only indicates display order; the example key is the prefix-stripped `name`.
- If the prefix-stripped `name` starts with an underscore (e.g. `03-_draft.vue` or `_draft.vue`), the file is ignored by the example discovery logic and excluded from Gallery display and docs example lookup.
- One file, one capability. Titles are rendered by `PlaygroundGallery` via the `playground.examples.{component}.{file}` i18n key.
- Do not write local titles like `<h3 class="playground-title">` inside sub-example files.
- Do not wrap a root node in an extra `<div>` for layout alone; render components directly when possible.
- Layout containers, scroll containers, width constraints, or multi-node grouping may use minimal wrapping.
- Controlled state uses `ref` or `shallowRef`.
- Static data uses `const`.

### Routing and discovery

- Playground auto-discovers `examples/**/index.vue`.
- No manual route registration after creating a component directory.
- `PlaygroundGallery` auto-discovers all example files in the same directory except `index.vue`, extracts `order` during glob, and displays in ascending `order`.
- `UsageCode`, i18n title keys, and docs-side example lookup all use the prefix-stripped `name`, not the raw filename.

### Quality requirements

- Examples cover major public capabilities; do not repeat the same scenario.
- If the component exposes `color`, `size`, `disabled`, `ui`, etc., examples should reflect those capabilities.
- The `name` part of sub-example filenames must accurately describe the capability point — it drives i18n title keys and display semantics.
- Playground is a formal delivery surface, not an optional attachment.

## Docs

Applies to `apps/docs/src/docs/**/*.md`.

Add docs after the component API, exports, and playground are basically stable.

### Doc delivery surfaces

- Chinese docs: `apps/docs/src/docs/zh-CN/components/{component}.md`
- English docs: `apps/docs/src/docs/en/components/{component}.md`

Both files must share the same structure; only the language may differ.

### Recommended structure

- Top-level title
- Overview
- `## Usage`
- `<UsageCode component="{component}" />`
- `## Demos`
- `<PlaygroundGallery component="{component}" />`
- `## API`
- `<ComponentApi component="{component}" />`

### Writing order

1. Write the overview and minimal usage.
2. Wire `<UsageCode component="{component}" />` and `<PlaygroundGallery component="{component}" />`.
3. Wire `<ComponentApi component="{component}" />`.
4. Update `apps/docs/src/constants/menus.ts`.
5. If public API changed, run `pnpm sui api`; for non-English locales run `pnpm sui api-translate -- --locale <locale>`.
6. If changelog mapping, release display, or changelog locale templates changed, run `pnpm sui changelog`; for non-English locales run `pnpm sui changelog-translate -- --locale <locale>`.

### Key rules

- Usage and Demos sections write Vue component tags directly; do not use `usage` or `playground` fenced blocks.
- `Usage` section always uses `<UsageCode component="{component}" />`.
- `Demos` section always uses `<PlaygroundGallery component="{component}" />`.
- Only pass `files` to `<PlaygroundGallery>` when you actually need to restrict the displayed subset.
- Even if playground sub-examples use `NN-name.vue` filenames, the example keys passed to `<UsageCode>` and `<PlaygroundGallery>` use the prefix-stripped `name` (e.g. `basic`, `size`).
- `API` section always uses `<ComponentApi component="{component}" />`.
- The `component` value of `<ComponentApi>` defaults to the component directory name. If the doc filename differs from the component export name, pass the real component name (e.g. `input-number`).
- Only hand-write `DataTable` / `TypeTable` as an exception when generated API cannot cover a special page.
- The version log section on the component detail page is provided by generated changelog data; do not hand-write per-version update records in markdown.
- After public API, type descriptions, or export surface changes, run `pnpm sui api`.
- API generation output is authoritative; do not hand-edit `apps/docs/src/generated/api/` or `apps/docs/src/generated/api-locales/`.
- Changelog generation output is authoritative; do not hand-edit `apps/docs/src/generated/changelog/` or `apps/docs/src/generated/changelog-locales/`.

### Menu registration

After writing docs, sync `apps/docs/src/constants/menus.ts`:

- Insert the component's camelCase key into the appropriate group's `items`.
- Insert in alphabetical order.

Common groups:

- `general`
- `groupLayout`
- `navigation`
- `forms`
- `dataDisplay`
- `feedback`
- `overlay`
- `utilities`

### Quality requirements

- Doc content stays in sync with the actual component implementation.
- `<UsageCode>` and `<PlaygroundGallery>` `component` values match the component directory name.
- If playground sub-examples carry order prefixes, the docs still use prefix-stripped example keys — never write raw filenames like `01-basic` into docs.
- `<ComponentApi>` `component` value matches the real API data source.
- Doc demo surfaces match `apps/playground/src/examples/{component}/` real files.
- Titles and API content do not lag behind the implementation.
- New components default to both Chinese and English docs; do not ship single-language only.

## Testing

Applies to `packages/ui/test/specs/components/**/*.ts`.

Test stack: Vitest + `@vue/test-utils` + `axe-core`, running in `happy-dom`.

Add tests after the component body, exports, and major interactions are stable; do not pile test boilerplate while the API is still in flux.

### Basic rules

- All `mount()` calls default to `attachTo: document.body`.
- Each `it()` mounts and unmounts independently; do not share wrappers.
- Each `it()` calls `wrapper.unmount()` before ending.

### Recommended describe structure

- `rendering`
- `{state} state`
- `disabled state`
- `accessibility`

### rendering

- Cover default slot rendering.
- Cover custom class.
- Cover key child element existence.

### state

- `modelValue` or equivalent state must reflect correctly to `aria-*` / `data-state`.
- After interaction, verify the corresponding emit (e.g. `update:modelValue`).

### disabled state

Assert in the way the component actually implements:

- `aria-disabled="true"`
- `element.disabled === true`
- `data-disabled`

Also verify that disabled state does not emit.

### Interaction triggers

- Trigger events based on the component's real implementation; do not write idealized interactions disconnected from the implementation.
- Common cases include `click`, `mousedown`, `mouseenter`, but always check the component's real behavior first.

### accessibility

- Use `getA11yViolations` to verify no violations in major usage scenarios.
- Add `aria-label` for `role="switch"`, icon-only buttons, controls without visible text, etc.
- When a real label relationship is needed, wrap the component to simulate a real usage context.

### Quality requirements

- Test assertions align with real component behavior; do not write idealized assertions disconnected from the implementation.
- When adding or fixing a component capability, sync the corresponding tests.
- New components require tests by default; do not leave tests as future debt.
