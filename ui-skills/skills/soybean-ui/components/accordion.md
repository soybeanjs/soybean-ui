# Accordion

Source URL: https://ui.soybeanjs.cn/components/accordion
Markdown URL: https://ui.soybeanjs.cn/components/accordion.md
Category: Data Display
Description: A vertically stacked set of interactive headings that each reveal a section of content. It supports single or multiple expansion modes and fully customizable styling.

## Overview

A vertically stacked set of interactive headings that each reveal a section of content. It supports single or multiple expansion modes and fully customizable styling.

## Usage

Usage examples for accordion are rendered on the site.

## Demos

Interactive demos for accordion are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (8): Accordion, AccordionCompact, AccordionContent, AccordionDescription, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger.

### Accordion

#### Props

Properties for the Accordion component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<AccordionUi>`; optional)
- `items`: Items rendered by the component. (type `T[]`; required)
- `itemProps`: Properties forwarded to the item element. (type `AccordionItemProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `AccordionHeaderProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `AccordionTriggerProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AccordionContentProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `AccordionDescriptionProps`; optional)
- `collapsible`: When type is "single", allows closing content when clicking trigger for an open item. When type is "multiple", this prop has no effect. (type `boolean`; default `false`; optional)
- `dir`: The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode. (type `Direction`; default `'ltr'`; optional)
- `disabled`: When `true`, prevents the user from interacting with the accordion and all its items (type `boolean`; default `false`; optional)
- `orientation`: The orientation of the accordion. (type `DataOrientation`; default `'vertical'`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? string[] : string)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? string[] : string)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `SelectionBehavior`; default `'toggle'`; optional)

#### Emits

Events for the Accordion component.

- `update:modelValue`: No description. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)

#### Slots

Slots for the Accordion component.

- `item`: Custom content for the item slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `leading`: Custom content for the leading slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `trigger-icon`: Custom content for the trigger icon slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `content`: Custom content for the content slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)

### AccordionCompact

#### Props

Properties for the AccordionCompact component.

- `items`: Items rendered by the component. (type `T[]`; required)
- `itemProps`: Properties forwarded to the item element. (type `AccordionItemProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `AccordionHeaderProps`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `AccordionTriggerProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AccordionContentProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `AccordionDescriptionProps`; optional)
- `collapsible`: When type is "single", allows closing content when clicking trigger for an open item. When type is "multiple", this prop has no effect. (type `boolean`; default `false`; optional)
- `dir`: The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode. (type `Direction`; default `'ltr'`; optional)
- `disabled`: When `true`, prevents the user from interacting with the accordion and all its items (type `boolean`; default `false`; optional)
- `orientation`: The orientation of the accordion. (type `DataOrientation`; default `'vertical'`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? string[] : string)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? string[] : string)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `SelectionBehavior`; default `'toggle'`; optional)

#### Emits

Events for the AccordionCompact component.

- `update:modelValue`: No description. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)

#### Slots

Slots for the AccordionCompact component.

- `item`: Custom content for the item slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `leading`: Custom content for the leading slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `trigger-icon`: Custom content for the trigger icon slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)
- `content`: Custom content for the content slot. (type `((props: AccordionCompactSlotProps<T, M>) => any) | undefined`)

#### Slot Props

Slot properties for the AccordionCompact component.

- `item`: Current item data. (type `T`; required)
- `index`: Index of the current item. (type `number`; required)
- `modelValue`: Current model value. (type `(M extends true ? string[] : string) | undefined`; required)
- `open`: Whether the component is open. (type `boolean`; required)

### AccordionContent

#### Props

Properties for the AccordionContent component.

- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### AccordionDescription

- No documented props, emits, slots, or slot props were available.

### AccordionHeader

- No documented props, emits, slots, or slot props were available.

### AccordionItem

#### Props

Properties for the AccordionItem component.

- `value`: Value of the accordion item. All items within an accordion should use a unique value. (type `string`; required)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### AccordionRoot

#### Props

Properties for the AccordionRoot component.

- `collapsible`: When type is "single", allows closing content when clicking trigger for an open item. When type is "multiple", this prop has no effect. (type `boolean`; default `false`; optional)
- `dir`: The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode. (type `Direction`; default `'ltr'`; optional)
- `disabled`: When `true`, prevents the user from interacting with the accordion and all its items (type `boolean`; default `false`; optional)
- `orientation`: The orientation of the accordion. (type `DataOrientation`; default `'vertical'`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; default `true`; optional)
- `modelValue`: The controlled value of the selected item(s). Use this when you need to control the state of the items. Can be bound with `v-model` (type `(M extends true ? string[] : string)`; optional)
- `defaultValue`: The default value of the selected item(s). Use this when you need to set the initial state of the items. (type `(M extends true ? string[] : string)`; optional)
- `multiple`: Determines whether a "single" or "multiple" items can be selected at a time. This prop will overwrite the inferred type from `modelValue` and `defaultValue`. (type `M`; optional)
- `selectionBehavior`: How multiple selection should behave in the collection. (type `SelectionBehavior`; default `'toggle'`; optional)

#### Emits

Events for the AccordionRoot component.

- `update:modelValue`: No description. (type `[value: M extends true ? string[] : string]`; parameters `value: M extends true ? string[] : string`)

### AccordionTrigger

#### Props

Properties for the AccordionTrigger component.

- `disabledCollapsible`: When `true`, prevents the user from toggling the collapsible. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
