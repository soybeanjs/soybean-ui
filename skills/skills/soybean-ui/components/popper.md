# Popper

Source URL: https://ui.soybeanjs.cn/components/popper
Markdown URL: https://ui.soybeanjs.cn/components/popper.md
Category: Overlay
Description: The low-level floating primitive that anchors content to a trigger element with full trigger, open/close and dismiss behavior. `SPopper` composes the headless `PopperRoot`/`PopperTrigger`/`PopperAnchor`/`PopperPositioner`/`PopperPopup`/`PopperArrow`/`PopperSub` family (built on Floating UI) with the `popperVariants` style recipe (6 slots, 3 sizes).

## Overview

The low-level floating primitive that anchors content to a trigger element with full trigger, open/close and dismiss behavior. `SPopper` composes the headless `PopperRoot`/`PopperTrigger`/`PopperAnchor`/`PopperPositioner`/`PopperPopup`/`PopperArrow`/`PopperSub` family (built on Floating UI) with the `popperVariants` style recipe (6 slots, 3 sizes).

Use popper directly when you need a custom floating surface with full control over triggering, nesting and dismissal. For common patterns prefer the higher-level components built on it: `popover` for rich non-critical content, `tooltip` for hover hints, `dropdown-menu`/`context-menu` for menus, `select`/`combobox` for form popups.

## Usage

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

Interactive demos for popper are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (15): Popper, PopperAnchor, PopperArrow, PopperCompact, PopperPopup, PopperPortal, PopperPositioner, PopperPositionerImpl, PopperPositioningPopup, PopperPositioningPositioner, PopperPositioningRoot, PopperRoot, PopperSub, PopperSubTrigger, PopperTrigger.

### Popper

#### Props

Properties for the Popper component.

- `class`: class of popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `PopperSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<PopperUi>`; optional)
- `trigger`: No description. (type `PopperTriggerType`; optional)
- `openDelay`: No description. (type `number`; optional)
- `closeDelay`: No description. (type `number`; optional)
- `skipDelayDuration`: No description. (type `number`; optional)
- `pressOpenDelay`: No description. (type `number`; optional)
- `openOnFocus`: No description. (type `boolean`; optional)
- `placement`: No description. (type `Placement`; optional)
- `showArrow`: No description. (type `boolean`; optional)
- `triggerProps`: No description. (type `PopperTriggerProps`; optional)
- `portalProps`: No description. (type `PopperPortalProps`; optional)
- `positionerProps`: No description. (type `PopperPositionerProps`; optional)
- `popupProps`: No description. (type `PopperPopupProps`; optional)
- `arrowProps`: No description. (type `PopperArrowProps`; optional)
- `dir`: No description. (type `Direction`; optional)
- `open`: No description. (type `boolean`; optional)
- `defaultOpen`: No description. (type `boolean`; optional)
- `modal`: No description. (type `boolean`; optional)
- `disabled`: No description. (type `boolean`; optional)

#### Emits

Events for the Popper component.

