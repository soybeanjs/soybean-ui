# Menu

Source URL: https://ui.soybeanjs.cn/components/menu
Markdown URL: https://ui.soybeanjs.cn/components/menu.md
Category: Navigation
Description: The Menu component family allows you to build complex nested menus, including dropdowns and context menus. It supports a data-driven approach using `SMenuOptions` for easy configuration of groups, submenus, checkboxes, and radio items.

## Overview

The Menu component family allows you to build complex nested menus, including dropdowns and context menus. It supports a data-driven approach using `SMenuOptions` for easy configuration of groups, submenus, checkboxes, and radio items.

## Components

- **SMenuOptions**: The main component for rendering a list of menu items from data.
- **SMenuOption**: A recursive component used internally by `SMenuOptions` (can be used standalone).
- **SMenuCheckboxOptions**: For rendering a group of checkbox items.
- **SMenuRadioOptions**: For rendering a group of radio items.

## Usage

### Data Driven Menu

Usage examples for menu are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (27): ContextMenuPopup, MenuAnchor, MenuArrow, MenuCheckboxGroup, MenuCheckboxItem, MenuCheckboxOptionsCompact, MenuCheckboxOptionsCompactSelect, MenuContent, MenuGroup, MenuGroupLabel, MenuItem, MenuItemIndicator, MenuOptionCompact, MenuOptionCompactSelect, MenuOptionsCompact, MenuPortal, MenuRadioGroup, MenuRadioItem, MenuRadioOptionsCompact, MenuRadioOptionsCompactSelect, MenuRoot, MenuSeparator, MenuShortcut, MenuSub, MenuSubContent, MenuSubTrigger, MenuTrigger.

### ContextMenuPopup

- No documented props, emits, slots, or slot props were available.

### MenuAnchor

- No documented props, emits, slots, or slot props were available.

### MenuArrow

- No documented props, emits, slots, or slot props were available.

### MenuCheckboxGroup

#### Props

Properties for the MenuCheckboxGroup component.

- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuCheckboxGroup component.

- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)

### MenuCheckboxItem

#### Props

Properties for the MenuCheckboxItem component.

- `modelValue`: The controlled checked state of the item. Can be used as `v-model`. (type `CheckedState`; optional)
- `value`: The value given as data when submitted with a `name`. (type `DefinedValue`; default `on`; optional)
- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `textValue`: Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br> Use this when the content is complex, or you have non-textual content inside. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuCheckboxItem component.

- `select`: Event handler called when the user selects an item (via mouse or keyboard). <br> Calling `event.preventDefault` in this handler will prevent the menu from closing when selecting that item. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Event handler called when the checked state of the item changes. (type `[value: CheckedState]`; parameters `value: CheckedState`)

### MenuCheckboxOptionsCompact

#### Props

Properties for the MenuCheckboxOptionsCompact component.

