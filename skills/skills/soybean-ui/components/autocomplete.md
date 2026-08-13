# Autocomplete

Source URL: https://ui.soybeanjs.cn/components/autocomplete
Markdown URL: https://ui.soybeanjs.cn/components/autocomplete.md
Category: Forms
Description: An autocomplete that filters suggestion items from text input and quickly fills the input with a selected result. It opens as you type, fuzzy-matches options with Fuse, and supports grouping, a clearable input, and a data-driven compact API. Use it when users should type keywords to get suggestions over free text; when options come from a fixed list, prefer `SSelect`; when options come from a known set that benefits from type-to-filter, `SCombobox` is the closer sibling.

## Overview

An autocomplete that filters suggestion items from text input and quickly fills the input with a selected result. It opens as you type, fuzzy-matches options with Fuse, and supports grouping, a clearable input, and a data-driven compact API. Use it when users should type keywords to get suggestions over free text; when options come from a fixed list, prefer `SSelect`; when options come from a known set that benefits from type-to-filter, `SCombobox` is the closer sibling.

## Usage

Usage examples for autocomplete are rendered on the site.

## Features

- 🔍 Type-to-open filtering backed by Fuse fuzzy search (`threshold: 0.3`, matching `label` / `value` / `keywords` / `groupLabel`)
- ⌨️ Full keyboard navigation — ArrowDown/Up/Home/End open and move, Enter/Space select, typeahead, Escape close
- 🗂 Grouping with group labels, separators, and empty states (no-match / no-data)
- 🧹 Clearable input (`clearable` → `clearLabel` / `resetModelValueOnClear`)
- 🎛 `openOnFocus` / `openOnClick` dual open strategy with controlled `v-model:open`
- 📊 Data-driven `AutocompleteCompact` API — `items` (options use `label` / `value` fields) + grouping
- ♿ WAI-ARIA combobox pattern — `role="combobox"` / `listbox` / `option`, `aria-activedescendant`, axe-clean when open
- 🎨 17 recipe slots and 7 size variants via `autocompleteVariants`

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
- `resetModelValueOnClear`: When `true`, clearing the search term also resets `modelValue` to an empty string. (type `boolean`; optional)
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
- `resetModelValueOnClear`: When `true`, clearing the search term also resets `modelValue` to an empty string. (type `boolean`; optional)
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
- `type`: The type of the input element. (type `InputTypeHTMLAttribute`; optional)
- `autofocus`: When `true`, the input is auto-focused. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: When `true`, the input is read-only. (type `boolean`; optional)
- `rootProps`: Properties forwarded to the root element (type `BaseProps`; optional)
- `autocomplete`: The autocomplete attribute of the input. Supports the HTML autofill tokens (including password-manager values such as `current-password` / `new-password`), in addition to the `on` / `off` switches. (type `'search' | 'name' | 'email' | 'tel' | 'url' | 'on' | 'off' | 'username' | 'current-password' | 'new-password' | 'one-...`; optional)
- `maxlength`: The maximum number of characters allowed in the input (type `number`; optional)
- `minlength`: The minimum number of characters allowed in the input (type `number`; optional)
- `pattern`: The pattern attribute of the input (type `string`; optional)

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
- `resetModelValueOnClear`: When `true`, clearing the search term also resets `modelValue` to an empty string. (type `boolean`; optional)
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

## Notes

### Architecture and benchmark differences

SoybeanUI builds autocomplete by reusing the combobox component family (Anchor/Content/Item/Viewport/Trigger/Empty/Cancel) over the listbox base plus Popper positioning. `AutocompleteRoot` disables combobox's built-in filtering (`ignoreFilter`) and delegates matching to the compact layer's `useFuse`, so autocomplete and combobox share the same interaction kernel and differ only in filter and display strategy. The `scv()` recipe `autocompleteVariants` declares 17 slots and 7 size variants.

| Capability                    | SoybeanUI | reka-ui `Combobox` | Algolia Autocomplete | Ant Design `AutoComplete` |
| :---------------------------- | :-------: | :----------------: | :------------------: | :-----------------------: |
| headless/styled split         |    ✅     |         ✅         |          —           |             —             |
| Type-to-filter + fuzzy match  |    ✅     |         —          |          ✅          |            ✅             |
| combobox/listbox roles        |    ✅     |         ✅         |          ✅          |            ✅             |
| Keyboard nav + typeahead      |    ✅     |         ✅         |          ✅          |            ✅             |
| Grouping + group labels       |    ✅     |         ✅         |          —           |             —             |
| `openOnFocus` / `openOnClick` |    ✅     |         —          |          ✅          |            ✅             |
| Clear button + empty state    |    ✅     |         ✅         |          —           |            ✅             |
| Data-driven Compact API       |    ✅     |         —          |          —           |             —             |
| axe-clean (open state)        |    ✅     |         —          |          —           |             —             |

### Cautions

- Filtering happens client-side with Fuse; for remote suggestions, pass pre-filtered `items` or debounce the input yourself.
- The popup stays open when focus moves to the clear button (the blur-enclosure check covers the whole anchor area) and closes only when focus leaves the component — this was a fixed regression, so do not restore trigger-only containment.
- When the root is `disabled`, every item is unselectable, including items that declare their own `disabled` (unified `rootDisabled || item.disabled` guard).
- The viewport (`role="listbox"`) exposes a localized `aria-label` by default; override it via `viewportProps['aria-label']`.

## FAQ

### How do I show suggestions without typing?

Use `openOnFocus` to open the popup when the input receives focus, and `openOnClick` to open when the input is clicked.

### How do I tune how fuzzy the matching is?

Pass `fuseOptions` to tune the Fuse search — for example, raise `threshold` for looser matches or use `keys` to restrict which fields participate.

### What is the difference between `SAutocomplete`, `SCombobox`, and `SSelect`?

`SAutocomplete` fuzzy-matches suggestions over free text (Fuse); `SCombobox` type-to-filters a known option list; `SSelect` is trigger-driven with typeahead only and no text input.

### How do I clear the input and reset the model value?

Pass `clearable`. `resetModelValueOnClear` decides whether clearing also emits an empty `modelValue` or only resets the search term.
