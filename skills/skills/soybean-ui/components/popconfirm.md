# Popconfirm

Source URL: https://ui.soybeanjs.cn/components/popconfirm
Markdown URL: https://ui.soybeanjs.cn/components/popconfirm.md
Category: Overlay
Description: A confirmation box component based on Popover, used for lightweight secondary confirmation operations.

## Overview

A confirmation box component based on Popover, used for lightweight secondary confirmation operations.

## Usage

Usage examples for popconfirm are rendered on the site.

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
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `dir`: The direction of the content. Used to determine the placement when not explicitly provided and for RTL flipping behavior. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the Popconfirm component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
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
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `dir`: The direction of the content. Used to determine the placement when not explicitly provided and for RTL flipping behavior. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)

#### Emits

Events for the PopconfirmCompact component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
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