- `update:open`: No description. (type `[value: boolean, reason: PopperOpenChangeReason]`; parameters `value: boolean, reason: PopperOpenChangeReason`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: No description. (type `[]`)

#### Slots

Slots for the Popper component.

- `default`: No description. (type `((props: PopperRootSlotProps) => VNodeChild) | undefined`)
- `trigger`: No description. (type `(() => VNodeChild) | undefined`)

### PopperAnchor

#### Props

Properties for the anchor (reference) element, optionally overriding the reference.

- `reference`: No description. (type `ReferenceElement`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### PopperArrow

- No documented props, emits, slots, or slot props were available.

### PopperCompact

#### Props

- `trigger`: No description. (type `PopperTriggerType`; optional)
- `openDelay`: No description. (type `number`; optional)
- `closeDelay`: No description. (type `number`; optional)
- `skipDelayDuration`: No description. (type `number`; optional)
- `pressOpenDelay`: No description. (type `number`; optional)
- `openOnFocus`: No description. (type `boolean`; optional)
- `placement`: No description. (type `Placement`; optional)
- `showArrow`: No description. (type `boolean`; optional)
- `triggerProps`: No description. (type `PopperTriggerProps`; optional)
- `portalProps`: No description. (type `PopperPortalProps`; optional)
- `positionerProps`: No description. (type `PopperPositionerProps`; optional)
- `popupProps`: No description. (type `PopperPopupProps`; optional)
- `arrowProps`: No description. (type `PopperArrowProps`; optional)
- `dir`: No description. (type `Direction`; optional)
- `open`: No description. (type `boolean`; optional)
- `defaultOpen`: No description. (type `boolean`; optional)
- `modal`: No description. (type `boolean`; optional)
- `disabled`: No description. (type `boolean`; optional)

#### Emits

- `update:open`: No description. (type `[value: boolean, reason: PopperOpenChangeReason]`; parameters `value: boolean, reason: PopperOpenChangeReason`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: No description. (type `[]`)

#### Slots

- `default`: No description. (type `((props: PopperRootSlotProps) => VNodeChild) | undefined`)
- `trigger`: No description. (type `(() => VNodeChild) | undefined`)

### PopperPopup

- No documented props, emits, slots, or slot props were available.

### PopperPortal

#### Props

- `to`: Vue native teleport component prop `:to` {@link https://vuejs.org/guide/built-ins/teleport.html#basic-usage} (type `string | HTMLElement`; optional)
- `disabled`: Disable teleport and render the component inline {@link https://vuejs.org/guide/built-ins/teleport.html#disabling-teleport} (type `boolean`; optional)
- `defer`: Defer the resolving of a Teleport target until other parts of the application have mounted (requires Vue 3.5.0+) {@link https://vuejs.org/guide/built-ins/teleport.html#deferred-teleport} (type `boolean`; optional)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

### PopperPositioner

#### Props

Properties for the positioner that floats above the anchor. Mirrors the positioning surface of
the headless `PopperPositioner` with the prototype's own defaults.

- `placement`: The placement of the floating element. If used, it will override the `side` and `align` props. (type `Placement`; default `undefined`; optional)
- `side`: The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled. (type `Side`; default `'bottom'`; optional)
- `sideOffset`: The distance in pixels from the trigger. (type `number`; default `0`; optional)
- `sideFlip`: Flip to the opposite side when colliding with boundary. (type `boolean`; default `true`; optional)
- `align`: The preferred alignment against the trigger. May change when collisions occur. (type `Align`; default `'center'`; optional)
- `alignOffset`: An offset in pixels from the `start` or `end` alignment options. (type `number`; default `0`; optional)
- `alignFlip`: Flip alignment when colliding with boundary. May only occur when `prioritizePosition` is true. (type `boolean`; default `true`; optional)
- `avoidCollisions`: When `true`, overrides the side and align preferences to prevent collisions with boundary edges. (type `boolean`; default `true`; optional)
- `collisionBoundary`: The element used as the collision boundary. By default this is the viewport, though you can provide additional element(s) to be included in this check. (type `Element | (Element | null)[] | null`; default `[ ]`; optional)
- `collisionPadding`: The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: { top: 20, left: 20 }. (type `Padding`; default `0`; optional)
- `arrowPadding`: The padding between the arrow and the edges of the content. If your content has border-radius, this will prevent it from overflowing the corners. (type `number`; default `0`; optional)
- `hideShiftedArrow`: When `true`, hides the arrow when it cannot be centered to the reference element. (type `boolean`; default `true`; optional)
- `sticky`: The sticky behavior on the align axis. `partial` will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless. (type `'partial' | 'always'`; default `'partial'`; optional)
- `hideWhenDetached`: Whether to hide the content when the trigger becomes fully occluded. (type `boolean`; default `false`; optional)
- `positionStrategy`: The type of CSS position property to use. (type `'fixed' | 'absolute'`; default `'fixed'`; optional)
- `updatePositionStrategy`: Strategy to update the position of the floating element on every animation frame. (type `'always' | 'optimized'`; default `'optimized'`; optional)
- `disableUpdateOnLayoutShift`: Whether to disable the update position for the content when the layout shifted. (type `boolean`; default `false`; optional)
- `prioritizePosition`: Force content to be position within the viewport. Might overlap the reference element, which may not be desired. (type `boolean`; default `false`; optional)
- `reference`: The custom element or virtual element that will be set as the reference to position the floating element. If provided, it will replace the default anchor element. (type `ReferenceElement`; optional)
- `trapFocus`: Whether focus is trapped inside the popup while open (Tab cycles within the layer and body scroll is locked for modal layers). (type `boolean`; default `modal`; optional)
- `disableHoverableContent`: When `true`, hovering the popup closes instead of keeping it open (the grace area is disabled, so leaving the trigger closes the layer immediately). (type `boolean`; default `false`; optional)
- `onGracePointerExit`: Callback invoked when the pointer finally leaves the grace area. Lets an upper layer (e.g. Tooltip) run area-scoped close logic without registering its own second grace area. (type `(() => void)`; optional)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

#### Emits

- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: No description. (type `[]`)

### PopperPositionerImpl

- No documented props, emits, slots, or slot props were available.

### PopperPositioningPopup

- No documented props, emits, slots, or slot props were available.

### PopperPositioningPositioner

#### Props

Properties for the positioning-only positioner. Same positioning surface as
`PopperPositionerProps` minus the interactive-shell concerns (presence, focus trap,
hoverable content) plus an `open` input the domain layer wires to its own state.
Fields are spelled out (not `Omit`) so the SFC compiler can resolve runtime props keys.

- `open`: Whether the floating layer is open. Drives the positioning lifecycle (`isPositioned` resets when open flips); the positioning primitive itself has no open state, so consumers wire their own open state here. (type `boolean`; default `true`; optional)
- `placement`: The placement of the floating element. If used, it will override the `side` and `align` props. (type `Placement`; default `undefined`; optional)
- `side`: The preferred side of the anchor to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled. (type `Side`; default `'bottom'`; optional)
- `sideOffset`: The distance in pixels from the anchor. (type `number`; default `0`; optional)
- `sideFlip`: Flip to the opposite side when colliding with boundary. (type `boolean`; default `true`; optional)
- `align`: The preferred alignment against the anchor. May change when collisions occur. (type `Align`; default `'center'`; optional)
- `alignOffset`: An offset in pixels from the `start` or `end` alignment options. (type `number`; default `0`; optional)
- `alignFlip`: Flip alignment when colliding with boundary. May only occur when `prioritizePosition` is true. (type `boolean`; default `true`; optional)
- `avoidCollisions`: When `true`, overrides the side and align preferences to prevent collisions with boundary edges. (type `boolean`; default `true`; optional)
- `collisionBoundary`: The element used as the collision boundary. By default this is the viewport, though you can provide additional element(s) to be included in this check. (type `Element | (Element | null)[] | null`; default `[ ]`; optional)
- `collisionPadding`: The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: { top: 20, left: 20 }. (type `Padding`; default `0`; optional)
- `arrowPadding`: The padding between the arrow and the edges of the content. If your content has border-radius, this will prevent it from overflowing the corners. (type `number`; default `0`; optional)
- `hideShiftedArrow`: When `true`, hides the arrow when it cannot be centered to the reference element. (type `boolean`; default `false`; optional)
- `sticky`: The sticky behavior on the align axis. `partial` will keep the content in the boundary as long as the anchor is at least partially in the boundary whilst "always" will keep the content in the boundary regardless. (type `'partial' | 'always'`; default `'partial'`; optional)
- `hideWhenDetached`: Whether to hide the content when the anchor becomes fully occluded. (type `boolean`; default `false`; optional)
- `positionStrategy`: The type of CSS position property to use. (type `'fixed' | 'absolute'`; default `'fixed'`; optional)
- `updatePositionStrategy`: Strategy to update the position of the floating element on every animation frame. (type `'always' | 'optimized'`; default `'optimized'`; optional)
- `disableUpdateOnLayoutShift`: Whether to disable the update position for the content when the layout shifted. (type `boolean`; default `false`; optional)
- `prioritizePosition`: Force content to be position within the viewport. Might overlap the reference element, which may not be desired. (type `boolean`; default `false`; optional)
- `reference`: The custom element or virtual element that will be set as the reference to position the floating element. If provided, it will replace the default anchor element. (type `ReferenceElement`; optional)

#### Emits

- `placed`: Event handler called when the positioner is placed (type `[]`)

### PopperPositioningRoot

#### Props

Properties for the positioning-only root. The positioning primitives have no open state,
trigger, or dismissal of their own — domain layers (Select / Combobox / Cascader / …)
own the interaction and mount these parts purely for floating placement.

- `dir`: The direction of the content. Used for RTL-aware rendering of the popup. (type `Direction`; optional)

### PopperRoot

#### Props

- `dir`: No description. (type `Direction`; optional)
- `open`: No description. (type `boolean`; optional)
- `defaultOpen`: No description. (type `boolean`; optional)
- `modal`: No description. (type `boolean`; optional)
- `disabled`: No description. (type `boolean`; optional)

#### Emits

- `update:open`: No description. (type `[value: boolean, reason: PopperOpenChangeReason]`; parameters `value: boolean, reason: PopperOpenChangeReason`)

#### Slots

- `default`: No description. (type `((props: PopperRootSlotProps) => VNodeChild) | undefined`)

#### Slot Props

- `open`: No description. (type `boolean`; required)
- `reason`: No description. (type `'trigger-click' | 'trigger-hover' | 'trigger-contextmenu' | 'trigger-focus' | 'dismiss-outside' | 'dismiss-escape' | ...`; required)
- `close`: No description. (type `() => void`; required)
- `dir`: No description. (type `'ltr' | 'rtl'`; required)

### PopperSub

#### Props

- `dir`: No description. (type `Direction`; optional)
- `open`: No description. (type `boolean`; optional)
- `defaultOpen`: No description. (type `boolean`; optional)
- `modal`: No description. (type `boolean`; optional)
- `disabled`: No description. (type `boolean`; optional)

#### Emits

- `update:open`: No description. (type `[value: boolean, reason: PopperOpenChangeReason]`; parameters `value: boolean, reason: PopperOpenChangeReason`)

#### Slots

- `default`: No description. (type `((props: PopperRootSlotProps) => VNodeChild) | undefined`)

### PopperSubTrigger

#### Props

- `trigger`: No description. (type `PopperTriggerType`; optional)
- `reference`: No description. (type `ReferenceElement`; optional)
- `openDelay`: No description. (type `number`; optional)
- `closeDelay`: No description. (type `number`; optional)
- `skipDelayDuration`: No description. (type `number`; optional)
- `pressOpenDelay`: No description. (type `number`; optional)
- `openOnFocus`: No description. (type `boolean`; optional)
- `focusOpenDelay`: Open delay applied to focus-driven opens. Defaults to `openDelay`; set `0` to open instantly on focus (Tooltip semantics). (type `number`; default `inherit from `openDelay``; optional)
- `focusVisibleOnly`: When `true`, focus-driven opening only responds to keyboard/programmatic focus (`:focus-visible`), ignoring pointer-derived focus. (type `boolean`; default `false`; optional)
- `ariaMode`: How the trigger references its popup for assistive technology. - `controls`: `aria-expanded` + `aria-controls` (expandable widgets: popover / menu) - `describedby`: `aria-describedby` while open (tooltip-like descriptions) - `none`: no popup-reference attributes (type `PopperTriggerAriaMode`; default `'controls'`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### PopperTrigger

#### Props

- `trigger`: No description. (type `PopperTriggerType`; optional)
- `reference`: No description. (type `ReferenceElement`; optional)
- `openDelay`: No description. (type `number`; optional)
- `closeDelay`: No description. (type `number`; optional)
- `skipDelayDuration`: No description. (type `number`; optional)
- `pressOpenDelay`: No description. (type `number`; optional)
- `openOnFocus`: No description. (type `boolean`; optional)
- `focusOpenDelay`: Open delay applied to focus-driven opens. Defaults to `openDelay`; set `0` to open instantly on focus (Tooltip semantics). (type `number`; default `inherit from `openDelay``; optional)
- `focusVisibleOnly`: When `true`, focus-driven opening only responds to keyboard/programmatic focus (`:focus-visible`), ignoring pointer-derived focus. (type `boolean`; default `false`; optional)
- `ariaMode`: How the trigger references its popup for assistive technology. - `controls`: `aria-expanded` + `aria-controls` (expandable widgets: popover / menu) - `describedby`: `aria-describedby` while open (tooltip-like descriptions) - `none`: no popup-reference attributes (type `PopperTriggerAriaMode`; default `'controls'`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

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
<template #trigger><button type="button">Hover or focus me</button></template>
```

### How do I control the open state?

Bind `open` and listen to `update:open`; every transition reports an explicit reason:

```vue
<SPopper :open="open" @update:open="(value, reason) => (open = value)">
  <template #trigger><button type="button">Toggle</button></template>

```

### How do I anchor the popup to an arbitrary element or point?

Wrap the element in `PopperAnchor`, or use `useVirtualPointReference` for a viewport point (context menus):

```vue
<PopperAnchor>…</PopperAnchor>
<PopperPositioner>…</PopperPositioner>
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
