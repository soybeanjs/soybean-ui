# Hover Card

Source URL: https://ui.soybeanjs.cn/components/hover-card
Markdown URL: https://ui.soybeanjs.cn/components/hover-card.md
Category: Overlay
Description: Displays a richer preview card when the trigger is hovered or receives focus.

## Overview

Displays a richer preview card when the trigger is hovered or receives focus.

## Usage

Usage examples for hover-card are rendered on the site.

## Demo

Interactive demos for hover-card are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (8): HoverCard, HoverCardArrow, HoverCardCompact, HoverCardPopup, HoverCardPortal, HoverCardPositioner, HoverCardRoot, HoverCardTrigger.

### HoverCard

#### Props
Properties for the HoverCard component.
- `class`: class of popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<HoverCardUi>`; optional)
- `placement`: Placement. (type `import("@/index").Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopperAnchorProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `HoverCardPortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `HoverCardPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `HoverCardPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `HoverCardArrowProps`; optional)
- `defaultOpen`: The open state of the hover card when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the hover card. (type `boolean`; optional)
- `openDelay`: The duration from when the pointer enters the trigger until the hover card opens. (type `number`; optional)
- `closeDelay`: The duration from when the pointer leaves the trigger or popup until the hover card closes. (type `number`; optional)
#### Emits
Events for the HoverCard component.
- `update:open`: Event handler called when the open state of the hover card changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
#### Slots
Slots for the HoverCard component.
- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `(() => any) | undefined`)

### HoverCardArrow

- No documented props, emits, slots, or slot props were available.

### HoverCardCompact

#### Props
Properties for the HoverCardCompact component.
- `placement`: Placement. (type `import("@/index").Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopperAnchorProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `HoverCardPortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `HoverCardPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `HoverCardPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `HoverCardArrowProps`; optional)
- `defaultOpen`: The open state of the hover card when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the hover card. (type `boolean`; optional)
- `openDelay`: The duration from when the pointer enters the trigger until the hover card opens. (type `number`; optional)
- `closeDelay`: The duration from when the pointer leaves the trigger or popup until the hover card closes. (type `number`; optional)
#### Emits
Events for the HoverCardCompact component.
- `update:open`: Event handler called when the open state of the hover card changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
#### Slots
Slots for the HoverCardCompact component.
- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `(() => any) | undefined`)

### HoverCardPopup

- No documented props, emits, slots, or slot props were available.

### HoverCardPortal

- No documented props, emits, slots, or slot props were available.

### HoverCardPositioner

#### Props
Properties for the HoverCardPositioner component.
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
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
#### Emits
Events for the HoverCardPositioner component.
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)

### HoverCardRoot

#### Props
Properties for the HoverCardRoot component.
- `defaultOpen`: The open state of the hover card when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the hover card. (type `boolean`; optional)
- `openDelay`: The duration from when the pointer enters the trigger until the hover card opens. (type `number`; optional)
- `closeDelay`: The duration from when the pointer leaves the trigger or popup until the hover card closes. (type `number`; optional)
#### Emits
Events for the HoverCardRoot component.
- `update:open`: Event handler called when the open state of the hover card changes. (type `[value: boolean]`; parameters `value: boolean`)

### HoverCardTrigger

- No documented props, emits, slots, or slot props were available.
