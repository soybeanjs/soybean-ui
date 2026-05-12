# Bottom Sheet

Source URL: https://ui.soybeanjs.cn/components/bottom-sheet
Markdown URL: https://ui.soybeanjs.cn/components/bottom-sheet.md
Category: Overlay
Description: A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog`, and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support.

## Overview

A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog`, and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support.

## Usage

Usage examples for bottom-sheet are rendered on the site.

## Demos

Interactive demos for bottom-sheet are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (17): BottomSheet, BottomSheetCancel, BottomSheetClose, BottomSheetCompact, BottomSheetConfirm, BottomSheetContent, BottomSheetDescription, BottomSheetFooter, BottomSheetHandle, BottomSheetHeader, BottomSheetOverlay, BottomSheetPopup, BottomSheetPortal, BottomSheetRoot, BottomSheetRootNested, BottomSheetTitle, BottomSheetTrigger.

### BottomSheet

#### Props
Properties for the BottomSheet component.
- `title`: The title of the dialog. This is used for accessibility purposes and will be rendered in the header of the dialog if the `title` slot is not provided. (type `string`; optional)
- `description`: The description of the dialog. This is used for accessibility purposes and will be rendered in the content of the dialog if the `description` slot is not provided. (type `string`; optional)
- `icon`: The icon of the dialog. This is used for accessibility purposes and will be rendered in the header of the dialog if the `icon` slot is not provided. (type `string | import("vue").Component | VNode<import("vue").RendererNode, import("vue").RendererElement, { [key: string]: ...`; optional)
- `showClose`: Whether show the close button in the header of the dialog. (type `boolean`; default `true`; optional)
- `pure`: Whether to use the pure version of the dialog, which does not include the header and footer. This is useful when you want to fully control the content of the dialog and do not need the built-in header and footer. (type `boolean`; default `false`; optional)
- `showCancel`: Whether to show the cancel button. When set to `onlyWarning`, the cancel button will only be shown when the dialog is an alert dialog with `alertType="warning"`. When set to `true`, the cancel button will always be shown. (type `boolean | 'onlyWarning'`; default `'onlyWarning'`; optional)
- `cancelText`: The text of the cancel button. This is used for accessibility purposes and will be rendered in the footer of the dialog if the `cancel` slot is not provided. Defaults to the localized `dialog.cancel` message from `ConfigProvider`. (type `string`; optional)
- `showConfirm`: Whether to show the confirm button when the dialog is an alert dialog. The default value is `true` when the dialog is an alert dialog. (type `boolean`; optional)
- `confirmText`: The text of the confirm button. This is used for accessibility purposes and will be rendered in the footer of the dialog if the `confirm` slot is not provided. Defaults to the localized `dialog.confirm` message from `ConfigProvider`. (type `string`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `BottomSheetTriggerProps`; optional)
- `overlayProps`: Properties forwarded to the overlay element. (type `BottomSheetOverlayProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `BottomSheetPortalProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `BottomSheetPopupProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `BottomSheetHeaderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `BottomSheetContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `BottomSheetFooterProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `BottomSheetTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `BottomSheetDescriptionProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `BottomSheetCloseProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `BottomSheetCancelProps`; optional)
- `confirmProps`: Properties forwarded to the confirm element. (type `BottomSheetConfirmProps`; optional)
- `dir`: The text direction of the dialog (type `Direction`; optional)
- `isAlert`: Whether the dialog is an alert dialog. An alert dialog is a dialog that interrupts the user's workflow to communicate an important message and requires a response. When set to `true`, the dialog will have `role="alertdialog"` and will require a `DialogTitle` to be provided. This is used for accessibility purposes. (type `boolean`; default `false`; optional)
- `alertType`: The alert type of the dialog, which determines the default icon and styles when the dialog is an alert dialog. (type `DialogAlertType`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `activeSnapPoint`: Active snap point. (type `string | number | null`; optional)
- `closeThreshold`: Close threshold. (type `number`; optional)
- `shouldScaleBackground`: Whether the component should scale background. (type `boolean`; optional)
- `setBackgroundColorOnScale`: When `false` we don't change body's background color when the drawer is open. (type `boolean`; default `true`; optional)
- `scrollLockTimeout`: Scroll lock timeout. (type `number`; optional)
- `fixed`: Whether fixed. (type `boolean`; optional)
- `dismissible`: Whether dismissible. (type `boolean`; optional)
- `nested`: Whether nested. (type `boolean`; optional)
- `direction`: Direction. (type `Side`; optional)
- `noBodyStyles`: When `true` the `body` doesn't get any styles assigned from Vaul (type `boolean`; optional)
- `handleOnly`: Whether handle only. (type `boolean`; optional)
- `preventScrollRestoration`: Whether prevent scroll restoration. (type `boolean`; optional)
- `snapPoints`: Snap points. (type `(string | number)[]`; optional)
- `fadeFromIndex`: Fade from index. (type `number`; optional)
- `handleProps`: Properties forwarded to the handle element. (type `BottomSheetHandleProps`; optional)
- `class`: the popup class of the dialog (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<BottomSheetUi>`; optional)
#### Emits
Events for the BottomSheet component.
- `cancel`: Event handler called when the dialog is requested to be canceled. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `confirm`: Event handler called when the dialog is requested to be closed by confirming. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `click`: Event handler called when the dialog trigger is activated. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `drag`: Emitted when drag occurs. (type `[percentageDragged: number]`; parameters `percentageDragged: number`)
- `release`: Emitted when release occurs. (type `[open: boolean]`; parameters `open: boolean`)
- `close`: Emitted when close occurs. (type `[]`)
- `update:activeSnapPoint`: Emitted when the active snap point value changes. (type `[val: string | number | null]`; parameters `val: string | number | null`)
#### Slots
Slots for the BottomSheet component.
- `default`: Custom content for the default slot. (type `(props: DialogCompactBaseSlotProps) => any`; parameters `props: DialogCompactBaseSlotProps`)
- `trigger`: Custom content for the trigger slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `close`: Custom content for the close slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `cancel`: Custom content for the cancel slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `confirm`: Custom content for the confirm slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)

