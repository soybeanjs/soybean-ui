---
name: soybean-ui-component-development
description: Builds and updates SoybeanUI components with the repository's headless/UI split, delivery phases, and generation workflow. Use when adding, migrating, extending, standardizing, or fixing SoybeanUI components, or when work touches headless/src/components, src/components, playground/examples, docs/src/docs, or test/specs/components for component work.
---

# SoybeanUI Component Development

## Quick start

1. Classify the task before editing:
   - component pattern: multi-slot base, compact aggregation, or single-class
   - scenario: new component, migration or normalization, or standards alignment
   - delivery scope: headless only, UI only, or full surface
2. Read the source of truth for the touched slice:
   - always start from `.github/copilot-instructions.md`
   - then load `soybean-ui-component-overview.instructions.md`
   - add headless, ui-layer, accessibility-rtl, playground, docs, or testing instructions only when the task touches those surfaces
3. Reuse before adding anything new:
   - `headless/src/composables/`
   - `headless/src/shared/`
   - `headless/src/types/`
   - `@vueuse/core` if the repository has no suitable composable

Example: "migrate a compound widget into SoybeanUI" usually means migration scenario + multi-slot or compact pattern + full delivery surface.

## Workflows

### New or migrated component

1. Build headless first:
   - `types.ts`
   - `context.ts`
   - base slot SFCs
   - optional `{Name}Compact`
   - `index.ts`
2. Build UI second:
   - `variants.ts`
   - `types.ts`
   - wrapper `.vue`
   - `index.ts`
3. Complete exports and generated surfaces:
   - update `headless/src/index.ts` and `src/index.ts`
   - run `pnpm sui headless`
   - run `pnpm sui ui`
4. Complete delivery surfaces unless the user explicitly narrows scope:
   - `playground/examples/{component}/`
   - `docs/src/docs/en/components/{component}.md`
   - `docs/src/docs/zh-CN/components/{component}.md`
   - `docs/src/constants/menus.ts`
   - `test/specs/components/{component}.spec.ts`
   - run `pnpm sui api` and locale translation when public API changes

### Existing component fix or extension

1. Decide whether the change belongs to headless logic or UI wrapping.
2. Preserve the boundary:
   - no styles in headless
   - no ARIA, `role`, `tabindex`, or keyboard semantics in UI
   - no reverse dependency from `headless` to `src`
3. Check whether playground, docs, tests, exports, or generated API data must move with the change.
4. If a new composable, helper, or type is introduced, explain why existing repository utilities and `@vueuse/core` were insufficient.

## Guardrails

- Headless owns logic, state, accessibility, structure, and compact aggregation.
- UI owns variants, UnoCSS classes, `ui` injection, and wrapper composition.
- Do not hand-edit generated files; update source exports and rerun scripts.
- Use `soybean-ui-checklist.instructions.md` only after implementation is complete.

## Advanced features

See [REFERENCE.md](REFERENCE.md) for phase details, instruction mapping, and repository-specific delivery rules.
