---
head:
  title: Headless
  description: 'Unstyled, fully accessible component logic — the foundation @soybeanjs/ui is built on.'
---

# Headless

> Unstyled, fully accessible component logic — the foundation `@soybeanjs/ui` is built on.

`@soybeanjs/headless` is the logic layer of SoybeanUI. State, keyboard interaction, focus management and accessibility semantics live here, with zero visual styling. The styled components in `@soybeanjs/ui` are thin wrappers on top of it.

## Installation

```bash
pnpm add @soybeanjs/headless
```

## Layer split

| Layer  | Package               | Owns                                                 |
| ------ | --------------------- | ---------------------------------------------------- |
| Logic  | `@soybeanjs/headless` | State, a11y, keyboard navigation, focus, zero styles |
| Styled | `@soybeanjs/ui`       | UnoCSS variants, class injection, slot forwarding    |

The compile-time dependency direction is **UI → Headless**. Headless never imports UI.

## Exports

- `.` — every component and type
- `./composables` — 28 reusable composables (`useControllableState`, `useContext`, `useUiContext`, …)
- `./shared` — pure TypeScript utilities (DOM, focus, tree, form, guard, comparison)
- `./types` — shared types such as `ClassValue`, `UiClass` and `ToContext`
- `./date`, `./locale`, `./constants`
- `./nuxt` and `./resolver` — Nuxt auto-registration and the `unplugin-vue-components` resolver
- `./namespaced` — namespace export (for example `Headless.AccordionRoot`)
- `./<component>` — per-component sub-path (for example `@soybeanjs/headless/accordion`)

## Scope

- 96 component directories, 94 of them publicly exported
- 28 composables and 20 pure-utility modules

`@soybeanjs/headless` ships no styles at all — not even `hidden` or `sr-only`. Layout-contract geometry is the only structural output, and presentation belongs to the styled layer.
