# Popper

## Overview

The low-level floating primitive that anchors content to a trigger element with full trigger, open/close and dismiss behavior. `SPopper` composes the headless `PopperRoot`/`PopperTrigger`/`PopperAnchor`/`PopperPositioner`/`PopperPopup`/`PopperArrow`/`PopperSub` family (built on Floating UI) with the `popperVariants` style recipe (6 slots, 3 sizes).

Use popper directly when you need a custom floating surface with full control over triggering, nesting and dismissal. For common patterns prefer the higher-level components built on it: `popover` for rich non-critical content, `tooltip` for hover hints, `dropdown-menu`/`context-menu` for menus, `select`/`combobox` for form popups.

## Usage

<UsageCode component="popper" file="basic-click" />

## Features

- 🖱️ 3 trigger modes — `click`, `hover` and `contextmenu` (virtual point reference, touch long-press)
- ⏱️ Hover timing — per-root `openDelay`/`closeDelay` plus a `skipDelayDuration` window; sibling roots can share one window through `providePopperDelayGroup` (the floating-ui `FloatingDelayGroup` pattern)
- 🎯 Positioning — full popper `placement` control (12 directions) with collision avoidance, `collisionPadding` and `prioritizePosition`
- 🧱 Nested popups — `PopperSub`/`PopperSubTrigger` compose sub popups; Escape closes the deepest open layer first
- 📍 Flexible anchoring — `PopperAnchor` for a custom reference element, `useVirtualPointReference` for viewport points
- 🔽 Arrow — optional positioned arrow via `PopperArrow`
- 🧩 Headless/styled split — `PopperCompact` aggregates the primitives; `SPopper` only injects styles and forwards slots/events
- 📐 3 sizes — sm/md/lg `size`; per-slot `ui` overrides

## Component family

- `SPopper` (styled) — the entry wrapper; `popperVariants` recipe with dynamic slot forwarding
- `PopperRoot` (headless) — the state owner; `open` via `useControllableState`, `trigger`/delay timing, provides the root context
- `PopperTrigger` (headless) — the trigger element wired to the active trigger mode
- `PopperAnchor` (headless) — an optional custom reference element
- `PopperPositioner` / `PopperPositionerImpl` (headless) — the positioned, dismissable surface (outside interaction, Escape, focus restore, grace area)
- `PopperPopup` (headless) — the popup body
- `PopperArrow` (headless) — the positioned arrow
- `PopperSub` / `PopperSubTrigger` (headless) — nested popup composition
- `PopperPortal` (headless) — portal control (`to`, `disabled`)
- `PopperCompact` (headless) — the aggregated composite used by `SPopper`
- `PopperPositioningRoot` / `PopperPositioningPositioner` / `PopperPositioningPopup` (headless) — positioning-only primitives for domain layers that own their own interaction (used internally by Select / Combobox / Cascader / Autocomplete)
- `providePopperDelayGroup` (headless) — shares one skip-delay window between sibling popper roots
- `useVirtualPointReference` (headless) — anchors a popup to a virtual point (context menus)

## Demos

<PlaygroundGallery component="popper" />

## API

<ComponentApi component="popper" />

## Notes

### Architecture and benchmark differences

All primitives stay style-free and only the UI wrapper injects the `popperVariants` classes, mirroring radix-ui's headless/styled split. Radix `Popper` and Mantine `Popper` expose positioning/anchoring only — no trigger state machine, dismiss layer or hover timing; Ant Design, Element Plus and Naive UI keep their popper engine internal and ship no public primitive. SoybeanUI additionally folds in trigger modes, a dismissable positioner, hover grace area, delay groups, nested sub popups and a virtual reference hook, which is what lets `popover`/`tooltip`/`dropdown-menu`/`select` stay thin.

| Capability            | SoybeanUI | radix Popper | Mantine Popover | floating-ui |
| :-------------------- | :-------: | :----------: | :-------------: | :---------: |
| Headless/styled split |    ✅     |      ✅      |        —        |      —      |
| Trigger modes (3)     |    ✅     |      —       |        —        |      —      |
| Hover grace area      |    ✅     |      —       |        —        |     ✅      |
| Delay group           |    ✅     |      —       |        —        |     ✅      |
| Dismiss layer         |    ✅     |      —       |        —        |      —      |
| Nested sub popups     |    ✅     |      —       |        —        |      —      |
| Virtual reference     |    ✅     |      ✅      |        —        |     ✅      |

`—` = unsupported or a different interaction model.

### Cautions

- The popup has no default landmark role — set one through `popupProps`, e.g. `:popup-props="{ role: 'dialog' }"` and `aria-haspopup="dialog"` on the trigger.
- The popup renders through a `Portal` (teleported to `document.body`), so it escapes overflow containers; position it inside a relatively-positioned ancestor only with `portalProps: { disabled: true }`.
- On dismiss (outside interaction or Escape) focus is restored to the trigger.
- `update:open` reports the transition reason (e.g. `escape-key`, `outside-pointer`) — useful for logging or analytics in controlled usage.
- The `PopperPositioning*` primitives have no open state, trigger or dismissal of their own; they exist for domain layers (Select / Combobox / …) and are rarely needed in application code.

## FAQ

### How do I change the trigger mode?

Use the `trigger` prop — `click` (default), `hover` or `contextmenu`:

```vue
<SPopper trigger="hover" :open-delay="250" :close-delay="180">
  <template #trigger><button type="button">Hover or focus me</button></template>
</SPopper>
```

### How do I control the open state?

Bind `open` and listen to `update:open`; every transition reports an explicit reason:

```vue
<SPopper :open="open" @update:open="(value, reason) => (open = value)">
  <template #trigger><button type="button">Toggle</button></template>
</SPopper>
```

### How do I anchor the popup to an arbitrary element or point?

Wrap the element in `PopperAnchor`, or use `useVirtualPointReference` for a viewport point (context menus):

```vue
<PopperRoot>
  <PopperAnchor>…</PopperAnchor>
  <PopperPositioner>…</PopperPositioner>
</PopperRoot>
```

### How do I share the hover skip-delay between sibling poppers?

Call `providePopperDelayGroup` in a common ancestor's setup — sibling roots then open instantly inside the shared window:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { PopperRoot, providePopperDelayGroup } from '@soybeanjs/headless/popper';

providePopperDelayGroup({ skipDelayDuration: computed(() => 300) });
</script>

<template>
  <PopperRoot>…</PopperRoot>
</template>
```

### How do I keep the popup inside the viewport or escape an overflow container?

Tune the positioner with `collisionPadding` / `prioritizePosition`, and control the portal with `portalProps` (e.g. `{ to: 'body' }` or `{ disabled: true }`).
