# Card

Source URL: https://ui.soybeanjs.cn/components/card
Markdown URL: https://ui.soybeanjs.cn/components/card.md
Category: Data Display
Description: A container component that groups related content and actions. It supports headers, footers, titles, descriptions, and can be split into sections.

## Overview

A container component that groups related content and actions. It supports headers, footers, titles, descriptions, and can be split into sections.

## Usage

Usage examples for card are rendered on the site.

## Demos

Interactive demos for card are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (10): Card, CardCollapsibleTrigger, CardCompact, CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle, CardTitleRoot.

### Card

#### Props

Properties for the Card component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CardUi>`; optional)
- `scrollable`: If true, the content will be scrollable when the root has height and content is taller than the root (type `boolean`; default `false`; optional)
- `split`: If true, the card will add divider between title and content and footer (type `boolean`; default `false`; optional)
- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `headerProps`: Properties forwarded to the header element. (type `CardHeaderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `CardContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `CardFooterProps`; optional)
- `titleRootProps`: Properties forwarded to the title root element. (type `CardTitleRootProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `CardTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `CardDescriptionProps`; optional)
- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the Card component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

#### Slots

Slots for the Card component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `title-leading`: Custom content for the title leading slot. (type `(() => any) | undefined`)
- `title-trailing`: Custom content for the title trailing slot. (type `(() => any) | undefined`)
- `extra`: Custom content for the extra slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)

### CardCollapsibleTrigger

#### Props

Properties for the CardCollapsibleTrigger component.

- `disabledCollapsible`: When `true`, prevents the user from toggling the collapsible. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CardCompact

#### Props

Properties for the CardCompact component.

- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `headerProps`: Properties forwarded to the header element. (type `CardHeaderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `CardContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `CardFooterProps`; optional)
- `titleRootProps`: Properties forwarded to the title root element. (type `CardTitleRootProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `CardTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `CardDescriptionProps`; optional)
- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the CardCompact component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

#### Slots

Slots for the CardCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `title-leading`: Custom content for the title leading slot. (type `(() => any) | undefined`)
- `title-trailing`: Custom content for the title trailing slot. (type `(() => any) | undefined`)
- `extra`: Custom content for the extra slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)

### CardContent

#### Props

Properties for the CardContent component.

- `forceMount`: Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CardDescription

- No documented props, emits, slots, or slot props were available.

### CardFooter

- No documented props, emits, slots, or slot props were available.

### CardHeader

- No documented props, emits, slots, or slot props were available.

### CardRoot

#### Props

Properties for the CardRoot component.

- `defaultOpen`: The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `open`: The controlled open state of the collapsible. Can be bound with `v-model`. (type `boolean`; optional)
- `disabled`: When `true`, prevents the user from interacting with the collapsible. (type `boolean`; optional)
- `unmountOnHide`: When `true`, the element will be unmounted on closed state. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the CardRoot component.

- `update:open`: Event handler called when the open state of the collapsible changes. (type `[value: boolean]`; parameters `value: boolean`)

### CardTitle

- No documented props, emits, slots, or slot props were available.

### CardTitleRoot

- No documented props, emits, slots, or slot props were available.