### BottomSheetCancel

- No documented props, emits, slots, or slot props were available.

### BottomSheetClose

- No documented props, emits, slots, or slot props were available.

### BottomSheetCompact

#### Props
Properties for the BottomSheetCompact component.
- `title`: The title of the dialog. This is used for accessibility purposes and will be rendered in the header of the dialog if the `title` slot is not provided. (type `string`; optional)
- `description`: The description of the dialog. This is used for accessibility purposes and will be rendered in the content of the dialog if the `description` slot is not provided. (type `string`; optional)
- `icon`: The icon of the dialog. This is used for accessibility purposes and will be rendered in the header of the dialog if the `icon` slot is not provided. (type `string | import("vue").Component | VNode<import("vue").RendererNode, import("vue").RendererElement, { [key: string]: ...`; optional)
- `showClose`: Whether show the close button in the header of the dialog. (type `boolean`; default `true`; optional)
- `pure`: Whether to use the pure version of the dialog, which does not include the header and footer. This is useful when you want to fully control the content of the dialog and do not need the built-in header and footer. (type `boolean`; default `false`; optional)
- `showCancel`: Whether to show the cancel button. When set to `onlyWarning`, the cancel button will only be shown when the dialog is an alert dialog with `alertType="warning"`. When set to `true`, the cancel button will always be shown. (type `boolean | 'onlyWarning'`; default `'onlyWarning'`; optional)
- `cancelText`: The text of the cancel button. This is used for accessibility purposes and will be rendered in the footer of the dialog if the `cancel` slot is not provided. Defaults to the localized `dialog.cancel` message from `ConfigProvider`. (type `string`; optional)
- `showConfirm`: Whether to show the confirm button when the dialog is an alert dialog. The default value is `true` when the dialog is an alert dialog. (type `boolean`; optional)
- `confirmText`: The text of the confirm button. This is used for accessibility purposes and will be rendered in the footer of the dialog if the `confirm` slot is not provided. Defaults to the localized `dialog.confirm` message from `ConfigProvider`. (type `string`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `BottomSheetTriggerProps`; optional)
- `overlayProps`: Properties forwarded to the overlay element. (type `BottomSheetOverlayProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `BottomSheetPortalProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `BottomSheetPopupProps`; optional)
- `headerProps`: Properties forwarded to the header element. (type `BottomSheetHeaderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `BottomSheetContentProps`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `BottomSheetFooterProps`; optional)
- `titleProps`: Properties forwarded to the title element. (type `BottomSheetTitleProps`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `BottomSheetDescriptionProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `BottomSheetCloseProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `BottomSheetCancelProps`; optional)
- `confirmProps`: Properties forwarded to the confirm element. (type `BottomSheetConfirmProps`; optional)
- `dir`: The text direction of the dialog (type `Direction`; optional)
- `isAlert`: Whether the dialog is an alert dialog. An alert dialog is a dialog that interrupts the user's workflow to communicate an important message and requires a response. When set to `true`, the dialog will have `role="alertdialog"` and will require a `DialogTitle` to be provided. This is used for accessibility purposes. (type `boolean`; default `false`; optional)
- `alertType`: The alert type of the dialog, which determines the default icon and styles when the dialog is an alert dialog. (type `DialogAlertType`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `activeSnapPoint`: Active snap point. (type `string | number | null`; optional)
- `closeThreshold`: Close threshold. (type `number`; optional)
- `shouldScaleBackground`: Whether the component should scale background. (type `boolean`; optional)
- `setBackgroundColorOnScale`: When `false` we don't change body's background color when the drawer is open. (type `boolean`; default `true`; optional)
- `scrollLockTimeout`: Scroll lock timeout. (type `number`; optional)
- `fixed`: Whether fixed. (type `boolean`; optional)
- `dismissible`: Whether dismissible. (type `boolean`; optional)
- `nested`: Whether nested. (type `boolean`; optional)
- `direction`: Direction. (type `Side`; optional)
- `noBodyStyles`: When `true` the `body` doesn't get any styles assigned from Vaul (type `boolean`; optional)
- `handleOnly`: Whether handle only. (type `boolean`; optional)
- `preventScrollRestoration`: Whether prevent scroll restoration. (type `boolean`; optional)
- `snapPoints`: Snap points. (type `(string | number)[]`; optional)
- `fadeFromIndex`: Fade from index. (type `number`; optional)
- `handleProps`: Properties forwarded to the handle element. (type `BottomSheetHandleProps`; optional)
#### Emits
Events for the BottomSheetCompact component.
- `cancel`: Event handler called when the dialog is requested to be canceled. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `confirm`: Event handler called when the dialog is requested to be closed by confirming. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `click`: Event handler called when the dialog trigger is activated. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `drag`: Emitted when drag occurs. (type `[percentageDragged: number]`; parameters `percentageDragged: number`)
- `release`: Emitted when release occurs. (type `[open: boolean]`; parameters `open: boolean`)
- `close`: Emitted when close occurs. (type `[]`)
- `update:activeSnapPoint`: Emitted when the active snap point value changes. (type `[val: string | number | null]`; parameters `val: string | number | null`)
#### Slots
Slots for the BottomSheetCompact component.
- `default`: Custom content for the default slot. (type `(props: DialogCompactBaseSlotProps) => any`; parameters `props: DialogCompactBaseSlotProps`)
- `trigger`: Custom content for the trigger slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `title`: Custom content for the title slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `description`: Custom content for the description slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `close`: Custom content for the close slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `cancel`: Custom content for the cancel slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
- `confirm`: Custom content for the confirm slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)

### BottomSheetConfirm

- No documented props, emits, slots, or slot props were available.

### BottomSheetContent

- No documented props, emits, slots, or slot props were available.

### BottomSheetDescription

- No documented props, emits, slots, or slot props were available.

### BottomSheetFooter

- No documented props, emits, slots, or slot props were available.

### BottomSheetHandle

#### Props
Properties for the BottomSheetHandle component.
- `preventCycle`: Whether prevent cycle. (type `boolean`; optional)

### BottomSheetHeader

- No documented props, emits, slots, or slot props were available.

### BottomSheetOverlay

- No documented props, emits, slots, or slot props were available.

### BottomSheetPopup

- No documented props, emits, slots, or slot props were available.

### BottomSheetPortal

- No documented props, emits, slots, or slot props were available.

### BottomSheetRoot

#### Props
Properties for the BottomSheetRoot component.
- `dir`: The text direction of the dialog (type `Direction`; optional)
- `isAlert`: Whether the dialog is an alert dialog. An alert dialog is a dialog that interrupts the user's workflow to communicate an important message and requires a response. When set to `true`, the dialog will have `role="alertdialog"` and will require a `DialogTitle` to be provided. This is used for accessibility purposes. (type `boolean`; default `false`; optional)
- `alertType`: The alert type of the dialog, which determines the default icon and styles when the dialog is an alert dialog. (type `DialogAlertType`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
- `activeSnapPoint`: Active snap point. (type `string | number | null`; optional)
- `closeThreshold`: Close threshold. (type `number`; optional)
- `shouldScaleBackground`: Whether the component should scale background. (type `boolean`; optional)
- `setBackgroundColorOnScale`: When `false` we don't change body's background color when the drawer is open. (type `boolean`; default `true`; optional)
- `scrollLockTimeout`: Scroll lock timeout. (type `number`; optional)
- `fixed`: Whether fixed. (type `boolean`; optional)
- `dismissible`: Whether dismissible. (type `boolean`; optional)
- `nested`: Whether nested. (type `boolean`; optional)
- `direction`: Direction. (type `Side`; optional)
- `noBodyStyles`: When `true` the `body` doesn't get any styles assigned from Vaul (type `boolean`; optional)
- `handleOnly`: Whether handle only. (type `boolean`; optional)
- `preventScrollRestoration`: Whether prevent scroll restoration. (type `boolean`; optional)
- `snapPoints`: Snap points. (type `(string | number)[]`; optional)
- `fadeFromIndex`: Fade from index. (type `number`; optional)
#### Emits
Events for the BottomSheetRoot component.
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `drag`: Emitted when drag occurs. (type `[percentageDragged: number]`; parameters `percentageDragged: number`)
- `release`: Emitted when release occurs. (type `[open: boolean]`; parameters `open: boolean`)
- `close`: Emitted when close occurs. (type `[]`)
- `update:activeSnapPoint`: Emitted when the active snap point value changes. (type `[val: string | number | null]`; parameters `val: string | number | null`)
#### Slots
Slots for the BottomSheetRoot component.
- `default`: Custom content for the default slot. (type `((props: { open: boolean; }) => any) | undefined`)

### BottomSheetRootNested

- No documented props, emits, slots, or slot props were available.

### BottomSheetTitle

- No documented props, emits, slots, or slot props were available.

### BottomSheetTrigger

- No documented props, emits, slots, or slot props were available.
