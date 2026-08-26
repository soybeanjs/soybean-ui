# Popconfirm

Source URL: https://ui.soybeanjs.cn/components/popconfirm
Markdown URL: https://ui.soybeanjs.cn/components/popconfirm.md
Category: Overlay
Description: A confirmation box component based on `Popover`, used for lightweight secondary confirmation operations. `SPopconfirm` combines the headless `PopconfirmCompact` (built on the popover primitives) with the `popconfirmVariants` style recipe (13 slots, 6 sizes × 4 types).

## Overview

A confirmation box component based on `Popover`, used for lightweight secondary confirmation operations. `SPopconfirm` combines the headless `PopconfirmCompact` (built on the popover primitives) with the `popconfirmVariants` style recipe (13 slots, 6 sizes × 4 types).

Use it for a quick inline confirm (delete, destructive action) next to the trigger. For a richer blocking confirmation use `dialog`; for an unobtrusive hint use `tooltip`.

## Usage

Usage examples for popconfirm are rendered on the site.

## Features

- 🧩 Built on `Popover` — inherits placement, arrow, portal, dismissable and focus behavior
- 🎨 4 types — `type="error"`/`"success"`/`"warning"`/`"info"` drive the leading icon and color
- 🏷️ Title + description + content — `title`/`description`/`content` props or the matching slots
- 🔘 Confirm/cancel — `confirmText`/`cancelText` (localized from `dialog.confirm`/`dialog.cancel`); `showCancel` defaults to `onlyWarning`
- 🖼️ Icon toggle — `showIcon` renders the type icon; `showArrow` renders the popper arrow
- 📐 6 sizes — xs–2xl `size`; per-slot `ui` overrides
- ♿ Accessible — popup exposes `role="dialog"` labelled by the trigger, focus-managed, `axe-core` clean in the browser e2e
- 🔒 Disabled — `disabled` blocks the trigger from opening the popconfirm

## Component family

- `SPopconfirm` (styled) — the entry wrapper; `popconfirmVariants` recipe with dynamic slot forwarding
- `PopconfirmCompact` (headless) — the aggregated composite built on `PopoverRoot`/`PopoverTrigger`/`PopoverPositioner`/`PopoverPopup`
- `PopconfirmHeader` / `PopconfirmContent` / `PopconfirmFooter` (headless) — layout sections
- `PopconfirmTitle` / `PopconfirmDescription` (headless) — the title/description
- `PopconfirmConfirm` / `PopconfirmCancel` (headless) — footer `<button>`s, emit `confirm`/`cancel`

## Playground

Interactive demos for popconfirm are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (16): Popconfirm, PopconfirmArrow, PopconfirmCancel, PopconfirmClose, PopconfirmCompact, PopconfirmConfirm, PopconfirmContent, PopconfirmDescription, PopconfirmFooter, PopconfirmHeader, PopconfirmPopup, PopconfirmPortal, PopconfirmPositioner, PopconfirmRoot, PopconfirmTitle, PopconfirmTrigger.

### Popconfirm

#### Props

Properties for the Popconfirm component.

- `class`: class of popup (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<PopconfirmUi>`; optional)
- `type`: Type. (type `PopconfirmType`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `content`: Content. (type `string`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; default `true`; optional)
- `showIcon`: Whether to show an icon. (type `boolean`; default `true`; optional)
- `confirmText`: The text of the confirm button. Defaults to the localized `dialog.confirm` message from `ConfigProvider`. (type `string`; optional)
- `cancelText`: The text of the cancel button. Defaults to the localized `dialog.cancel` message from `ConfigProvider`. (type `string`; optional)
- `showCancel`: Determines whether the cancel button is shown. (type `boolean | 'onlyWarning'`; default `'onlyWarning'`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopconfirmTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `PopconfirmPortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `PopconfirmPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopconfirmPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `PopconfirmArrowProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `PopconfirmCloseProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `PopconfirmHeaderProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `PopconfirmTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `PopconfirmDescriptionProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `PopconfirmContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `PopconfirmFooterProps`; optional)
- `confirmProps`: Properties forwarded to the confirm element. (type `PopconfirmConfirmProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `PopconfirmCancelProps`; optional)
- `dir`: No description. (type `Direction`; optional)
- `open`: No description. (type `boolean`; optional)
- `defaultOpen`: No description. (type `boolean`; optional)
- `modal`: No description. (type `boolean`; optional)
- `disabled`: No description. (type `boolean`; optional)

#### Emits

Events for the Popconfirm component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: No description. (type `[]`)
- `confirm`: Emitted when confirm occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `cancel`: Emitted when cancel occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

#### Slots

Slots for the Popconfirm component.

- `default`: Custom content for the default slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `close`: Custom content for the close slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)

### PopconfirmArrow

- No documented props, emits, slots, or slot props were available.

### PopconfirmCancel

#### Props

Properties for the PopconfirmCancel component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the PopconfirmCancel component.

- `cancel`: Emitted when cancel occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### PopconfirmClose

- No documented props, emits, slots, or slot props were available.

### PopconfirmCompact

#### Props

Properties for the PopconfirmCompact component.

