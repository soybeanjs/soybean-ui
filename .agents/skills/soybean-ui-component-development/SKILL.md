---
name: soybean-ui-component-development
description: Builds and updates SoybeanUI components with headless/UI split, delivery phases, and generation workflow. Invoke when adding, migrating, extending, standardizing, or fixing components, or when work touches packages/headless/src/components, packages/ui/src/components, apps/playground/src/examples, apps/docs/src/docs, or packages/ui/test/specs/components.
---

# SoybeanUI Component Development

This skill is the single, self-contained source of truth for SoybeanUI component work. It owns pattern classification, phase order, layer rules, delivery surfaces, generation workflow, and the finish-stage checklist. Load it for any task that creates, migrates, extends, standardizes, or fixes a SoybeanUI component.

For detailed rules, see [layers.md](layers.md) (implementation layers), [surfaces.md](surfaces.md) (delivery surfaces), and [process.md](process.md) (finish checklist and commit convention). For request shapes that trigger this skill, see [EXAMPLES.md](EXAMPLES.md). TypeScript functional style and Vue SFC structure are owned by the global `typescript-functional-style` and `vue-sfc-structure` skills — load them directly; this skill does not restate their content.

## Repository context

- Monorepo: pnpm workspaces (`packages/`, `apps/`; root = `@soybeanjs/ui`)
- Stack: Vue 3 + TypeScript (strict) + UnoCSS + `@soybeanjs/cva`
- Architecture: headless / styled separation. Data flow is `packages/headless` -> `packages/ui` only, never reverse.
- `@soybeanjs/headless` (`packages/headless/`): Logic, state, a11y, structure. Zero styles.
- `@soybeanjs/ui` (`packages/ui/`): Styled wrappers. UnoCSS + `cv()` / `scv()`. `S`-prefixed components.
- `@soybeanjs/ui-docs` (`apps/docs/`): Vite + vite-ssg + unplugin-vue-markdown + markdown-exit. NOT VitePress.

## Quick start

1. **Classify the task before editing.**
   - Component pattern: multi-slot base, compact aggregation, or single-class.
   - Scenario: new component, migration or normalization, or standards alignment.
   - Delivery scope: headless only, UI only, or full surface.
2. **Find concrete local references.**
   - Inspect at least one neighboring same-pattern headless implementation and one UI implementation before editing.
   - For migration, preserve behavior, state, accessibility, slots, and public API before restructuring.
3. **Reuse existing building blocks first.**
   - Prefer `packages/headless/src/composables/`, `packages/headless/src/shared/`, and `packages/headless/src/types/`.
   - If the repository has no suitable composable, check `@vueuse/core`.
   - Only add a new composable, helper, or type when both are insufficient, and state that reason in the result.

Example: "migrate a compound widget into SoybeanUI" usually means migration scenario + multi-slot or compact pattern + full delivery surface.

## Component patterns

### Multi-slot base component

- Headless exposes multiple slot primitives.
- Uses `UiSlot` and `UiClass<UiSlot>`.
- UI injects classes through `provide{Name}Ui(ui)`.
- Examples: badge, accordion, dialog.

### Compact aggregation

- Use when structure is stable and data-driven.
- Headless owns iteration, default content, structure, and non-style orchestration via `{Name}Compact`.
- UI wrappers stay thin: only variants, class injection, prop/listener forwarding, and slot forwarding.
- Exposes `{Name}CompactProps` / `{Name}CompactEmits` / `{Name}CompactSlots`.
- Current examples: accordion, card, date-field, dialog, editable, hover-card, layout, navigation-menu, pagination, popover, stepper, table flows.

### Single-class component

- No UiContext.
- UI composes classes directly from variants and `props.class` via `{name}Variants({...}, props.class)`.
- Examples: button, link.

## Workflows

### New or migrated component

1. **Build headless first.**
   - `types.ts` -> `context.ts` -> base slot SFCs -> optional `{Name}Compact` -> `index.ts`.
2. **Build UI second.**
   - `packages/ui/src/styles/{name}.ts` -> `types.ts` -> wrapper `.vue` -> `index.ts`.
