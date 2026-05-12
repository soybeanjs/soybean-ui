# DropdownMenu

Source URL: https://ui.soybeanjs.cn/components/dropdown-menu
Markdown URL: https://ui.soybeanjs.cn/components/dropdown-menu.md
Category: Navigation
Description: Displays a menu to the user—such as a set of actions or functions—triggered by a button.

## Overview

Displays a menu to the user—such as a set of actions or functions—triggered by a button.

## Usage

Usage examples for dropdown-menu are rendered on the site.

## Demos

Interactive demos for dropdown-menu are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (26): DropdownMenu, DropdownMenuAnchor, DropdownMenuArrow, DropdownMenuCheckbox, DropdownMenuCheckboxCompact, DropdownMenuCheckboxGroup, DropdownMenuCheckboxItem, DropdownMenuCompact, DropdownMenuContent, DropdownMenuGroup, DropdownMenuGroupLabel, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuRadio, DropdownMenuRadioCompact, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuWrapper, DropdownMenuWrapperCompact.

### DropdownMenu

#### Props
Properties for the DropdownMenu component.
- `class`: class of menu popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DropdownMenuUi>`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `DropdownMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `DropdownMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `DropdownMenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `DropdownMenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `DropdownMenuSubTriggerProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `DropdownMenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `DropdownMenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
#### Emits
Events for the DropdownMenu component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `select`: Emitted when select occurs. (type `[item: MenuOptionData<T>, event: Event]`; parameters `item: MenuOptionData<T>, event: Event`)
#### Slots
Slots for the DropdownMenu component.
- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### DropdownMenuAnchor

- No documented props, emits, slots, or slot props were available.

### DropdownMenuArrow

- No documented props, emits, slots, or slot props were available.

### DropdownMenuCheckbox

#### Props
Properties for the DropdownMenuCheckbox component.
- `class`: class of menu popup (type `((string | false | Record<string, any> | ClassValue[]) & (string | false | Record<string, any> | import("vue").ClassV...`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DropdownMenuUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuCheckboxOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `DropdownMenuGroupLabelProps`; optional)
- `checkboxItemProps`: Properties forwarded to the checkbox item element. (type `DropdownMenuCheckboxItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `DropdownMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `DropdownMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DropdownMenuCheckbox component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)
- `select`: Emitted when select occurs. (type `[item: MenuCheckboxOptionData<T>, event: Event]`; parameters `item: MenuCheckboxOptionData<T>, event: Event`)
#### Slots
Slots for the DropdownMenuCheckbox component.
- `item`: Custom content for the item slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### DropdownMenuCheckboxCompact

#### Props
Properties for the DropdownMenuCheckboxCompact component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuCheckboxOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `DropdownMenuGroupLabelProps`; optional)
- `checkboxItemProps`: Properties forwarded to the checkbox item element. (type `DropdownMenuCheckboxItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `DropdownMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `DropdownMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DropdownMenuCheckboxCompact component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)
- `select`: Emitted when select occurs. (type `[item: MenuCheckboxOptionData<T>, event: Event]`; parameters `item: MenuCheckboxOptionData<T>, event: Event`)
#### Slots
Slots for the DropdownMenuCheckboxCompact component.
- `item`: Custom content for the item slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### DropdownMenuCheckboxGroup

- No documented props, emits, slots, or slot props were available.

### DropdownMenuCheckboxItem

- No documented props, emits, slots, or slot props were available.

### DropdownMenuCompact

