# ContextMenu

Source URL: https://ui.soybeanjs.cn/components/context-menu
Markdown URL: https://ui.soybeanjs.cn/components/context-menu.md
Category: Navigation
Description: Displays a menu located at the pointer, triggered by a right-click.

## Overview

Displays a menu located at the pointer, triggered by a right-click.

## Usage

Usage examples for context-menu are rendered on the site.

## Demos

Interactive demos for context-menu are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (26): ContextMenu, ContextMenuAnchor, ContextMenuArrow, ContextMenuCheckbox, ContextMenuCheckboxCompact, ContextMenuCheckboxGroup, ContextMenuCheckboxItem, ContextMenuCompact, ContextMenuContent, ContextMenuGroup, ContextMenuGroupLabel, ContextMenuItem, ContextMenuItemIndicator, ContextMenuPortal, ContextMenuRadio, ContextMenuRadioCompact, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuRoot, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, ContextMenuWrapper, ContextMenuWrapperCompact.

### ContextMenu

#### Props

Properties for the ContextMenu component.

- `class`: class of menu popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ContextMenuUi>`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `ContextMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `ContextMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ContextMenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `ContextMenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `ContextMenuSubTriggerProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `ContextMenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ContextMenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)

#### Emits

Events for the ContextMenu component.

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

Slots for the ContextMenu component.

- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### ContextMenuAnchor

- No documented props, emits, slots, or slot props were available.

### ContextMenuArrow

- No documented props, emits, slots, or slot props were available.

### ContextMenuCheckbox

#### Props

Properties for the ContextMenuCheckbox component.