3. **Complete exports and generated surfaces.**
   - Update `packages/headless/src/index.ts` and `packages/ui/src/index.ts`.
   - Run `pnpm sui headless` and `pnpm sui ui`.
   - Do not hand-edit generated files.
4. **Complete delivery surfaces** unless the user explicitly narrows scope.
   - `apps/playground/src/examples/{component}/`
   - `apps/docs/src/docs/en/components/{component}.md`
   - `apps/docs/src/docs/zh-CN/components/{component}.md`
   - `apps/docs/src/constants/menus.ts`
   - `packages/ui/test/specs/components/{component}.spec.ts`
   - Run `pnpm sui api` when public API changes; for non-English locales run `pnpm sui api-translate -- --locale <locale>`.
   - Run `pnpm sui changelog` and `pnpm sui changelog-translate -- --locale <locale>` when changelog mapping or release-facing surfaces change.

### Existing component fix or extension

1. Decide whether the change belongs to headless logic or UI wrapping.
2. Preserve the boundary:
   - No styles in headless (not even `hidden`, `sr-only`).
   - No ARIA, `role`, `tabindex`, or keyboard semantics in UI.
   - No reverse dependency from `packages/headless` to `packages/ui`.
3. Check whether playground, docs, tests, exports, or generated API data must move with the change.
4. If a new composable, helper, or type is introduced, explain why existing repository utilities and `@vueuse/core` were insufficient.

## Phase order

Execute in this order. Do not skip ahead until the current phase is done.

### Phase 0: Classify pattern, scenario, and scope

- Determine component pattern, task scenario, and whether this is full delivery.
- Do not write code first and reverse-engineer the pattern.

### Phase 1: Find reference implementations

- Inspect at least one same-pattern headless reference and one UI reference.
- Migration (scenario B): catalog behavior, state, a11y, slots, and public API that must be preserved.
- Standards alignment (scenario C): list the gap inventory.

### Phase 2: Implement headless

