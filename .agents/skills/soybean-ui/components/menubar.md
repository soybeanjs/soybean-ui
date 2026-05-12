# Menubar

Source URL: https://ui.soybeanjs.cn/components/menubar
Markdown URL: https://ui.soybeanjs.cn/components/menubar.md
Category: Navigation
Description: Displays a persistent application-style menu bar with horizontal trigger navigation, nested menus, and keyboard roving focus.

## Overview

Displays a persistent application-style menu bar with horizontal trigger navigation, nested menus, and keyboard roving focus.

## Usage

Usage examples for menubar are rendered on the site.

## Demos

Interactive demos for menubar are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (20): Menubar, MenubarArrow, MenubarCheckboxGroup, MenubarCheckboxItem, MenubarCompact, MenubarContent, MenubarGroup, MenubarGroupLabel, MenubarItem, MenubarItemIndicator, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarRoot, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger.

### Menubar

#### Props
Properties for the Menubar component.
- `class`: class of menubar root (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<MenubarUi>`; optional)
- `indicatorPosition`: Indicator position. (type `AlignSide`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `MenubarTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `MenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `MenubarContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `MenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `MenuArrowProps`; optional)
- `modelValue`: The controlled value of the menu to open. Can be used as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the menu that should be open when initially rendered. (type `T`; optional)
- `dir`: The reading direction of the menubar when applicable. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation loops from last trigger to first and vice versa. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `MenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `MenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `MenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `MenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `MenuSubTriggerProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `MenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `MenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
#### Emits
Events for the Menubar component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: T]`; parameters `value: T`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `select`: Emitted when select occurs. (type `[item: MenuOptionData<T>, event: Event]`; parameters `item: MenuOptionData<T>, event: Event`)
#### Slots
Slots for the Menubar component.
- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `(data: { item: MenuOptionData<T>; }) => any`; parameters `data: { item: MenuOptionData<T>; }`)

### MenubarArrow

- No documented props, emits, slots, or slot props were available.

### MenubarCheckboxGroup

- No documented props, emits, slots, or slot props were available.

### MenubarCheckboxItem

- No documented props, emits, slots, or slot props were available.

### MenubarCompact

#### Props
Properties for the MenubarCompact component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `MenubarTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `MenuPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `MenubarContentProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `MenuPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `MenuArrowProps`; optional)
- `modelValue`: The controlled value of the menu to open. Can be used as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the menu that should be open when initially rendered. (type `T`; optional)
- `dir`: The reading direction of the menubar when applicable. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation loops from last trigger to first and vice versa. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `items`: Items rendered by the component. (type `MenuOptionData<T>[]`; required)
- `activeValue`: The active value of the menu. (type `T`; optional)
- `itemProps`: Properties forwarded to the item element. (type `MenuItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `LinkProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `MenuGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `MenuGroupLabelProps`; optional)
- `subProps`: Properties forwarded to the sub element. (type `MenuSubProps`; optional)
- `subTriggerProps`: Properties forwarded to the sub trigger element. (type `MenuSubTriggerProps`; optional)
- `subContentProps`: Properties forwarded to the sub content element. (type `MenuSubContentProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `MenuSeparatorProps`; optional)
- `shortcutProps`: Properties forwarded to the shortcut element. (type `MenuShortcutProps`; optional)
#### Emits
Events for the MenubarCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: T]`; parameters `value: T`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `select`: Emitted when select occurs. (type `[item: MenuOptionData<T>, event: Event]`; parameters `item: MenuOptionData<T>, event: Event`)
#### Slots
Slots for the MenubarCompact component.
- `item`: Custom content for the item slot. (type `((props: { item: MenuOptionData<T>; isTrigger?: boolean; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-trigger-icon`: Custom content for the item trigger icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `item-link-icon`: Custom content for the item link icon slot. (type `((props: { item: MenuOptionData<T>; }) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `(data: { item: MenuOptionData<T>; }) => any`; parameters `data: { item: MenuOptionData<T>; }`)

### MenubarContent

#### Props
Properties for the MenubarContent component.
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
Events for the MenubarContent component.
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### MenubarGroup

- No documented props, emits, slots, or slot props were available.

### MenubarGroupLabel

- No documented props, emits, slots, or slot props were available.

### MenubarItem

- No documented props, emits, slots, or slot props were available.

### MenubarItemIndicator

- No documented props, emits, slots, or slot props were available.

### MenubarMenu

#### Props
Properties for the MenubarMenu component.
- `value`: A unique value that associates the trigger with the active root value when controlled. (type `DefinedValue`; optional)

### MenubarPortal

- No documented props, emits, slots, or slot props were available.

### MenubarRadioGroup

- No documented props, emits, slots, or slot props were available.

### MenubarRadioItem

- No documented props, emits, slots, or slot props were available.

### MenubarRoot

#### Props
Properties for the MenubarRoot component.
- `modelValue`: The controlled value of the menu to open. Can be used as `v-model`. (type `T`; optional)
- `defaultValue`: The value of the menu that should be open when initially rendered. (type `T`; optional)
- `dir`: The reading direction of the menubar when applicable. (type `Direction`; optional)
- `loop`: When `true`, keyboard navigation loops from last trigger to first and vice versa. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the MenubarRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: T]`; parameters `value: T`)

### MenubarSeparator

- No documented props, emits, slots, or slot props were available.

### MenubarSub

- No documented props, emits, slots, or slot props were available.

### MenubarSubContent

#### Props
Properties for the MenubarSubContent component.
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
Events for the MenubarSubContent component.
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `entryFocus`: Emitted when entry focus occurs. (type `[event: Event]`; parameters `event: Event`)

### MenubarSubTrigger

#### Props
Properties for the MenubarSubTrigger component.
- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `textValue`: Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the item. <br> Use this when the content is complex, or you have non-textual content inside. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### MenubarTrigger

#### Props
Properties for the MenubarTrigger component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
