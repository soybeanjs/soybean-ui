# Combobox

## Overview

A combobox for searching and selecting values from an option list, with an explicit anchor composition, clearable input, and complete popup/filtering behavior. The input filters options as you type and keyboard navigation follows the WAI-ARIA combobox pattern. Use it when users must type to filter a list; for selection without typing, use `SSelect`; for fuzzy-matching suggestions over text, use `SAutocomplete`.

## Usage

<UsageCode component="combobox" />

## Features

- 🔍 Type-to-filter with a three-state filter model (matched / empty / unset)
- ⌨️ Full keyboard navigation — Arrow keys, Enter/Space select, typeahead, Escape close
- 📜 Optional virtual scrolling (`ComboboxVirtualizer`)
- 🗂 Grouping with group labels and separators
- 🧹 Cancel/clear button with optional `resetModelValueOnClear`
- 📊 Data-driven `ComboboxCompact` API — `items` / `labelField` / `valueField` + grouping
- 🎛 Controlled / uncontrolled with `v-model:open` and filter semantics (`ignoreFilter`, `resetSearchTermOnBlur`)
- ♿ Full accessibility support — `role="combobox"` / `listbox` / `option`, `aria-activedescendant`, axe-clean

## Demos

<PlaygroundGallery component="combobox" />

## API

<ComponentApi component="combobox" />

## Notes

### Architecture and benchmark differences

SoybeanUI builds combobox by reusing the listbox base plus Popper positioning: `ComboboxRoot` (selection state + `useControllableState(open)` + three-state filter) → `ComboboxInput` (`role="combobox"` + `aria-autocomplete`) → `ComboboxTrigger` → `ComboboxContentImpl` (DismissableLayer + FocusScope + bodyLock) → `ComboboxItem` → `ListboxItem`. The `scv()` recipe `comboboxVariants` declares 15 slots and 7 size variants. This mirrors reka-ui / shadcn combobox semantics, with virtual scrolling and the data-driven compact API as SoybeanUI differentiators.

| Capability                      | SoybeanUI | reka-ui `Combobox` | shadcn `Combobox` | Ant Design `Select` (showSearch) |
| :------------------------------ | :-------: | :----------------: | :---------------: | :------------------------------: |
| headless/styled split           |    ✅     |         ✅         |         —         |                —                 |
| Type-to-filter + 3-state filter |    ✅     |         ✅         |        ✅         |                ✅                |
| combobox/listbox roles          |    ✅     |         ✅         |        ✅         |                ✅                |
| Keyboard nav + typeahead        |    ✅     |         ✅         |         —         |                ✅                |
| Virtual scrolling               |    ✅     |         ✅         |         —         |                ✅                |
| Grouping + group labels         |    ✅     |         ✅         |        ✅         |                ✅                |
| Cancel button (clear)           |    ✅     |         ✅         |        ✅         |                ✅                |
| Empty state                     |    ✅     |         ✅         |         —         |                —                 |
| Data-driven Compact API         |    ✅     |         —          |         —         |                —                 |
| axe-clean (open state)          |    ✅     |         —          |        ✅         |                —                 |

### Cautions

- The input filters options client-side; for remote/async filtering, disable built-in filtering or debounce `inputValueChange` yourself.
- `resetSearchTermOnBlur` controls whether the search term is kept after blur — set it to match your UX (e.g. `false` keeps the typed term).
- When the root is `disabled`, all items become unselectable — including items that declare their own `disabled` (unified `rootDisabled || item.disabled` guard).

## FAQ

### What is the difference between `SCombobox` and `SSelect`?

`SCombobox` filters options as the user types (`role="combobox"` + `aria-autocomplete`); `SSelect` is trigger-driven with typeahead only. Choose combobox when typing to search matters.

### How do I enable virtual scrolling for large lists?

Add a `ComboboxVirtualizer` (or the equivalent compact flag) in the content; it activates an internal virtual list while preserving keyboard navigation.

### How do I clear the input and reset the model value?

Pass `clearable`. `resetModelValueOnClear` decides whether clearing also emits an empty `modelValue` or only resets the search term.

### Why is a disabled item still selectable?

This was a real bug (a Vue `withDefaults` Boolean-prop defaulting issue) and is fixed. Disabled items now honor the unified `rootDisabled || item.disabled` guard, matching `SSelect`.