- Default order: `types.ts` -> `context.ts` -> base slot SFCs -> optional `{Name}Compact` -> `index.ts`.
- See [layers.md -> Headless](layers.md#headless) for layer rules.

### Phase 3: Implement UI

- Default order: `packages/ui/src/styles/{name}.ts` -> `types.ts` -> wrapper `.vue` -> `index.ts`.
- See [layers.md -> UI layer](layers.md#ui-layer) for layer rules.

### Phase 4: Wire exports and generated files

- Update `packages/headless/src/index.ts` and `packages/ui/src/index.ts`.
- Run `pnpm sui headless` and `pnpm sui ui`.
- Do not hand-edit generated files.

### Phase 5: Complete delivery surfaces

- Playground: see [surfaces.md -> Playground](surfaces.md#playground).
- Docs: see [surfaces.md -> Docs](surfaces.md#docs).
- Tests: see [surfaces.md -> Testing](surfaces.md#testing).
- If public API changed, run `pnpm sui api`; for non-English locales run `pnpm sui api-translate -- --locale <locale>`.
- If changelog mapping or release surfaces changed, run `pnpm sui changelog`; for non-English locales run `pnpm sui changelog-translate -- --locale <locale>`.

### Phase 6: Validate and finish

- Run `pnpm typecheck`, `pnpm lint`, `pnpm fmt`, and the narrowest relevant test: `pnpm vitest packages/ui/test/specs/components/{component}.spec.ts`.
- If a command cannot run, state the blocker explicitly.
- Apply [process.md -> Finish checklist](process.md#finish-checklist) only now.

## Boundary rules

- Data flow must remain `packages/headless` -> `packages/ui`. Never import `@soybeanjs/ui` from `packages/headless`.
- Headless owns logic, state, accessibility, structure aggregation, and default semantics.
- UI owns variants, UnoCSS classes, `ui` injection, and wrapper composition.
- Do not add styles or visual classes in headless (not even `hidden`, `sr-only`).
- Do not put ARIA, `role`, `tabindex`, keyboard interaction, or state semantics in `packages/ui/src/components`.
- Do not hand-edit generated files; update source exports and rerun scripts.
- Avoid adding new helpers before checking existing repository utilities and `@vueuse/core`.

## Guardrails

- Use `UiClass<UiSlot>` (from `packages/headless/src/types`), not `Record<UiSlot, ClassValue>`.
- Props always `extends /** @vue-ignore */ HTMLAttributes` to suppress IDE noise; if based on `Primitive`, `extends PrimitiveWithBaseProps`.
- Context values must be reactive: `ComputedRef` or `ShallowRef`. Use `transformPropsToContext(props, keys)` for prop-derived fields.
- `use{Name}Ui('root')` -> `ComputedRef<ClassValue>` (single slot); `use{Name}Ui()` -> full map.
- For multi-slot wrappers, pass `props.ui` and `{ root: props.class }` directly into the `scv()` recipe call.
- Multi-slot: only export `provide{Name}Ui` from headless barrel; never export `use{Name}Ui`.
- `packages/ui/src/styles/{name}.ts` first line must be `// @unocss-include`.
- `slots` keys in style recipe must match headless `{Name}UiSlot` exactly.
- `useOmitProps` must include `class` to avoid double-binding.
- UI component names use `S` prefix (`SButton`, `SDialog`); headless names do not (`Button`, `Dialog`).
- Never use `as any` / `@ts-ignore` / `@ts-expect-error`.
- Never modify `typed-router.d.ts` (auto-generated).

## Full delivery surface

New components check every entry; existing component changes sync affected entries:

- `packages/headless/src/components/{component}/`
- `packages/ui/src/components/{component}/`
- `packages/headless/src/index.ts`
- `packages/ui/src/index.ts`
- `apps/playground/src/examples/{component}/`
- `apps/docs/src/docs/en/components/{component}.md`
- `apps/docs/src/docs/zh-CN/components/{component}.md`
- `apps/docs/src/constants/menus.ts`
- `packages/ui/test/specs/components/{component}.spec.ts`

## Generated surfaces

Run these after the corresponding source changes. Never hand-edit generated outputs.

- `pnpm sui headless` — regenerates `packages/headless/src/constants/components.ts` and `packages/headless/src/namespaced/index.ts` from `packages/headless/src/index.ts`.
- `pnpm sui ui` — regenerates `packages/ui/src/constants/components.ts` from `packages/ui/src/index.ts`.
- `pnpm sui api` — regenerates `apps/docs/src/generated/api/*.json` and `apps/docs/src/generated/api-locales/*.json` base data.
- `pnpm sui api-locales` — regenerates API i18n locale template data without re-running type extraction.
- `pnpm sui api-translate -- --locale <locale>` — translates generated English API descriptions into a non-English locale.
- `pnpm sui changelog` — regenerates `apps/docs/src/generated/changelog/*.json` and `apps/docs/src/generated/changelog-locales/*.json` base data.
- `pnpm sui changelog-translate -- --locale <locale>` — translates generated English changelog summaries into a non-English locale.

## Build and validation commands

```bash
pnpm dev              # Playground (Vite)
pnpm build            # headless (tsdown) -> ui (tsdown) -> css (unocss build)
pnpm lint             # oxlint --fix && eslint --fix
pnpm fmt              # oxfmt (formatter)
pnpm test             # vitest run (happy-dom, @vue/test-utils)
pnpm typecheck        # vue-tsc --noEmit --skipLibCheck
pnpm release          # Publish packages (soy release)
pnpm stub             # tsx scripts/stub.ts — link src to dist for local dev
```

- Pre-commit hook (simple-git-hooks): `pnpm typecheck && pnpm lint-staged`.
- CI: tag-triggered release only. No PR check workflow.
- Formatter: `oxfmt`.

## Result reporting

In the final handoff, make the following explicit when relevant:

- Component pattern, scenario, and scope.
- Which delivery surfaces were changed or intentionally left unchanged.
- Which generation and validation commands were run.
- Any blocker that prevented validation or full delivery.
- Why a new composable, shared helper, or type was introduced instead of reusing repository utilities or `@vueuse/core`.