- `items`: Items rendered by the component. (type `MenuCheckboxOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `MenuGroupLabelProps`; optional)
- `checkboxItemProps`: Properties forwarded to the checkbox item element. (type `MenuCheckboxItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `MenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `MenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the checkbox. Can be bound with v-model. (type `T[]`; optional)
- `defaultValue`: The value of the checkbox when it is initially rendered. Use when you do not need to control its value. (type `T[]`; optional)
- `disabled`: When `true`, prevents the user from interacting with the checkboxes (type `boolean`; default `false`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuCheckboxOptionsCompact component.

- `update:modelValue`: Event handler called when the value of the checkbox group changes. (type `[value: T[]]`; parameters `value: T[]`)
- `select`: Emitted when select occurs. (type `[item: MenuCheckboxOptionData<T>, event: Event]`; parameters `item: MenuCheckboxOptionData<T>, event: Event`)

#### Slots

Slots for the MenuCheckboxOptionsCompact component.

- `item`: Custom content for the item slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuCheckboxOptionData<T>) => any) | undefined`)

### MenuCheckboxOptionsCompactSelect

#### Emits

Events for the MenuCheckboxOptionsCompactSelect component.

- `select`: Emitted when select occurs. (type `[item: MenuCheckboxOptionData<T>, event: Event]`; parameters `item: MenuCheckboxOptionData<T>, event: Event`)

### MenuContent

#### Props

Properties for the MenuContent component.

- `popupProps`: Properties forwarded to the popup element. (type `MenuPopupProps`; optional)
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

Events for the MenuContent component.

- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### MenuGroup

#### Props

Properties for the MenuGroup component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### MenuGroupLabel

- No documented props, emits, slots, or slot props were available.

### MenuItem

#### Props

Properties for the MenuItem component.

- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `textValue`: Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br> Use this when the content is complex, or you have non-textual content inside. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuItem component.

- `select`: Event handler called when the user selects an item (via mouse or keyboard). <br> Calling `event.preventDefault` in this handler will prevent the menu from closing when selecting that item. (type `[event: Event]`; parameters `event: Event`)

### MenuItemIndicator

#### Props

Properties for the MenuItemIndicator component.

- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### MenuOptionCompact

#### Props

Properties for the MenuOptionCompact component.

- `item`: Current item data. (type `MenuOptionData<T>`; required)
- `itemProps`: Properties forwarded to the item element. (type `MenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `MenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `MenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `MenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `MenuSubTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `MenuPortalProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `MenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `MenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)

#### Emits

Events for the MenuOptionCompact component.

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

Slots for the MenuOptionCompact component.

- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)

### MenuOptionCompactSelect

#### Emits

Events for the MenuOptionCompactSelect component.

- `select`: Emitted when select occurs. (type `[item: MenuOptionData<T>, event: Event]`; parameters `item: MenuOptionData<T>, event: Event`)

### MenuOptionsCompact

#### Props

Properties for the MenuOptionsCompact component.

- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `MenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `MenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `MenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `MenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `MenuSubTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `MenuPortalProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `MenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `MenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)

#### Emits

Events for the MenuOptionsCompact component.

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

Slots for the MenuOptionsCompact component.

- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)

### MenuPortal

- No documented props, emits, slots, or slot props were available.

### MenuRadioGroup

#### Props

Properties for the MenuRadioGroup component.

- `modelValue`: The controlled value of the radio item to check. Can be bound as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. (type `T`; optional)
- `disabled`: When `true`, prevents the user from interacting with radio items. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuRadioGroup component.

- `update:modelValue`: Event handler called when the radio group value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)

### MenuRadioItem

#### Props

Properties for the MenuRadioItem component.

- `value`: The value given as data when submitted with a `name`. (type `string | number | boolean`; required)
- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `textValue`: Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br> Use this when the content is complex, or you have non-textual content inside. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuRadioItem component.

- `select`: Event handler called when the user selects an item (via mouse or keyboard). <br> Calling `event.preventDefault` in this handler will prevent the menu from closing when selecting that item. (type `[event: Event]`; parameters `event: Event`)

### MenuRadioOptionsCompact

#### Props

Properties for the MenuRadioOptionsCompact component.

- `items`: Items rendered by the component. (type `MenuRadioOptionData<T>[]`; required)
- `groupLabelProps`: Properties forwarded to the group label element. (type `MenuGroupLabelProps`; optional)
- `radioItemProps`: Properties forwarded to the radio item element. (type `MenuRadioItemProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `MenuItemIndicatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `MenuSeparatorProps`; optional)
- `modelValue`: The controlled value of the radio item to check. Can be bound as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. (type `T`; optional)
- `disabled`: When `true`, prevents the user from interacting with radio items. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the MenuRadioOptionsCompact component.

- `update:modelValue`: Event handler called when the radio group value changes (type `[payload: Exclude<T, undefined>]`; parameters `payload: Exclude<T, undefined>`)
- `select`: Emitted when select occurs. (type `[item: MenuRadioOptionData<T>, event: Event]`; parameters `item: MenuRadioOptionData<T>, event: Event`)

#### Slots

Slots for the MenuRadioOptionsCompact component.

- `item`: Custom content for the item slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)
- `item-indicator-icon`: Custom content for the item indicator icon slot. (type `((props: MenuRadioOptionData<T>) => any) | undefined`)

### MenuRadioOptionsCompactSelect

#### Emits

Events for the MenuRadioOptionsCompactSelect component.

- `select`: Emitted when select occurs. (type `[item: MenuRadioOptionData<T>, event: Event]`; parameters `item: MenuRadioOptionData<T>, event: Event`)

### MenuRoot

#### Props

Properties for the MenuRoot component.

- `dir`: The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the MenuRoot component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)

### MenuSeparator

- No documented props, emits, slots, or slot props were available.

### MenuShortcut

#### Props

Properties for the MenuShortcut component.

- `symbolize`: Whether to convert the command value to symbol representation. (type `boolean`; default `true`; optional)

### MenuSub

#### Props

Properties for the MenuSub component.

- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)

#### Emits

Events for the MenuSub component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)

### MenuSubContent

#### Props

Properties for the MenuSubContent component.

- `loop`: Whether keyboard navigation should loop around (type `boolean`; default `false`; optional)
- `placement`: The placement of the floating element. If used, it will override the `side` and `align` props. (type `Placement`; default `undefined`; optional)
- `sideOffset`: The distance in pixels from the trigger. (type `number`; default `0`; optional)
- `arrowPadding`: The padding between the arrow and the edges of the content. If your content has border-radius, this will prevent it from overflowing the corners. (type `number`; default `0`; optional)
- `updatePositionStrategy`: Strategy to update the position of the floating element on every animation frame. (type `'always' | 'optimized'`; default `'optimized'`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `MenuPopupProps`; optional)
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

Events for the MenuSubContent component.

- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### MenuSubTrigger

#### Props

Properties for the MenuSubTrigger component.

- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `textValue`: Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br> Use this when the content is complex, or you have non-textual content inside. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### MenuTrigger

#### Props

Properties for the MenuTrigger component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
