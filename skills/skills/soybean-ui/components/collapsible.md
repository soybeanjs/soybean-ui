# Collapsible

Source URL: https://ui.soybeanjs.cn/components/collapsible
Markdown URL: https://ui.soybeanjs.cn/components/collapsible.md
Category: Data Display
Description: An interactive component which expands/collapses a panel.

## Overview

An interactive component which expands/collapses a panel.

## Usage

Usage examples for collapsible are rendered on the site.

## Demos

Interactive demos for collapsible are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): Collapsible, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger.

### Collapsible

#### Props

Properties for the Collapsible component.

- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CollapsibleUi>`; optional)
- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the Collapsible component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

### CollapsibleContent

#### Props

Properties for the CollapsibleContent component.

- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CollapsibleRoot

#### Props

Properties for the CollapsibleRoot component.

- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the CollapsibleRoot component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

### CollapsibleTrigger

#### Props

Properties for the CollapsibleTrigger component.

- `disabledCollapsible`: When `true`, prevents the user from toggling the collapsible. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
