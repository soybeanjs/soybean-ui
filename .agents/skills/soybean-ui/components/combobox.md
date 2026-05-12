# Combobox

Source URL: https://ui.soybeanjs.cn/components/combobox
Markdown URL: https://ui.soybeanjs.cn/components/combobox.md
Category: Forms
Description: A combobox component for searching and selecting values from an option list, with explicit anchor composition, clearable input support, and more complete popup and filtering behavior.

## Overview

A combobox component for searching and selecting values from an option list, with explicit anchor composition, clearable input support, and more complete popup and filtering behavior.

## Usage

Usage examples for combobox are rendered on the site.

## Demos

Interactive demos for combobox are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (18): Combobox, ComboboxAnchor, ComboboxArrow, ComboboxCancel, ComboboxCompact, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxPortal, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport, ComboboxVirtualizer.

### Combobox

#### Props
Properties for the Combobox component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ComboboxUi>`; optional)
- `items`: Items rendered by the component. (type `ComboboxOptionData[]`; required)
- `placeholder`: Placeholder. (type `string`; optional)
- `searchPlaceholder`: Search placeholder. (type `string`; optional)
- `clearLabel`: Clear label. (type `string`; optional)
- `emptyLabel`: Empty label. (type `string`; optional)
- `anchorProps`: Properties forwarded to the anchor element. (type `ComboboxAnchorProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ComboboxTriggerProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `ComboboxCancelProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ComboboxPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ComboboxContentProps`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `ComboboxViewportProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `ComboboxInputProps`; optional)
- `emptyProps`: Properties forwarded to the empty element. (type `ComboboxEmptyProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `ComboboxGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ComboboxGroupLabelProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `ComboboxItemProps`; optional)
- `itemIndicatorProps`: Properties forwarded to the item indicator element. (type `ComboboxItemIndicatorProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ComboboxSeparatorProps`; optional)
- `open`: The controlled open state of the Combobox. Can be bound with `v-model:open`. (type `boolean`; optional)
- `defaultOpen`: The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. (type `boolean`; optional)
- `resetSearchTermOnBlur`: Whether to reset the searchTerm when the Combobox input blurred (type `boolean`; default ``true``; optional)
- `resetSearchTermOnSelect`: Whether to reset the searchTerm when the Combobox value is selected (type `boolean`; default ``true``; optional)
- `openOnFocus`: Whether to open the combobox when the input is focused (type `boolean`; default ``false``; optional)
- `openOnClick`: Whether to open the combobox when the input is clicked (type `boolean`; default ``false``; optional)
- `ignoreFilter`: When `true`, disable the default filters (type `boolean`; optional)
- `resetModelValueOnClear`: When `true` the `modelValue` will be reset to `null` (or `[]` if `multiple`) (type `boolean`; optional)
- `clearable`: Whether selected item can be cleared when `multiple` is false. (type `boolean`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? string[] : string)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? string[] : string)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `disabled`: When `true`, prevents the user from interacting with listbox (type `boolean`; optional)
- `dir`: The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the Combobox component.
- `update:modelValue`: No description. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)
- `highlight`: Event handler when highlighted element changes. (type `[payload?: CollectionItemData<ListboxCollectionItemData> | undefined]`; parameters `payload?: CollectionItemData<ListboxCollectionItemData> | undefined`)
- `update:open`: Emitted when the open state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: Event handler called when the positioner is placed (type `[]`)
- `select`: Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. (type `[event: SelectEvent<string>]`; parameters `event: SelectEvent<string>`)
#### Slots
Slots for the Combobox component.
- `trigger-leading`: Custom content for the trigger leading slot. (type `(() => any) | undefined`)
- `trigger-value`: Custom content for the trigger value slot. (type `((props: ComboboxCompactTriggerValueSlotProps<M>) => any) | undefined`)
- `trigger-trailing`: Custom content for the trigger trailing slot. (type `(() => any) | undefined`)
- `trigger-icon`: Custom content for the trigger icon slot. (type `(() => any) | undefined`)
- `input-leading`: Custom content for the input leading slot. (type `((props: ComboboxCompactInputSlotProps) => any) | undefined`)
- `input-trailing`: Custom content for the input trailing slot. (type `((props: ComboboxCompactInputSlotProps) => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `(() => any) | undefined`)
- `group-label`: Custom content for the group label slot. (type `((props: ComboboxCompactGroupLabelSlotProps) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)
- `item-text`: Custom content for the item text slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)
- `item-indicator`: Custom content for the item indicator slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)

### ComboboxAnchor

- No documented props, emits, slots, or slot props were available.

### ComboboxArrow

- No documented props, emits, slots, or slot props were available.

### ComboboxCancel

#### Props
Properties for the ComboboxCancel component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ComboboxCompact

#### Props
Properties for the ComboboxCompact component.
- `items`: Items rendered by the component. (type `ComboboxOptionData[]`; required)
- `placeholder`: Placeholder. (type `string`; optional)
- `searchPlaceholder`: Search placeholder. (type `string`; optional)
- `clearLabel`: Clear label. (type `string`; optional)
- `emptyLabel`: Empty label. (type `string`; optional)
- `anchorProps`: Properties forwarded to the anchor element. (type `ComboboxAnchorProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `ComboboxTriggerProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `ComboboxCancelProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `ComboboxPortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `ComboboxContentProps`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `ComboboxViewportProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `ComboboxInputProps`; optional)
- `emptyProps`: Properties forwarded to the empty element. (type `ComboboxEmptyProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `ComboboxGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `ComboboxGroupLabelProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `ComboboxItemProps`; optional)
- `itemIndicatorProps`: Properties forwarded to the item indicator element. (type `ComboboxItemIndicatorProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `ComboboxSeparatorProps`; optional)
- `open`: The controlled open state of the Combobox. Can be bound with `v-model:open`. (type `boolean`; optional)
- `defaultOpen`: The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. (type `boolean`; optional)
- `resetSearchTermOnBlur`: Whether to reset the searchTerm when the Combobox input blurred (type `boolean`; default ``true``; optional)
- `resetSearchTermOnSelect`: Whether to reset the searchTerm when the Combobox value is selected (type `boolean`; default ``true``; optional)
- `openOnFocus`: Whether to open the combobox when the input is focused (type `boolean`; default ``false``; optional)
- `openOnClick`: Whether to open the combobox when the input is clicked (type `boolean`; default ``false``; optional)
- `ignoreFilter`: When `true`, disable the default filters (type `boolean`; optional)
- `resetModelValueOnClear`: When `true` the `modelValue` will be reset to `null` (or `[]` if `multiple`) (type `boolean`; optional)
- `clearable`: Whether selected item can be cleared when `multiple` is false. (type `boolean`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? string[] : string)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? string[] : string)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `disabled`: When `true`, prevents the user from interacting with listbox (type `boolean`; optional)
- `dir`: The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the ComboboxCompact component.
- `update:modelValue`: No description. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)
- `highlight`: Event handler when highlighted element changes. (type `[payload?: CollectionItemData<ListboxCollectionItemData> | undefined]`; parameters `payload?: CollectionItemData<ListboxCollectionItemData> | undefined`)
- `update:open`: Emitted when the open state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: Event handler called when the positioner is placed (type `[]`)
- `select`: Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. (type `[event: SelectEvent<string>]`; parameters `event: SelectEvent<string>`)
#### Slots
Slots for the ComboboxCompact component.
- `trigger-leading`: Custom content for the trigger leading slot. (type `(() => any) | undefined`)
- `trigger-value`: Custom content for the trigger value slot. (type `((props: ComboboxCompactTriggerValueSlotProps<M>) => any) | undefined`)
- `trigger-trailing`: Custom content for the trigger trailing slot. (type `(() => any) | undefined`)
- `trigger-icon`: Custom content for the trigger icon slot. (type `(() => any) | undefined`)
- `input-leading`: Custom content for the input leading slot. (type `((props: ComboboxCompactInputSlotProps) => any) | undefined`)
- `input-trailing`: Custom content for the input trailing slot. (type `((props: ComboboxCompactInputSlotProps) => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `(() => any) | undefined`)
- `group-label`: Custom content for the group label slot. (type `((props: ComboboxCompactGroupLabelSlotProps) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)
- `item-text`: Custom content for the item text slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)
- `item-indicator`: Custom content for the item indicator slot. (type `((props: ComboboxCompactItemSlotProps) => any) | undefined`)