- `type`: Type. (type `PopconfirmType`; optional)
- `placement`: Placement. (type `Placement`; optional)
- `title`: Title text rendered by the component. (type `string`; optional)
- `description`: Description text rendered by the component. (type `string`; optional)
- `content`: Content. (type `string`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; default `true`; optional)
- `showIcon`: Whether to show an icon. (type `boolean`; default `true`; optional)
- `confirmText`: The text of the confirm button. Defaults to the localized `dialog.confirm` message from `ConfigProvider`. (type `string`; optional)
- `cancelText`: The text of the cancel button. Defaults to the localized `dialog.cancel` message from `ConfigProvider`. (type `string`; optional)
- `showCancel`: Determines whether the cancel button is shown. (type `boolean | 'onlyWarning'`; default `'onlyWarning'`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopconfirmTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `PopconfirmPortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `PopconfirmPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopconfirmPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `PopconfirmArrowProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `PopconfirmCloseProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `PopconfirmHeaderProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `PopconfirmTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `PopconfirmDescriptionProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `PopconfirmContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `PopconfirmFooterProps`; optional)
- `confirmProps`: Properties forwarded to the confirm element. (type `PopconfirmConfirmProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `PopconfirmCancelProps`; optional)
- `dir`: No description. (type `Direction`; optional)
- `open`: No description. (type `boolean`; optional)
- `defaultOpen`: No description. (type `boolean`; optional)
- `modal`: No description. (type `boolean`; optional)
- `disabled`: No description. (type `boolean`; optional)

#### Emits

Events for the PopconfirmCompact component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `placed`: No description. (type `[]`)
- `confirm`: Emitted when confirm occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `cancel`: Emitted when cancel occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

#### Slots

Slots for the PopconfirmCompact component.

- `default`: Custom content for the default slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `trigger`: Custom content for the trigger slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)
- `close`: Custom content for the close slot. (type `((props: PopconfirmCompactBaseSlotProps) => any) | undefined`)

### PopconfirmConfirm

#### Props

Properties for the PopconfirmConfirm component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the PopconfirmConfirm component.

- `confirm`: Emitted when confirm occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### PopconfirmContent

- No documented props, emits, slots, or slot props were available.

### PopconfirmDescription

- No documented props, emits, slots, or slot props were available.

### PopconfirmFooter

- No documented props, emits, slots, or slot props were available.

### PopconfirmHeader

- No documented props, emits, slots, or slot props were available.

### PopconfirmPopup

- No documented props, emits, slots, or slot props were available.

### PopconfirmPortal

- No documented props, emits, slots, or slot props were available.

### PopconfirmPositioner

- No documented props, emits, slots, or slot props were available.

### PopconfirmRoot

- No documented props, emits, slots, or slot props were available.

### PopconfirmTitle

- No documented props, emits, slots, or slot props were available.

### PopconfirmTrigger

- No documented props, emits, slots, or slot props were available.

## Notes

### Architecture and benchmark differences

`PopconfirmCompact` composes the popover trigger/positioner/popup with a confirm-style header, content and footer, while every primitive stays style-free and only the UI wrapper injects the `popconfirmVariants` classes. This mirrors radix-ui/shadcn-ui's headless split. Ant Design, Element Plus, Mantine and Naive UI ship a single styled popconfirm with `title`/`description`/`okText`/`cancelText`/`onConfirm` props; SoybeanUI additionally exposes per-slot `*Props`, a `size` scale, a `type` color/icon system, and localized action labels.

| Capability               | SoybeanUI | shadcn/ui | Ant Design Popconfirm | Element Plus Popconfirm | Mantine Popconfirm | Naive UI Popconfirm |
| :----------------------- | :-------: | :-------: | :-------------------: | :---------------------: | :----------------: | :-----------------: |
| Built on Popover         |    ✅     |    ✅     |           —           |            —            |         —          |          —          |
| Headless/styled split    |    ✅     |    ✅     |           —           |            —            |         —          |          —          |
| Type icon + color        |    ✅     |     —     |           —           |           ✅            |         —          |          —          |
| Title + description      |    ✅     |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |
| Localized confirm/cancel |    ✅     |     —     |           —           |            —            |         —          |          —          |
| Sizes (6)                |    ✅     |     —     |           —           |            —            |         —          |          —          |
| Placement (popper)       |    ✅     |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |

`—` = unsupported or a different interaction model.

### Cautions

- `modal` defaults to `false` for popconfirm (unlike dialog), so it does not block outside interaction or lock body scroll.
- `showCancel` defaults to `'onlyWarning'` — the cancel button appears only for `type="warning"`. Pass an explicit boolean to override.
- `confirmText`/`cancelText` default to the localized `dialog.confirm`/`dialog.cancel` messages; override per instance.
- The popup renders `role="dialog"` and is labelled by the trigger; provide a `title` so the dialog has a clear accessible name.
- Confirm/cancel emit `confirm`/`cancel` events; the popup dismisses after either action (subject to your own `beforeClose` handling in the parent).

### Roadmap

N/A — popconfirm is feature-complete for the current parity set.

## FAQ

### How do I show a title, description and content?

Pass `title`/`description`/`content` props or the matching slots:

```vue
<template #trigger><SButton danger>Delete</SButton></template>
```

### How do I set the type and icon?

Use `type` (`error`/`success`/`warning`/`info`) and toggle `show-icon`:

```vue
<template #trigger><SButton>Delete</SButton></template>
```

### How do I customize the action labels?

Set `confirm-text`/`cancel-text`, and control the cancel button with `show-cancel`:

```vue
<template #trigger><SButton>Delete</SButton></template>
```

### How do I control the open state?

Bind `open` with `v-model` or use `defaultOpen`:

```vue
<template #trigger><SButton>Delete</SButton></template>
```

### How do I disable the trigger?

Set `disabled` to block opening:

```vue
<template #trigger><SButton>Delete</SButton></template>
```