- `class`: class of menu popup (type `((string | false | Record<string, any> | ClassValue[]) & (string | false | Record<string, any> | import("vue").ClassV...`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ContextMenuUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuCheckboxOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ContextMenuGroupLabelProps`; optional)
- `checkboxItemProps`: Properties forwarded to the checkbox item element. (type `ContextMenuCheckboxItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `ContextMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ContextMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ContextMenuCheckbox component.

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

Slots for the ContextMenuCheckbox component.

- `item`: Custom content for the item slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### ContextMenuCheckboxCompact

#### Props

Properties for the ContextMenuCheckboxCompact component.

- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuCheckboxOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ContextMenuGroupLabelProps`; optional)
- `checkboxItemProps`: Properties forwarded to the checkbox item element. (type `ContextMenuCheckboxItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `ContextMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ContextMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ContextMenuCheckboxCompact component.

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

Slots for the ContextMenuCheckboxCompact component.

- `item`: Custom content for the item slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### ContextMenuCheckboxGroup

- No documented props, emits, slots, or slot props were available.

### ContextMenuCheckboxItem

- No documented props, emits, slots, or slot props were available.

### ContextMenuCompact

#### Props

Properties for the ContextMenuCompact component.

- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `ContextMenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `ContextMenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ContextMenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `ContextMenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `ContextMenuSubTriggerProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `ContextMenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ContextMenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)

#### Emits

Events for the ContextMenuCompact component.

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

Slots for the ContextMenuCompact component.

- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### ContextMenuContent

#### Props

Properties for the ContextMenuContent component.

- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `placement`: The placement of the floating element. If used, it will override the `side` and `align` props. (type `Placement`; default `undefined`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `sideFlip`: Flip to the opposite side when colliding with boundary. (type `boolean`; default `true`; optional)
- `alignOffset`: An offset in pixels from the `start` or `end` alignment options. (type `number`; default `0`; optional)
- `alignFlip`: Flip alignment when colliding with boundary. May only occur when `prioritizePosition` is true. (type `boolean`; default `true`; optional)
- `avoidCollisions`: When `true`, overrides the side and align preferences to prevent collisions with boundary edges. (type `boolean`; default `true`; optional)
- `collisionBoundary`: The element used as the collision boundary. By default this is the viewport, though you can provide additional element(s) to be included in this check. (type `Element | (Element | null)[] | null`; default `[ ]`; optional)
- `collisionPadding`: The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: { top: 20, left: 20 }. (type `Padding`; default `0`; optional)
- `hideShiftedArrow`: When `true`, hides the arrow when it cannot be centered to the reference element. (type `boolean`; default `true`; optional)
- `sticky`: The sticky behavior on the align axis. `partial` will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless. (type `'partial' | 'always'`; default `'partial'`; optional)
- `hideWhenDetached`: Whether to hide the content when the trigger becomes fully occluded. (type `boolean`; default `false`; optional)
- `positionStrategy`: The type of CSS position property to use. (type `'fixed' | 'absolute'`; default `'fixed'`; optional)
- `disableUpdateOnLayoutShift`: Whether to disable the update position for the content when the layout shifted. (type `boolean`; default `false`; optional)
- `prioritizePosition`: Force content to be position within the viewport. Might overlap the reference element, which may not be desired. (type `boolean`; default `false`; optional)
- `reference`: The custom element or virtual element that will be set as the reference to position the floating element. If provided, it will replace the default anchor element. (type `ReferenceElement`; optional)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)

#### Emits

Events for the ContextMenuContent component.

- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### ContextMenuGroup

- No documented props, emits, slots, or slot props were available.

### ContextMenuGroupLabel

- No documented props, emits, slots, or slot props were available.

### ContextMenuItem

- No documented props, emits, slots, or slot props were available.

### ContextMenuItemIndicator

- No documented props, emits, slots, or slot props were available.

### ContextMenuPortal

- No documented props, emits, slots, or slot props were available.

### ContextMenuRadio

#### Props

Properties for the ContextMenuRadio component.

- `class`: class of menu popup (type `((string | false | Record<string, any> | ClassValue[]) & (string | false | Record<string, any> | import("vue").ClassV...`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ContextMenuUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuRadioOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ContextMenuGroupLabelProps`; optional)
- `radioItemProps`: Properties forwarded to the radio item element. (type `ContextMenuRadioItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `ContextMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ContextMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the radio item to check. Can be bound as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. (type `T`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ContextMenuRadio component.

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

Slots for the ContextMenuRadio component.

- `item`: Custom content for the item slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### ContextMenuRadioCompact

#### Props

Properties for the ContextMenuRadioCompact component.

- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `items`: Items rendered by the component. (type `MenuRadioOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ContextMenuGroupLabelProps`; optional)
- `radioItemProps`: Properties forwarded to the radio item element. (type `ContextMenuRadioItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `ContextMenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ContextMenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the radio item to check. Can be bound as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. (type `T`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ContextMenuRadioCompact component.

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

Slots for the ContextMenuRadioCompact component.

- `item`: Custom content for the item slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `() => any`)

### ContextMenuRadioGroup

- No documented props, emits, slots, or slot props were available.

### ContextMenuRadioItem

- No documented props, emits, slots, or slot props were available.

### ContextMenuRoot

#### Props

Properties for the ContextMenuRoot component.

- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the ContextMenuRoot component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)

### ContextMenuSeparator

- No documented props, emits, slots, or slot props were available.

### ContextMenuSub

- No documented props, emits, slots, or slot props were available.

### ContextMenuSubContent

- No documented props, emits, slots, or slot props were available.

### ContextMenuSubTrigger

- No documented props, emits, slots, or slot props were available.

### ContextMenuTrigger

#### Props

Properties for the ContextMenuTrigger component.

- `reference`: The reference element for the context menu trigger. (type `HTMLElement | null`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ContextMenuWrapper

#### Props

Properties for the ContextMenuWrapper component.

- `class`: class of menu popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ContextMenuUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the ContextMenuWrapper component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### ContextMenuWrapperCompact

#### Props

Properties for the ContextMenuWrapperCompact component.

- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ContextMenuTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ContextMenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ContextMenuContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `ContextMenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `ContextMenuArrowProps`; optional)
- `pressOpenDelay`: The duration from when the trigger is pressed until the menu opens. (type `number`; default `700`; optional)
- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the ContextMenuWrapperCompact component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
