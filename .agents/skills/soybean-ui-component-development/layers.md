# SoybeanUI Implementation Layer Rules

Implementation rules for the headless and UI layers, plus cross-cutting a11y/RTL. The companion [SKILL.md](SKILL.md) owns pattern classification, phase order, and guardrails; [surfaces.md](surfaces.md) owns delivery surface rules; [process.md](process.md) owns finish and commit rules.

## Headless

Applies to `packages/headless/src/components/**/*.{ts,vue}`.

### Responsibility boundary

- Headless only owns logic, state, a11y, structure aggregation, and default semantics.
- Never add UnoCSS classes, `<style>`, inline styles, or any visual styles (not even `hidden`, `sr-only`).
- Never import from `@soybeanjs/ui`.
- Before writing new logic, check `packages/headless/src/composables/`, `packages/headless/src/shared/`, and `packages/headless/src/types/`.
- `role`, `aria-*`, `tabindex`, keyboard interaction, focus management, and `dir` semantics are headless responsibilities; concrete rules live in [A11y and RTL](#a11y-and-rtl).

### Implementation order

1. `types.ts`
2. `context.ts`
3. Base slot SFCs
4. `UiContext`
5. Optional `{Name}Compact`
6. `index.ts` and `packages/headless/src/index.ts`
7. Run `pnpm sui headless`

### Step 1: types.ts

- Multi-slot components use `UiClass<{Name}UiSlot>` to define `{Name}Ui`.
- Props use `interface`, extending `BaseProps` or a more specific HTML attributes type. If the component is based on `Primitive`, extend `PrimitiveWithBaseProps`.
- Reuse existing types from `packages/headless/src/types/common.ts` first; do not redefine `Side`, `Align`, `Direction`, or other shared types.
- Controlled / uncontrolled state uses `useControllableState`.
- Multi-select components prefer `SelectionProps<M>` / `SelectionEmits<M>`.

### Step 2: context.ts

- Context values must be reactive: `ComputedRef` or `ShallowRef`.
- Prop-derived fields prefer `transformPropsToContext` or `PropsToContext`.
- Need a new composable or state utility? Check `packages/headless/src/composables/` first, then `@vueuse/core`.
- Direction-sensitive components resolve and propagate `dir` here; follow [A11y and RTL](#a11y-and-rtl).
- Derived values needed outside the provider are computed in the component, then passed to `provideXContext`.
- Infrastructure state for child consumption only (element ref, generated id) can be derived inside the `useContext` callback.
- Consume required context by destructuring; keep the whole object only for optional context.

### Step 3: Base slot SFCs

- Slot components obtain classes via `use{Name}Ui('root')` or `use{Name}Ui()`.
- Every headless slot root element exposes a stable `data-soybean-{name}` attribute, named after the slot file (e.g. `data-soybean-card-root`).
- Need a DOM handle? Use `useForwardElement`.
- `role`, `aria-*`, `tabindex`, keyboard events, and focus attributes belong on these headless interactive elements, not on UI wrappers.
- State is exposed via `data-state` and other `data-*` attributes, never via class.

### Step 4: UiContext

- Multi-slot components establish `provide{Name}Ui` / `use{Name}Ui` via `useUiContext`.
- Only export `provide{Name}Ui`.
- `use{Name}Ui` is internal to the component family; never expose it from the barrel.

### Step 5: Compact aggregation

Sink aggregation logic into headless when:

- Input is list data.
- Structure is stable.
- UI only needs style injection, variant computation, `ui` merge, and prop/listener forwarding — no extra logic.

If UI still needs any non-style logic, the aggregation has not finished sinking; keep building it in headless.

When sinking:

- Add `{Name}CompactProps`, `{Name}CompactEmits`, `{Name}CompactSlots` in headless.
- Add `{component}-compact.vue`.
- Move `items` iteration, `Root/Item/Header/Trigger/Content` composition, default title/description/icon rendering, and any non-style logic affecting structure, state, slot selection, default content, event orchestration, or conditional branching into headless.
- Default icons render through headless `IconRender`, driven by `ConfigProvider.iconRender`.

Typical headless-owned concerns:

- Deciding which slots render and in what order based on data.
- Assembling default title, description, icon, empty state, or fallback content.
- Handling `items`-related conditionals, event dispatch, slot selection, and structure switching.
- Supplying extra props, derived state, or context values to internal sub-components.

### Step 6: Common implementation patterns

- Use `transformPropsToContext(props, [...])` to keep props reactive in context.
- Use `useControllableState(() => props.xxx, value => emit('update:xxx', value), defaultValue)` for controlled/uncontrolled modes.
- When forwarding part of this component's UI slots to an internal child headless component, map and inject them inside the `useUiContext` callback.
- Only add a new headless composable or shared helper when both repository `composables/shared/types` and `@vueuse/core` are insufficient.

### Step 7: Exports and registration

- `index.ts` exports components, `provide{Name}Ui`, and related types.
- Public exports also go into `packages/headless/src/index.ts`.
- Run `pnpm sui headless` to regenerate files; never hand-edit them.

### Headless anti-patterns

- Adding style classes (including `hidden`, `sr-only`).
- Direct DOM manipulation (e.g. `document.querySelector`).
- Storing non-reactive raw values in context.
- Exporting `use{Name}Ui`.
- Leaving stable aggregation structure in the UI wrapper.
- Leaving any non-style logic in the UI wrapper once `{Name}Compact` exists.

## UI layer

Applies to `packages/ui/src/components/**/*.{ts,vue}`.

### Responsibility boundary

- UI only owns style wrapping, variant computation, UiContext injection, and prop/listener forwarding.
- Never place ARIA, keyboard logic, or state semantics in UI.
- UI consumes `data-state`, `dir`, and slot structure already exposed by headless; it does not rebuild semantics.

### Implementation order

1. `packages/ui/src/styles/{name}.ts`
2. `types.ts`
3. wrapper `.vue`
4. `index.ts` and `packages/ui/src/index.ts`
5. Run `pnpm sui ui`

### Step 1: Style recipe

- First line must be `// @unocss-include`.
- Use `@soybeanjs/cva`'s `cv()` or `scv()` to define the style recipe.
- Same-family recipes reuse via `extend` / `alias` / `extendBase`. Cross-family chrome fragments live in `_*.ts` next to recipes (`_field.ts`, `_overlay.ts`); compose those tokens instead of copying class strings. Do not extract a new `_*.ts` unless the same fragment is copied across unrelated recipes.
- `slots` keys must match headless `{Name}UiSlot` exactly.
- Custom CSS variables use the `--soybean-` prefix.
- Direction-related styles follow [A11y and RTL](#a11y-and-rtl): prefer logical properties and logical alignment classes; only use `rtl:` modifiers when logical properties cannot express the intent.

### Step 2: types.ts

- Props use `interface`, not `type`.
- UI component props standard includes `class?: ClassValue`.
- Headless component types for the matching UI component are imported or re-exported from the `@soybeanjs/headless/{name}` sub-path.
- `ClassValue`, `UiClass`, and other headless global types are imported from `@soybeanjs/headless/types`.
- When the UI layer adds structural elements headless does not have, and those elements also need `ui` override capability, extend `ExtraUiSlot` / `ExtendedUi`.

### Step 3: wrapper `.vue`

- `defineOptions({ name: 'S{Name}' })`.
- Use prop names directly in the template; do not write `props.xxx`.
- `script setup` order follows the global `vue-sfc-structure` skill.
- Wrapper only handles style injection and prop/listener forwarding. Do not add `aria-*`, keyboard logic, or swallow `dir`, `data-*`, or other semantic inputs that must continue to headless.

#### 3.1 Props forwarding strategy

**Use `useOmitProps` when:**

- Downstream should receive most props and the wrapper only consumes a few UI-specific props.
- Common scenario: omit `class`, `color`, `size`, `ui` and forward the rest to the headless root.

**Use `usePickProps` when:**

- One wrapper splits props across two or more child components.
- Each child should receive a clearly defined subset.

**Skip both when:**

- Based on `Primitive`.
- Wrapping a single child component.
- The wrapper truly handles three or fewer extra props.

In simple cases, prefer explicit bindings.

#### 3.2 Component patterns

**Multi-slot wrapper:**

- Compute `ui = computed(() => nameVariants(variantProps, props.ui, { root: props.class }))`.
- Call `provide{Name}Ui(ui)`.
- If headless already provides `{Name}Compact`, render it directly. Do not iterate `items`, assemble default icon/title/content, or orchestrate any non-style logic for Compact in the wrapper.

If the wrapper still needs conditionals, default content decisions, slot selection, event wrapping, structure switching, or other non-style logic for Compact, sink that work back into headless instead of piling it onto UI.

**Single-class component:**

- Direct `{name}Variants(variantProps, props.class)`.
- No UiContext.

### Step 4: index.ts

- UI component barrel exports the default component.
- Re-export matching headless component types from the `@soybeanjs/headless/{component}` sub-path.
- Do not re-export component types from the `@soybeanjs/headless` root path; headless global types continue to import from `@soybeanjs/headless/types`.
- Re-export UI layer's own `types.ts`.

### Step 5: Register to UI exports

- Update `packages/ui/src/index.ts`.
- Run `pnpm sui ui` to regenerate `packages/ui/src/constants/components.ts` (script-generated; never hand-edit).

### UI anti-patterns

- `packages/ui/src/styles/{name}.ts` missing `// @unocss-include`.
- `slots` keys inconsistent with `{Name}UiSlot`.
- `useOmitProps` missing `class`.
- Recipe call missing `props.ui` or `{ root: props.class }`.
- Writing `props.xxx` in the template.
- Component name missing `S` prefix.
- Re-exporting all types from `@soybeanjs/headless` root path.
- Mixing component sub-path types and headless global type import sources in UI `types.ts` or `index.ts`.

## A11y and RTL

Applies to `packages/headless/src/components/**/*.{ts,vue}` and `packages/ui/src/components/**/*.{ts,vue}`.

### A11y principles

- All ARIA, `role`, `tabindex`, and keyboard interaction belong to the headless layer.
- UI only handles visual styles; it never adds ARIA logic.

### ARIA and state reflection

- Set `role` and `aria-*` per the relevant WAI-ARIA APG pattern.
- Reflect state through `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled`, etc.
- Also expose state via `data-state` for styling and tests.
- Do not rely on class alone to carry state.

### ID association

- Generate unique ids with Vue's `useId()` and associate `aria-labelledby` and `aria-controls` through them.

### Decorative elements

- Purely decorative icons or duplicated content use `aria-hidden="true"`.

### Keyboard and focus

- All interactive elements must be operable by keyboard.
- Complex components maintain a sensible focus order.
- Overlays, dialogs, and similar components need correct focus trap or focus return strategies.

### RTL rules

- Headless: add `dir?: Direction` to `types.ts`, resolve direction with `useDirection(...)` in `context.ts`, and ensure the DOM root can bind `:dir="dir"`.
- UI: in `variants.ts`, prefer UnoCSS logical properties and logical alignment classes — `start-*`, `end-*`, `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`.
- Only use `rtl:` modifiers when logical properties cannot express the intent.

### Default writing style

- When logical properties work, do not use `left-*`, `right-*`, `ml-*`, `mr-*`, `pl-*`, `pr-*`, `text-left`, `text-right`.
- Positioning prefers `start-*` / `end-*`.
- Spacing prefers `ms-*` / `me-*` / `ps-*` / `pe-*`.
- Text alignment prefers `text-start` / `text-end`.
- Reserve `rtl:` modifiers for cases logical properties cannot cover (e.g. horizontal arrows, chevrons, specific motion directions).

### Common replacements

- `left-0` -> `start-0`
- `right-0` -> `end-0`
- `left-2` -> `start-2`
- `ml-2` -> `ms-2`
- `mr-2` -> `me-2`
- `pl-4` -> `ps-4`
- `pr-4` -> `pe-4`
- `text-left` -> `text-start`
- `text-right` -> `text-end`
- `inset-x-0` and similar direction-agnostic utilities can stay as-is.
- Horizontal arrows, chevrons, and motion directions that logical properties cannot cover still need explicit `rtl:rotate-180`, `rtl:flex-row-reverse`, `rtl:-translate-x-*`, etc.

### Self-check

- UI layer still has no ARIA logic.
- State reflects to both `aria-*` and `data-state`.
- Styles prefer `start-*`, `end-*`, `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`.
- Directional layout, icons, positioning, and animation flip correctly under RTL.
