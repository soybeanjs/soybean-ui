# SoybeanUI Component Development Reference

## Source of truth

- `.github/assistant-rules.md` is the neutral entrypoint.
- `.github/copilot-instructions.md` is the repository-specific routing file.
- `.github/instructions/*.instructions.md` contain the normative task rules.

## Task routing

- Always load `soybean-ui-component-overview.instructions.md` for real component work.
- Load `soybean-ui-headless.instructions.md` when editing `headless/src/components/**/*.{ts,vue}`.
- Load `soybean-ui-ui-layer.instructions.md` when editing `src/components/**/*.{ts,vue}`.
- Load `soybean-ui-accessibility-rtl.instructions.md` for component accessibility and RTL behavior.
- Load `soybean-ui-playground.instructions.md`, `soybean-ui-docs.instructions.md`, and `soybean-ui-testing.instructions.md` only when those surfaces are in scope.
- Use `soybean-ui-checklist.instructions.md` only for final completion review.

## Component patterns

### Multi-slot base component

- Headless exposes multiple slot primitives.
- Use `UiSlot` and `UiClass`.
- UI injects classes through `provide{Name}Ui(ui)`.

### Compact aggregation

- Use when structure is stable and data-driven.
- Headless owns iteration, default content, structure, and non-style orchestration.
- UI wrappers stay thin and only handle variants, class injection, prop forwarding, and slot forwarding.

### Single-class component

- Skip UI context.
- UI composes classes directly from variants and `props.class`.

## Phase order

1. Identify pattern, scenario, and delivery scope before coding.
2. Inspect at least one existing headless reference and one existing UI reference of the same pattern.
3. Implement headless first.
4. Implement UI second.
5. Wire public exports and rerun generation commands.
6. Finish playground, docs, tests, and generated API data when affected.
7. Run validation and then apply the checklist.

## Boundary rules

- Data flow must remain `headless -> src`.
- Headless must not contain styles or UI-only classes.
- UI must not own ARIA semantics, keyboard interaction, or state logic.
- Avoid adding new helpers before checking existing repository utilities and `@vueuse/core`.

## Delivery surface checklist

- `headless/src/components/{component}/`
- `src/components/{component}/`
- `headless/src/index.ts`
- `src/index.ts`
- `playground/examples/{component}/`
- `docs/src/docs/en/components/{component}.md`
- `docs/src/docs/zh-CN/components/{component}.md`
- `docs/src/constants/menus.ts`
- `test/specs/components/{component}.spec.ts`

## Generated surfaces

- Run `pnpm gen:headless` after updating `headless/src/index.ts`.
- Run `pnpm gen:ui` after updating `src/index.ts`.
- Run `pnpm gen:api` after public API changes.
- Run `pnpm translate:api:i18n -- --locale <locale>` for each non-English API locale after the English baseline is regenerated.
- Do not hand-edit generated component lists, namespaced exports, or API JSON files.

## Result reporting

- State which component pattern and scenario were used.
- Mention which delivery surfaces were updated or intentionally left unchanged.
- If new composables, shared helpers, or types were added, explain why existing repository utilities and `@vueuse/core` were not enough.

## Examples

- See [EXAMPLES.md](EXAMPLES.md) for common request shapes that should trigger this skill.
