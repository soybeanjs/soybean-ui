# Tooltip

Source URL: https://ui.soybeanjs.cn/components/tooltip
Markdown URL: https://ui.soybeanjs.cn/components/tooltip.md
Category: Overlay
Description: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Overview

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Usage

Usage examples for tooltip are rendered on the site.

## Demos

Interactive demos for tooltip are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (9): Tooltip, TooltipArrow, TooltipCompact, TooltipPopup, TooltipPortal, TooltipPositioner, TooltipProvider, TooltipRoot, TooltipTrigger.

### Tooltip

#### Props

Properties for the Tooltip component.

- `class`: class of popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<TooltipUi>`; optional)
- `content`: Content. (type `string`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopperAnchorProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `TooltipPortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `TooltipPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `TooltipPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `TooltipArrowProps`; optional)
- `defaultOpen`: The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the tooltip. (type `boolean`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableHoverableContent`: When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. (type `boolean`; default `false`; optional)
- `disableClosingTrigger`: When `true`, clicking on trigger will not close the content. (type `boolean`; default `false`; optional)
- `disabled`: When `true`, disable tooltip (type `boolean`; default `false`; optional)
- `ignoreNonKeyboardFocus`: Prevent the tooltip from opening if the focus did not come from the keyboard by matching against the `:focus-visible` selector. This is useful if you want to avoid opening it when switching browser tabs or closing a dialog. (type `boolean`; default `false`; optional)

#### Emits

Events for the Tooltip component.

- `update:open`: Event handler called when the open state of the tooltip changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)

#### Slots

Slots for the Tooltip component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `(() => any) | undefined`)

### TooltipArrow

- No documented props, emits, slots, or slot props were available.

### TooltipCompact

#### Props

Properties for the TooltipCompact component.

- `content`: Content. (type `string`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopperAnchorProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `TooltipPortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `TooltipPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `TooltipPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `TooltipArrowProps`; optional)
- `defaultOpen`: The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the tooltip. (type `boolean`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableHoverableContent`: When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. (type `boolean`; default `false`; optional)
- `disableClosingTrigger`: When `true`, clicking on trigger will not close the content. (type `boolean`; default `false`; optional)
- `disabled`: When `true`, disable tooltip (type `boolean`; default `false`; optional)
- `ignoreNonKeyboardFocus`: Prevent the tooltip from opening if the focus did not come from the keyboard by matching against the `:focus-visible` selector. This is useful if you want to avoid opening it when switching browser tabs or closing a dialog. (type `boolean`; default `false`; optional)

#### Emits

Events for the TooltipCompact component.

- `update:open`: Event handler called when the open state of the tooltip changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)

#### Slots

Slots for the TooltipCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `(() => any) | undefined`)

### TooltipPopup

#### Props

Properties for the TooltipPopup component.

- `ariaLabel`: By default, screen readers will announce the content inside the component. If this is not descriptive enough, or you have content that cannot be announced, use `aria-label` as a more descriptive label. (type `string`; optional)

### TooltipPortal

- No documented props, emits, slots, or slot props were available.

### TooltipPositioner

#### Props

Properties for the TooltipPositioner component.

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

Events for the TooltipPositioner component.

- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)

### TooltipProvider

#### Props

Properties for the TooltipProvider component.

- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableHoverableContent`: When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. (type `boolean`; default `false`; optional)
- `disableClosingTrigger`: When `true`, clicking on trigger will not close the content. (type `boolean`; default `false`; optional)
- `disabled`: When `true`, disable tooltip (type `boolean`; default `false`; optional)
- `ignoreNonKeyboardFocus`: Prevent the tooltip from opening if the focus did not come from the keyboard by matching against the `:focus-visible` selector. This is useful if you want to avoid opening it when switching browser tabs or closing a dialog. (type `boolean`; default `false`; optional)
- `positionerProps`: Props to be passed down to the positioner. Useful when you need to control the positioner, such as disabling it when the trigger is disabled. (type `TooltipPositionerProps`; optional)

### TooltipRoot

#### Props

Properties for the TooltipRoot component.

- `defaultOpen`: The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the tooltip. (type `boolean`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the tooltip gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `disableHoverableContent`: When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. (type `boolean`; default `false`; optional)
- `disableClosingTrigger`: When `true`, clicking on trigger will not close the content. (type `boolean`; default `false`; optional)
- `disabled`: When `true`, disable tooltip (type `boolean`; default `false`; optional)
- `ignoreNonKeyboardFocus`: Prevent the tooltip from opening if the focus did not come from the keyboard by matching against the `:focus-visible` selector. This is useful if you want to avoid opening it when switching browser tabs or closing a dialog. (type `boolean`; default `false`; optional)
- `positionerProps`: Props to be passed down to the positioner. Useful when you need to control the positioner, such as disabling it when the trigger is disabled. (type `TooltipPositionerProps`; optional)

#### Emits

Events for the TooltipRoot component.

- `update:open`: Event handler called when the open state of the tooltip changes. (type `[value: boolean]`; parameters `value: boolean`)

### TooltipTrigger

- No documented props, emits, slots, or slot props were available.
