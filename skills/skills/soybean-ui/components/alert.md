# Alert

Source URL: https://ui.soybeanjs.cn/components/alert
Markdown URL: https://ui.soybeanjs.cn/components/alert.md
Category: Feedback
Description: Displays a callout for user attention. Useful for warnings, errors, or information.

## Overview

Displays a callout for user attention. Useful for warnings, errors, or information.

## Usage

Usage examples for alert are rendered on the site.

> `SAlert` now delegates the default icon/title/description/close composition to headless `AlertCompact`. When you need the unstyled composition entrypoint directly, import it from `@soybeanjs/headless/alert`.

## Demos

Interactive demos for alert are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (7): Alert, AlertClose, AlertCompact, AlertContent, AlertDescription, AlertRoot, AlertTitle.

### Alert

#### Props

Properties for the Alert component.

- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `variant`: Visual variant of the component. (type `AlertVariant`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<AlertUi>`; optional)
- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `icon`: Icon rendered by the component. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; optional)
- `closable`: Whether the component can be closed. (type `boolean`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AlertContentProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `AlertTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `AlertDescriptionProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `AlertCloseProps`; optional)
- `open`: The controlled open state of the alert. Can be bound with `v-model:open`. (type `boolean`; default `true`; optional)

#### Emits

Events for the Alert component.

- `update:open`: Emitted when the open changes. (type `[open: boolean]`; parameters `open: boolean`)
- `close`: Emitted when the close button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

#### Slots

Slots for the Alert component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `close`: Custom content for the close slot. (type `(() => any) | undefined`)

### AlertClose

#### Props

Properties for the AlertClose component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the AlertClose component.

- `close`: Emitted when the close button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### AlertCompact

#### Props

Properties for the AlertCompact component.

- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `icon`: Icon rendered by the component. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; optional)
- `closable`: Whether the component can be closed. (type `boolean`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AlertContentProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `AlertTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `AlertDescriptionProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `AlertCloseProps`; optional)
- `open`: The controlled open state of the alert. Can be bound with `v-model:open`. (type `boolean`; default `true`; optional)

#### Emits

Events for the AlertCompact component.

- `update:open`: Emitted when the open changes. (type `[open: boolean]`; parameters `open: boolean`)
- `close`: Emitted when the close button is clicked. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

#### Slots

Slots for the AlertCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `title`: Custom content for the title slot. (type `(() => any) | undefined`)
- `description`: Custom content for the description slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `close`: Custom content for the close slot. (type `(() => any) | undefined`)

### AlertContent

- No documented props, emits, slots, or slot props were available.

### AlertDescription

- No documented props, emits, slots, or slot props were available.

### AlertRoot

#### Props

Properties for the AlertRoot component.

- `open`: The controlled open state of the alert. Can be bound with `v-model:open`. (type `boolean`; default `true`; optional)

#### Emits

Events for the AlertRoot component.

- `update:open`: Emitted when the open changes. (type `[open: boolean]`; parameters `open: boolean`)

### AlertTitle

- No documented props, emits, slots, or slot props were available.
