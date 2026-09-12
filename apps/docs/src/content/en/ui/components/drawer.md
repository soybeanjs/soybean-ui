---
head:
  title: Drawer
  description: 'A gesture-driven panel that slides in from an edge of the screen. It owns its own headless family — snap points, swipe dismiss, drag handle and nested scaling — built on the dialog primitives for modality, focus and dismissal.'
---

# Drawer

## Overview

A gesture-driven panel that slides in from an edge of the screen. Unlike `SSheet` (a dialog with a side), the drawer owns a real domain state machine: **snap points**, **swipe progress**, a **drag handle**, and **nested scaling** are behaviour the dialog family does not have.

`SDrawer` combines the headless `drawer` primitive family with the `drawerVariants` style recipe (extends `sheetVariants`, adds a drag `handle` and an opt-in `swipeArea`; 6 sizes × 4 sides). Modality, focus trapping and dismissal still come from the shared dialog primitives.

## Usage

<UsageCode component="drawer" />

## Features

- 🧩 Dialog-backed modality — inherits the dialog contract (`open`/`defaultOpen`, focus trap, focus restoration, Escape/outside dismissal) while adding the drawer state machine
- 🧭 4 sides — `side="top"`/`"bottom"`/`"left"`/`"right"` (default `bottom`); horizontal sides are mirrored under RTL, vertical sides cap their height and scroll their content
- 📏 Snap points — `snapPoints` accepts fractions (`0.5`), pixel offsets or CSS lengths; bind the active level with `v-model:snap-point`
- 🪜 Sequential snapping — `snapToSequentialPoints` walks one level at a time instead of jumping to the nearest point
- 🖐️ Swipe dismiss — dragging the panel or the handle past `closeThreshold` closes it; `dismissible={false}` forces an explicit action
- 👉 Swipe to open — opt into an edge gesture strip with `swipeable` (`DrawerSwipeArea`), with axis locking, direction damping, sampled velocity and scroll yielding
- 🎭 Background scale — `shouldScaleBackground`/`setBackgroundColorOnScale` scale and tint the page behind the drawer
- 🧲 Handle-only dragging — `handleOnly` restricts the gesture to the handle; `fixed` pins the panel while its content scrolls
- 🪗 Nested drawers — `nested` renders through `DrawerRootNested` so drag, release and open state stay coordinated with the parent
- 🎛️ Modality tiers — `modal` accepts `true` (full modal), `'trap-focus'` (focus trapped, outside pointer events alive) or `false`
- 🔘 Dialog footer — `showClose`/`showCancel`/`showConfirm` with localized `cancelText`/`confirmText`
- 📐 6 sizes — xs–2xl `size`; per-slot `ui` overrides
- ♿ Accessible — `role="dialog"`, focus moves into the panel, `axe-core` clean

## Component family

- `SDrawer` (styled) — the entry wrapper; `drawerVariants` recipe with dynamic slot forwarding
- `DrawerRoot` / `DrawerRootNested` (headless) — the state owner; `open`, `snapPoints`, `snapPoint`, `dismissible`, `nested`, drag/swipe/scale state
- `DrawerTrigger` (headless) — the opener, wired to `aria-haspopup`/`aria-expanded`
- `DrawerPortal` (headless) — the teleport boundary
- `DrawerOverlay` (headless) — the dimmed backdrop
- `DrawerPopup` (headless) — the focus-trapped, draggable, dismissable surface
- `DrawerViewport` (headless) — the scrollable region that carries snap-point state
- `DrawerSwipeArea` (headless) — the opt-in edge strip that opens the drawer by swipe
- `DrawerHandle` (headless) — the grab handle; double-tap cycles snap points
- `DrawerHeader` / `DrawerContent` / `DrawerFooter` / `DrawerTitle` / `DrawerDescription` / `DrawerClose` / `DrawerCancel` / `DrawerConfirm` (headless) — chrome primitives wrapping Dialog; DOM uses `data-soybean-drawer-*`
- `DrawerCompact` (headless) — the aggregated composite; composes handle, swipe area, header, content and footer and exposes the slots

## Demos

<PlaygroundGallery component="drawer" />

## API

<ComponentApi component="drawer" />

## Notes

### Architecture and benchmark differences

`DrawerCompact` owns the handle/swipe-area/overlay/popup/header/content/footer composition and the drag/snap/scale state flow (via `useSnapPoints`, `useScaleBackground` and `useSwipeDismiss`), while every primitive stays style-free and only the UI wrapper injects the `drawerVariants` classes. This mirrors the vaul / reka-ui Drawer headless split. Ant Design, Element Plus, Mantine and Naive UI ship a single styled drawer; a dedicated draggable panel with `snapPoints` is typically a separate library (vaul, Base UI Drawer). SoybeanUI exposes per-slot `*Props`, a `size` scale, and the snap/scale/drag/swipe model inline.

| Capability               | SoybeanUI | shadcn/ui + vaul | reka-ui Drawer | Ant Design | Element Plus | Mantine |
| :----------------------- | :-------: | :--------------: | :------------: | :--------: | :----------: | :-----: |
| Reuses dialog primitives |    ✅     |        ✅        |       ✅       |     —      |      —       |    —    |
| Headless/styled split    |    ✅     |        ✅        |       ✅       |     —      |      —       |    —    |
| Drag-to-dismiss          |    ✅     |        ✅        |       ✅       |     —      |      —       |   ✅    |
| Snap points              |    ✅     |        ✅        |       ✅       |     —      |      —       |    —    |
| Swipe-to-open area       |    ✅     |        —         |       ✅       |     —      |      —       |    —    |
| Background scale         |    ✅     |        ✅        |       —        |     —      |      —       |    —    |
| Nested drawers           |    ✅     |        ✅        |       ✅       |     —      |      —       |    —    |
| Modality tiers           |    ✅     |        —         |       ✅       |     —      |      —       |    —    |
| Sizes (6)                |    ✅     |        —         |       —        |     —      |      —       |    —    |

