# Drawer

## Overview

A panel that slides out from the edge of the screen. It reuses the declarative API and slot contract of `SDialog` (same headless `DialogCompact` base, same modal/focus/dismissable behavior), and adds `side` to control where the panel enters — `top`/`bottom`/`left`/`right` (default `right`).

`SDrawer` combines the headless dialog primitive family with the `drawerVariants` style recipe (extends `dialogVariants`, 6 sizes × 4 sides).

## Usage

<UsageCode component="drawer" />

## Features

- 🧩 Reuses the dialog base — built on `DialogCompact`, inherits `SDialog`'s slots, events, per-part `*Props`, `pure`, `isAlert` and the imperative `dialog(...)` API
- 🧭 4 sides — `side="top"`/`"bottom"`/`"left"`/`"right"` (default `right`); RTL-aware slide direction for left/right
- 🎭 Modal by default — `aria-modal`, `useHideOthers`, outside-pointer blocking and focus trapping, same as `SDialog`
- ❌ Closable — `showClose`, Escape, outside pointer/focus and the close button all dismiss
- 🎞️ Animated — enter/exit transitions (`slide-in-from-*` / `slide-out-to-*`) driven by the open state
- 📐 6 sizes — xs–2xl `size`; per-slot `ui` overrides
- 🔘 Cancel/confirm footer — `showCancel`/`showConfirm` with localized `cancelText`/`confirmText`
- ♿ Accessible — `role="dialog"`, focus trap + loop, focus restoration on close, `axe-core` zero violations

## Component family

- `SDrawer` (styled) — the entry wrapper; `drawerVariants` recipe (`size` + `side`) with dynamic slot forwarding
- All other parts come from the headless dialog family (see `Dialog`): `DialogRoot`, `DialogTrigger`, `DialogOverlay`, `DialogPopup`, `DialogHeader`, `DialogContent`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogCancel`, `DialogConfirm`, `DialogCompact`

## Demos

<PlaygroundGallery component="drawer" />

## API

<ComponentApi component="drawer" />

## Notes

### Architecture and benchmark differences

`SDrawer` is a thin styled wrapper: it forwards every prop/slot/event to the headless `DialogCompact` and only supplies the `drawerVariants` recipe that extends `dialogVariants` with side-specific `popup` classes. This keeps drawer and dialog behavior identical while varying only presentation — the same headless/styled split as shadcn-ui/vaul-style drawers, versus Ant Design's `drawer` (single styled component with `placement`/`width`/`closable`/`mask` props) and Element Plus/Mantine/Naive UI equivalents.

| Capability                | SoybeanUI | shadcn/ui | Ant Design Drawer | Element Plus Drawer | Mantine Drawer | Naive UI Drawer |
| :------------------------ | :-------: | :-------: | :---------------: | :-----------------: | :------------: | :-------------: |
| Reuses dialog base        |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| Headless/styled split     |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| 4 placements (side)       |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| Modal (aria-modal + trap) |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| Focus return on close     |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| Sizes (6)                 |    ✅     |     —     |         —         |          —          |       —        |        —        |
| Pure (no header/footer)   |    ✅     |     —     |         —         |          —          |       —        |        —        |

`—` = unsupported or a different interaction model.

### Cautions

- Drawer inherits the dialog contract: it is modal by default and the popup teleports to `document.body`; Escape/outside interaction dismisses it.
- `side` only changes the slide direction and position classes; the accessible `role` remains `dialog` (a drawer is not a distinct ARIA role).
- Left/right drawers slide in the logical direction and are mirrored under RTL (`dir`).
- The imperative `dialog(...)` API also renders drawers if you pass the matching options — no separate drawer service is needed.

## FAQ

### How do I slide the drawer from a specific edge?

Set `side` to `top`/`bottom`/`left`/`right`:

```vue
<SDrawer v-model:open="open" side="left" title="Filters">...</SDrawer>
```

### How do I control the open state?

Bind `open` with `v-model`, or use `defaultOpen` for an uncontrolled drawer:

```vue
<SDrawer v-model:open="open" title="Settings">...</SDrawer>
```

### How do I add cancel/confirm actions?

Use the `footer` slot or rely on `showCancel`/`showConfirm` with localized text:

```vue
<SDrawer v-model:open="open" show-confirm confirm-text="Apply" title="Preferences">
  <template #trigger><SButton>Open</SButton></template>
</SDrawer>
```

### How do I make a custom drawer?

Use `pure` and fill the default slot:

```vue
<SDrawer v-model:open="open" pure side="bottom">
  <div class="custom">...</div>
</SDrawer>
```