#### Props
Properties for the DropdownMenuCompact component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `DropdownMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `DropdownMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `DropdownMenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `DropdownMenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `DropdownMenuSubTriggerProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `DropdownMenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `DropdownMenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
#### Emits
Events for the DropdownMenuCompact component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `select`: Emitted when select occurs. (type `[item: MenuOptionData<T>, event: Event]`; parameters `item: MenuOptionData<T>, event: Event`)
#### Slots
Slots for the DropdownMenuCompact component.
- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### DropdownMenuContent

#### Props
Properties for the DropdownMenuContent component.
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
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
- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
#### Emits
Events for the DropdownMenuContent component.
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### DropdownMenuGroup

- No documented props, emits, slots, or slot props were available.

### DropdownMenuGroupLabel

- No documented props, emits, slots, or slot props were available.

### DropdownMenuItem

- No documented props, emits, slots, or slot props were available.

### DropdownMenuItemIndicator

- No documented props, emits, slots, or slot props were available.

### DropdownMenuPortal

- No documented props, emits, slots, or slot props were available.

### DropdownMenuRadio

#### Props
Properties for the DropdownMenuRadio component.
- `class`: class of menu popup (type `((string | false | Record<string, any> | ClassValue[]) & (string | false | Record<string, any> | import("vue").ClassV...`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DropdownMenuUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuRadioOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `DropdownMenuGroupLabelProps`; optional)
- `radioItemProps`: Properties forwarded to the radio item element. (type `DropdownMenuRadioItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `DropdownMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `DropdownMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the radio item to check. Can be bound as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. (type `T`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DropdownMenuRadio component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Event handler called when the radio group value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)
- `select`: Emitted when select occurs. (type `[item: MenuRadioOptionData<T>, event: Event]`; parameters `item: MenuRadioOptionData<T>, event: Event`)
#### Slots
Slots for the DropdownMenuRadio component.
- `item`: Custom content for the item slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### DropdownMenuRadioCompact

#### Props
Properties for the DropdownMenuRadioCompact component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuRadioOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `DropdownMenuGroupLabelProps`; optional)
- `radioItemProps`: Properties forwarded to the radio item element. (type `DropdownMenuRadioItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `DropdownMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `DropdownMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the radio item to check. Can be bound as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. (type `T`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DropdownMenuRadioCompact component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Event handler called when the radio group value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)
- `select`: Emitted when select occurs. (type `[item: MenuRadioOptionData<T>, event: Event]`; parameters `item: MenuRadioOptionData<T>, event: Event`)
#### Slots
Slots for the DropdownMenuRadioCompact component.
- `item`: Custom content for the item slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### DropdownMenuRadioGroup

- No documented props, emits, slots, or slot props were available.

### DropdownMenuRadioItem

- No documented props, emits, slots, or slot props were available.

### DropdownMenuRoot

#### Props
Properties for the DropdownMenuRoot component.
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
#### Emits
Events for the DropdownMenuRoot component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)

### DropdownMenuSeparator

- No documented props, emits, slots, or slot props were available.

### DropdownMenuSub

- No documented props, emits, slots, or slot props were available.

### DropdownMenuSubContent

- No documented props, emits, slots, or slot props were available.

### DropdownMenuSubTrigger

- No documented props, emits, slots, or slot props were available.

### DropdownMenuTrigger

#### Props
Properties for the DropdownMenuTrigger component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### DropdownMenuWrapper

#### Props
Properties for the DropdownMenuWrapper component.
- `class`: class of menu popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DropdownMenuUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
#### Emits
Events for the DropdownMenuWrapper component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### DropdownMenuWrapperCompact

#### Props
Properties for the DropdownMenuWrapperCompact component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `DropdownMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `DropdownMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `DropdownMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `DropdownMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `DropdownMenuArrowProps`; optional)
- `trigger`: The trigger type of the dropdown menu. - `click`: The dropdown menu will be opened when the trigger is clicked. - `hover`: The dropdown menu will be opened when the trigger is hovered. (type `DropdownMenuTriggerType`; default `'click'`; optional)
- `delayDuration`: The duration from when the pointer enters the trigger until the dropdown menu gets opened. (type `number`; default `150`; optional)
- `skipDelayDuration`: How much time a user has to enter another trigger without incurring a delay again. (type `number`; default `300`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
#### Emits
Events for the DropdownMenuWrapperCompact component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