`—` = unsupported or a different interaction model.

### Cautions

- `modal` defaults to `true`; the panel teleports to `document.body` and body scroll is locked by the hide-others layer. The `'trap-focus'` tier keeps outside pointer events alive but still traps focus.
- `side` picks the anchored edge. Vertical sides (`top`/`bottom`) cap the panel at `calc(100dvh - 2rem)` so a long body scrolls inside the `content` slot instead of growing past the viewport; horizontal sides fill the viewport height and cap their width.
- Drag-to-dismiss uses pointer capture; `dismissible` (default `true`) allows releasing past `closeThreshold` to close. Set `false` to force explicit actions.
- Horizontal sides ship **vertical snap only** in this release — `snapPoints` resolves against the inline axis, so `left`/`right` snap behaviour is not yet supported.
- `snapPoints` accepts fractions (0–1), pixel values (> 1) or CSS length strings; `snapPoint` tracks the current level and is bound with `v-model:snap-point`.
- `handleOnly` restricts dragging to the handle; `fixed` keeps the panel in place while inner content scrolls.
- `swipeable` renders a gesture strip at the drawer's edge; it is inert while the drawer is open.
- `nested` renders via `DrawerRootNested`; each nested drawer coordinates drag and release with its parent.

### Migrating from `BottomSheet`

v0.50.0 renamed the whole family — the name `bottom-sheet` is retired.

| Before                                                                                 | After                                                              |
| :------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `SBottomSheet`                                                                         | `SDrawer`                                                          |
| `BottomSheetRoot` / `BottomSheetRootNested`                                            | `DrawerRoot` / `DrawerRootNested`                                  |
| `BottomSheetPopup` / `BottomSheetOverlay`                                              | `DrawerPopup` / `DrawerOverlay`                                    |
| `BottomSheetHandle` / `BottomSheetCompact`                                             | `DrawerHandle` / `DrawerCompact`                                   |
| `BottomSheetTitle` / `BottomSheetDescription`                                          | `DrawerTitle` / `DrawerDescription`                                |
| `BottomSheetHeader` / `BottomSheetContent` / `BottomSheetFooter`                       | `DrawerHeader` / `DrawerContent` / `DrawerFooter`                  |
| `BottomSheetTrigger` / `BottomSheetClose` / `BottomSheetCancel` / `BottomSheetConfirm` | `DrawerTrigger` / `DrawerClose` / `DrawerCancel` / `DrawerConfirm` |
| `v-model:active-snap-point`                                                            | `v-model:snap-point`                                               |
| `direction` prop (headless)                                                            | `side` prop                                                        |
| `@soybeanjs/headless/bottom-sheet`                                                     | `@soybeanjs/headless/drawer`                                       |
| `data-soybean-bottom-sheet-*`, `soybean-bottom-sheet-dragging`                         | `data-soybean-drawer-*`, `soybean-drawer-dragging`                 |
| `data-soybean-bottom-sheet-scale`                                                      | `data-soybean-drawer-scale`                                        |

The old `SDrawer` (a dialog with a side) was renamed to `SSheet`. See [Sheet](/components/sheet) for the side-panel API.

```vue
<!-- Before -->
<SBottomSheet v-model:open="open" v-model:active-snap-point="snap" :snap-points="[0.5, 1]">
  <template #trigger><SButton>Open</SButton></template>
  Content
</SBottomSheet>

<!-- After -->
<SDrawer v-model:open="open" v-model:snap-point="snap" :snap-points="[0.5, 1]">
  <template #trigger><SButton>Open</SButton></template>
  Content
</SDrawer>
```

### Roadmap

Horizontal snap points, and a `DrawerIndent`/`DrawerIndentBackground` pair for the Base UI indent animation.

## FAQ

### How do I anchor the drawer to a different edge?

Set `side` to `top`/`bottom`/`left`/`right`:

```vue
<SDrawer v-model:open="open" side="left" title="Filters">
  <template #trigger><SButton>Open</SButton></template>
  <div>Drawer content</div>
</SDrawer>
```

### How do I enable snap points?

Pass an array of fractions, pixels or CSS lengths, and bind the active level:

```vue
<SDrawer v-model:open="open" v-model:snap-point="snapPoint" :snap-points="[0.4, 0.8, 1]" title="Filters">
  <template #trigger><SButton>Open</SButton></template>
  <div>Drawer content</div>
</SDrawer>
```

### How do I open the drawer with a swipe gesture?

Set `swipeable`. An edge strip is rendered at the panel's `side` and swipes in the opposite direction:

```vue
<SDrawer v-model:open="open" swipeable title="Details">
  <template #trigger><SButton>Open</SButton></template>
  <div>Drawer content</div>
</SDrawer>
```

### How do I disable drag-to-dismiss?

Set `dismissible={false}` to require an explicit action:

```vue
<SDrawer :dismissible="false" title="Confirm">
  <template #trigger><SButton>Open</SButton></template>
  <div>Drawer content</div>
</SDrawer>
```

### How do I restrict dragging to the handle?

Set `handle-only`:

```vue
<SDrawer handle-only title="Details">
  <template #trigger><SButton>Open</SButton></template>
  <div>Drawer content</div>
</SDrawer>
```

### How do I build a non-modal side panel that still traps focus?

Use the `'trap-focus'` tier:

```vue
<SDrawer v-model:open="open" modal="trap-focus" title="Inspector">
  <template #trigger><SButton>Open</SButton></template>
  <div>Drawer content</div>
</SDrawer>
```
