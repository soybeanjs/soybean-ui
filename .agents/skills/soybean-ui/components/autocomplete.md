# Autocomplete

Source URL: https://ui.soybeanjs.cn/components/autocomplete
Markdown URL: https://ui.soybeanjs.cn/components/autocomplete.md
Category: Forms
Description: Autocomplete filters suggestion items from text input and quickly fills the input with a selected result.

## Overview

Autocomplete filters suggestion items from text input and quickly fills the input with a selected result.

## Usage

Usage examples for autocomplete are rendered on the site.

> `SAutocomplete` now delegates its filtering and option aggregation to headless `AutocompleteCompact`. For unstyled, data-driven composition, import `AutocompleteCompact` from `@soybeanjs/headless/autocomplete`.

## Demos

Interactive demos for autocomplete are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (14): Autocomplete, AutocompleteAnchor, AutocompleteCompact, AutocompleteContent, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteItemIndicator, AutocompletePortal, AutocompleteRoot, AutocompleteSeparator, AutocompleteTrigger, AutocompleteViewport.

### Autocomplete

#### Props
Properties for the Autocomplete component.
- `class`: Root class. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<AutocompleteUi>`; optional)
- `modelValue`: The controlled value of the autocomplete input. (type `string`; optional)
- `defaultValue`: The initial value of the autocomplete input. (type `string`; optional)
- `items`: Items rendered by the component. (type `AutocompleteOptionData<T>[]`; required)
- `placeholder`: Placeholder. (type `string`; optional)
- `clearable`: Whether clearable. (type `boolean`; optional)
- `clearLabel`: Clear label. (type `string`; optional)
- `emptyLabel`: Empty label. (type `string`; optional)
- `fuseOptions`: Fuse options. (type `UseFuseOptions<AutocompleteSearchOptionData>`; optional)
- `anchorProps`: Properties forwarded to the anchor element. (type `AutocompleteAnchorProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `AutocompleteInputProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `AutocompleteTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `AutocompletePortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AutocompleteContentProps`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `AutocompleteViewportProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `AutocompleteGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `AutocompleteGroupLabelProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `Omit<AutocompleteItemProps, 'disabled' | 'value'>`; optional)
- `itemIndicatorProps`: Properties forwarded to the item indicator element. (type `AutocompleteItemIndicatorProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `AutocompleteSeparatorProps`; optional)
- `open`: The controlled open state of the autocomplete popup. (type `boolean`; optional)
- `defaultOpen`: The open state of the autocomplete popup when initially rendered. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with autocomplete. (type `boolean`; optional)
- `dir`: The reading direction of the autocomplete when applicable. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight. (type `boolean`; optional)
- `openOnFocus`: Whether to open the autocomplete when the input is focused. (type `boolean`; optional)
- `openOnClick`: Whether to open the autocomplete when the input is clicked. (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the Autocomplete component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:open`: Emitted when the open state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `highlight`: Emitted when highlight occurs. (type `[payload?: AutocompleteHighlightPayload | undefined]`; parameters `payload?: AutocompleteHighlightPayload | undefined`)
- `select`: Emitted when select occurs. (type `[item: T]`; parameters `item: T`)
#### Slots
Slots for the Autocomplete component.
- `input-leading`: Custom content for the input leading slot. (type `(() => any) | undefined`)
- `input-trailing`: Custom content for the input trailing slot. (type `(() => any) | undefined`)
- `trigger-icon`: Custom content for the trigger icon slot. (type `(() => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `(() => any) | undefined`)
- `group-label`: Custom content for the group label slot. (type `((props: { item: AutocompleteGroupOptionData<T> | Extract<T, { items: T[]; }>; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-text`: Custom content for the item text slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-indicator`: Custom content for the item indicator slot. (type `((props: { item: T; }) => any) | undefined`)

### AutocompleteAnchor

- No documented props, emits, slots, or slot props were available.

### AutocompleteCompact

#### Props
Properties for the AutocompleteCompact component.
- `modelValue`: The controlled value of the autocomplete input. (type `string`; optional)
- `defaultValue`: The initial value of the autocomplete input. (type `string`; optional)
- `items`: Items rendered by the component. (type `AutocompleteOptionData<T>[]`; required)
- `placeholder`: Placeholder. (type `string`; optional)
- `clearable`: Whether clearable. (type `boolean`; optional)
- `clearLabel`: Clear label. (type `string`; optional)
- `emptyLabel`: Empty label. (type `string`; optional)
- `fuseOptions`: Fuse options. (type `UseFuseOptions<AutocompleteSearchOptionData>`; optional)
- `anchorProps`: Properties forwarded to the anchor element. (type `AutocompleteAnchorProps`; optional)
- `inputProps`: Properties forwarded to the input element. (type `AutocompleteInputProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `AutocompleteTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `AutocompletePortalProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AutocompleteContentProps`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `AutocompleteViewportProps`; optional)
- `groupProps`: Properties forwarded to the group element. (type `AutocompleteGroupProps`; optional)
- `groupLabelProps`: Properties forwarded to the group label element. (type `AutocompleteGroupLabelProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `Omit<AutocompleteItemProps, 'disabled' | 'value'>`; optional)
- `itemIndicatorProps`: Properties forwarded to the item indicator element. (type `AutocompleteItemIndicatorProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `AutocompleteSeparatorProps`; optional)
- `open`: The controlled open state of the autocomplete popup. (type `boolean`; optional)
- `defaultOpen`: The open state of the autocomplete popup when initially rendered. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with autocomplete. (type `boolean`; optional)
- `dir`: The reading direction of the autocomplete when applicable. (type `Direction`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight. (type `boolean`; optional)
- `openOnFocus`: Whether to open the autocomplete when the input is focused. (type `boolean`; optional)
- `openOnClick`: Whether to open the autocomplete when the input is clicked. (type `boolean`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the AutocompleteCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:open`: Emitted when the open state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `highlight`: Emitted when highlight occurs. (type `[payload?: AutocompleteHighlightPayload | undefined]`; parameters `payload?: AutocompleteHighlightPayload | undefined`)
- `select`: Emitted when select occurs. (type `[item: T]`; parameters `item: T`)
#### Slots
Slots for the AutocompleteCompact component.
- `input-leading`: Custom content for the input leading slot. (type `(() => any) | undefined`)
- `input-trailing`: Custom content for the input trailing slot. (type `(() => any) | undefined`)
- `trigger-icon`: Custom content for the trigger icon slot. (type `(() => any) | undefined`)
- `empty`: Custom content for the empty slot. (type `(() => any) | undefined`)
- `group-label`: Custom content for the group label slot. (type `((props: { item: Extract<AutocompleteOptionData<T>, { items: T[]; }>; }) => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-text`: Custom content for the item text slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: { item: T; }) => any) | undefined`)
- `item-indicator`: Custom content for the item indicator slot. (type `((props: { item: T; }) => any) | undefined`)

### AutocompleteContent

- No documented props, emits, slots, or slot props were available.

### AutocompleteGroup

- No documented props, emits, slots, or slot props were available.

### AutocompleteGroupLabel

- No documented props, emits, slots, or slot props were available.

### AutocompleteInput

#### Props
Properties for the AutocompleteInput component.
- `inputRef`: Input ref. (type `((el: HTMLInputElement) => void)`; optional)
- `controlProps`: Properties forwarded to the control element. (type `InputControlProps`; optional)
- `disabled`: When `true`, prevents the user from interacting with the input. (type `boolean`; optional)
- `id`: Id of the input element (type `string`; optional)
- `placeholder`: The placeholder of the input (type `string`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)

### AutocompleteItem

- No documented props, emits, slots, or slot props were available.

### AutocompleteItemIndicator

- No documented props, emits, slots, or slot props were available.

### AutocompletePortal

- No documented props, emits, slots, or slot props were available.

### AutocompleteRoot

#### Props
Properties for the AutocompleteRoot component.
- `modelValue`: The controlled value of the autocomplete input. (type `string`; optional)
- `defaultValue`: The value of the autocomplete input when initially rendered. (type `string`; optional)
- `open`: The controlled open state of the autocomplete popup. (type `boolean`; optional)
- `defaultOpen`: The open state of the autocomplete popup when initially rendered. (type `boolean`; optional)
- `dir`: The reading direction of the autocomplete when applicable. (type `Direction`; optional)
- `disabled`: When `true`, prevents the user from interacting with autocomplete. (type `boolean`; optional)
- `highlightOnHover`: When `true`, hover over item will trigger highlight. (type `boolean`; optional)
- `openOnFocus`: Whether to open the autocomplete when the input is focused. (type `boolean`; optional)
- `openOnClick`: Whether to open the autocomplete when the input is clicked. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
#### Emits
Events for the AutocompleteRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:open`: Emitted when the open state changes. (type `[value: boolean]`; parameters `value: boolean`)
- `highlight`: Emitted when highlight occurs. (type `[payload?: AutocompleteHighlightPayload | undefined]`; parameters `payload?: AutocompleteHighlightPayload | undefined`)

### AutocompleteSeparator

- No documented props, emits, slots, or slot props were available.

### AutocompleteTrigger

- No documented props, emits, slots, or slot props were available.

### AutocompleteViewport

- No documented props, emits, slots, or slot props were available.