### ComboboxContent

#### Props
Properties for the ComboboxContent component.
- `position`: Position. (type `'inline' | 'popper'`; optional)
- `bodyLock`: Whether body lock. (type `boolean`; optional)
- `hideWhenEmpty`: Whether hide when empty. (type `boolean`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopperPopupProps`; optional)
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
- `trapFocus`: When `true`, focus cannot escape the content via keyboard, pointer, or a programmatic focus. (type `boolean`; default `false`; optional)
- `disableOutsidePointerEvents`: When `true`, hover/focus/click interactions will be disabled on elements outside the `DismissableLayer`. Users will need to click twice on outside elements to interact with them: once to close the `DismissableLayer`, and again to trigger the element. (type `boolean`; optional)
- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
#### Emits
Events for the ComboboxContent component.
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: Event handler called when the positioner is placed (type `[]`)

### ComboboxEmpty

#### Props
Properties for the ComboboxEmpty component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ComboboxGroup

- No documented props, emits, slots, or slot props were available.

### ComboboxGroupLabel

- No documented props, emits, slots, or slot props were available.

### ComboboxInput

#### Props
Properties for the ComboboxInput component.
- `displayValue`: Display value. (type `((value: MaybeArray<string>) => string)`; optional)
- `inputRef`: The function to set the input element. (type `((el: HTMLInputElement) => void)`; optional)
- `controlProps`: The props of the input extra props. (type `InputControlProps`; optional)
- `defaultValue`: The default value of the input (type `string`; optional)
- `modelValue`: The controlled value of the input (type `string`; optional)
- `id`: Id of the input element (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the ComboboxInput component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)

### ComboboxItem

#### Props
Properties for the ComboboxItem component.
- `textValue`: Text value. (type `string`; optional)
- `value`: The value given as data when submitted with a `name`. (type `string`; required)
- `disabled`: When `true`, prevents the user from interacting with the item. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ComboboxItem component.
- `select`: Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. (type `[event: SelectEvent<string>]`; parameters `event: SelectEvent<string>`)

### ComboboxItemIndicator

- No documented props, emits, slots, or slot props were available.

### ComboboxPortal

- No documented props, emits, slots, or slot props were available.

### ComboboxRoot

#### Props
Properties for the ComboboxRoot component.
- `open`: The controlled open state of the Combobox. Can be bound with `v-model:open`. (type `boolean`; optional)
- `defaultOpen`: The open state of the combobox when it is initially rendered. <br> Use when you do not need to control its open state. (type `boolean`; optional)
- `resetSearchTermOnBlur`: Whether to reset the searchTerm when the Combobox input blurred (type `boolean`; default ``true``; optional)
- `resetSearchTermOnSelect`: Whether to reset the searchTerm when the Combobox value is selected (type `boolean`; default ``true``; optional)
- `openOnFocus`: Whether to open the combobox when the input is focused (type `boolean`; default ``false``; optional)
- `openOnClick`: Whether to open the combobox when the input is clicked (type `boolean`; default ``false``; optional)
- `ignoreFilter`: When `true`, disable the default filters (type `boolean`; optional)
- `resetModelValueOnClear`: When `true` the `modelValue` will be reset to `null` (or `[]` if `multiple`) (type `boolean`; optional)
- `clearable`: Whether selected item can be cleared when `multiple` is false. (type `boolean`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? string[] : string)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? string[] : string)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `disabled`: When `true`, prevents the user from interacting with listbox (type `boolean`; optional)
- `dir`: The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the ComboboxRoot component.
- `update:modelValue`: No description. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)
- `highlight`: Event handler when highlighted element changes. (type `[payload?: CollectionItemData<ListboxCollectionItemData> | undefined]`; parameters `payload?: CollectionItemData<ListboxCollectionItemData> | undefined`)
- `update:open`: Emitted when the open state changes. (type `[value: boolean]`; parameters `value: boolean`)

### ComboboxSeparator

#### Props
Properties for the ComboboxSeparator component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ComboboxTrigger

#### Props
Properties for the ComboboxTrigger component.
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ComboboxViewport

#### Props
Properties for the ComboboxViewport component.
- `nonce`: Nonce. (type `string`; optional)

### ComboboxVirtualizer

#### Props
Properties for the ComboboxVirtualizer component.
- `options`: List of items (type `string[]`; required)
- `overscan`: Number of items rendered outside the visible area (type `number`; optional)
- `estimateSize`: Estimated size (in px) of each item (type `number | ((index: number) => number)`; optional)
- `textContent`: Text content for each item to achieve type-ahead feature (type `((option: string) => string)`; optional)
