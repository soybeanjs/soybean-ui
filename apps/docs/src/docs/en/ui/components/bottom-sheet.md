# Bottom Sheet

## Overview

A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog` (same headless dialog primitives), and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support.

`SBottomSheet` combines the headless dialog primitive family with the `bottomSheetVariants` style recipe (extends `drawerVariants`, adds a drag `handle`; 6 sizes).

## Usage

<UsageCode component="bottom-sheet" />

## Features

- 🧩 Reuses the dialog base — inherits `SDialog`'s slots, events, per-part `*Props`, `pure`, `isAlert` and title/description/footer contract
- 🖐️ Drag-to-dismiss — the `handle` (or the popup) can be dragged; release past the `closeThreshold` closes the sheet
- 📏 Snap points — `snapPoints` supports `fraction`/`height` snap levels for collapsible sheets
- 🎭 Background scale — `shouldScaleBackground`/`setBackgroundColorOnScale` scale and tint the page behind the sheet
- 🪜 Nested sheets — `nested` composes a `BottomSheetRootNested` for stacked sheets
- 🧲 Fixed — `fixed` pins the sheet while content scrolls; `handleOnly` restricts drag to the handle
- 🔘 Dialog footer — `showClose`/`showCancel`/`showConfirm` with localized `cancelText`/`confirmText`
- 📐 6 sizes — xs–2xl `size`; per-slot `ui` overrides
- ♿ Accessible — `role="dialog"`, focus moves into the popup, `axe-core` clean

## Component family

- `SBottomSheet` (styled) — the entry wrapper; `bottomSheetVariants` recipe with dynamic slot forwarding
- `BottomSheetRoot` / `BottomSheetRootNested` (headless) — the state owner; `open`, `snapPoints`, `dismissible`, `nested`, drag/scale state
- `BottomSheetOverlay` (headless) — the dimmed backdrop
- `BottomSheetPopup` (headless) — the focus-trapped, draggable, dismissable surface
- `BottomSheetHandle` (headless) — the grab handle
- `BottomSheetTrigger` / `BottomSheetHeader` / `BottomSheetContent` / `BottomSheetFooter` / `BottomSheetTitle` / `BottomSheetDescription` / `BottomSheetClose` / `BottomSheetCancel` / `BottomSheetConfirm` (headless) — chrome primitives wrapping Dialog; DOM uses `data-soybean-bottom-sheet-*`
- `BottomSheetCompact` (headless) — the aggregated composite; composes handle, header, content, footer and exposes the slots

## Demos

<PlaygroundGallery component="bottom-sheet" />

## API

<ComponentApi component="bottom-sheet" />

## Notes

### Architecture and benchmark differences

`BottomSheetCompact` owns the handle/overlay/popup/header/content/footer composition and the drag/snap/scale state flow (via `useSnapPoints`/`useScaleBackground`) while every primitive stays style-free and only the UI wrapper injects the `bottomSheetVariants` classes. This mirrors the vaul/radix-dialog headless split. Ant Design, Element Plus, Mantine and Naive UI ship a single styled drawer/modal; a dedicated draggable bottom-sheet with `snapPoints` is typically a separate library (vaul, @radix-ui/dialog + manual). SoybeanUI exposes per-slot `*Props`, a `size` scale, and the snap/scale/drag model inline.

| Capability            | SoybeanUI | shadcn/ui + vaul | Ant Design | Element Plus | Mantine | Naive UI |
| :-------------------- | :-------: | :--------------: | :--------: | :----------: | :-----: | :------: |
| Reuses dialog base    |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Headless/styled split |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Drag-to-dismiss       |    ✅     |        ✅        |     —      |      —       |   ✅    |    —     |
| Snap points           |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Background scale      |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Nested sheets         |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Sizes (6)             |    ✅     |        —         |     —      |      —       |    —    |    —     |

`—` = unsupported or a different interaction model.

### Cautions

- `modal` defaults to `true`; the popup teleports to `document.body` and body scroll is managed by the hide-others layer.
- Drag-to-dismiss uses pointer capture; `dismissible` (default `true`) enables releasing past the threshold to close. Set `false` to force explicit actions.
- `snapPoints` accepts an array of `fraction` (0–1) or `height` numbers; `activeSnapPoint` tracks the current snap level.
- `handleOnly` restricts dragging to the handle; `fixed` keeps the sheet in place while inner content scrolls.
- `nested` renders via `BottomSheetRootNested`; each nested sheet needs its own `BottomSheetProvider` context.

### Roadmap

N/A — bottom-sheet is feature-complete for the current parity set.

## FAQ

### How do I enable snap points?

Pass an array of `fraction` or `height` values:

```vue
<SBottomSheet :snap-points="[0.4, 0.8, 1]" title="Filters">
  <template #trigger><SButton>Open</SButton></template>
  <div>Sheet content</div>
</SBottomSheet>
```

### How do I disable drag-to-dismiss?

Set `dismissible={false}` to require an explicit action:

```vue
<SBottomSheet :dismissible="false" title="Confirm">
  <template #trigger><SButton>Open</SButton></template>
  <div>Sheet content</div>
</SBottomSheet>
```

### How do I restrict dragging to the handle?

Set `handle-only`:

```vue
<SBottomSheet handle-only title="Details">
  <template #trigger><SButton>Open</SButton></template>
  <div>Sheet content</div>
</SBottomSheet>
```

### How do I show a step-based confirmation?

Use `show-confirm`/`show-cancel` with the footer:

```vue
<SBottomSheet v-model:open="open" title="Delete?" confirm-text="Delete">
  <template #trigger><SButton danger>Delete</SButton></template>
  <div>This cannot be undone.</div>
</SBottomSheet>
```
