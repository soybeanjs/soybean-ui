# Bottom Sheet

Source URL: https://ui.soybeanjs.cn/components/bottom-sheet
Markdown URL: https://ui.soybeanjs.cn/components/bottom-sheet.md
Category: Overlay
Description: A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog` (same headless dialog primitives), and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support.

## Overview

A modal panel that slides in from the bottom edge of the screen. It is suited for mobile-first actions, supplemental details, and step-based confirmations. The component reuses the declarative API of `SDialog` (same headless dialog primitives), and adds bottom-sheet interactions such as drag-to-dismiss, background scaling, and `snapPoints` support.

`SBottomSheet` combines the headless dialog primitive family with the `bottomSheetVariants` style recipe (extends `drawerVariants`, adds a drag `handle`; 6 sizes).

## Usage

Usage examples for bottom-sheet are rendered on the site.

## Features

- 🧩 Reuses the dialog base — inherits `SDialog`'s slots, events, per-part `*Props`, `pure`, `isAlert` and title/description/footer contract
- 🖐️ Drag-to-dismiss — the `handle` (or the popup) can be dragged; release past the `closeThreshold` closes the sheet
- 📏 Snap points — `snapPoints` supports `fraction`/`height` snap levels for collapsible sheets
- 🎭 Background scale — `shouldScaleBackground`/`setBackgroundColorOnScale` scale and tint the page behind the sheet
- 🪜 Nested sheets — `nested` composes a `BottomSheetRootNested` for stacked sheets
- 🧲 Fixed — `fixed` pins the sheet while content scrolls; `handleOnly` restricts drag to the handle
- 🔘 Dialog footer — `showClose`/`showCancel`/`showConfirm` with localized `cancelText`/`confirmText`
- 📐 6 sizes — xs–2xl `size`; per-slot `ui` overrides
- ♿ Accessible — `role="dialog"`, focus moves into the popup, `axe-core` clean

## Component family

- `SBottomSheet` (styled) — the entry wrapper; `bottomSheetVariants` recipe with dynamic slot forwarding
- `BottomSheetRoot` / `BottomSheetRootNested` (headless) — the state owner; `open`, `snapPoints`, `dismissible`, `nested`, drag/scale state
- `BottomSheetOverlay` (headless) — the dimmed backdrop
- `BottomSheetPopup` (headless) — the focus-trapped, draggable, dismissable surface
- `BottomSheetHandle` (headless) — the grab handle
- Dialog primitives (headless) — `DialogHeader`/`DialogContent`/`DialogFooter`/`DialogTitle`/`DialogDescription`/`DialogClose`/`DialogCancel`/`DialogConfirm`/`DialogTrigger`
- `BottomSheetCompact` (headless) — the aggregated composite; composes handle, header, content, footer and exposes the slots

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
- `showFullscreen`: Whether show the fullscreen toggle button in the header of the dialog. (type `boolean`; default `true`; optional)
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
- `fullscreenProps`: Properties forwarded to the fullscreen element. (type `DialogFullscreenProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `BottomSheetCancelProps`; optional)
- `confirmProps`: Properties forwarded to the confirm element. (type `BottomSheetConfirmProps`; optional)
- `dir`: The text direction of the dialog (type `Direction`; optional)
- `isAlert`: Whether the dialog is an alert dialog. An alert dialog is a dialog that interrupts the user's workflow to communicate an important message and requires a response. When set to `true`, the dialog will have `role="alertdialog"` and will require a `DialogTitle` to be provided. This is used for accessibility purposes. (type `boolean`; default `false`; optional)
- `alertType`: The alert type of the dialog, which determines the default icon and styles when the dialog is an alert dialog. (type `DialogAlertType`; optional)
- `draggable`: Whether the dialog can be moved by dragging its header. (type `boolean`; default `false`; optional)
- `fullscreen`: The controlled fullscreen state of the dialog. Can be bound with `v-model:fullscreen`. (type `boolean`; default `undefined`; optional)
- `defaultFullscreen`: The fullscreen state of the dialog when it is initially rendered. Use when you do not need to control its fullscreen state. (type `boolean`; default `false`; optional)
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
- `fullscreen`: Event handler called when the fullscreen state of the dialog is requested to be toggled. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `confirm`: Event handler called when the dialog is requested to be closed by confirming. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `update:fullscreen`: Event handler called when the fullscreen state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
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
- `fullscreen`: Custom content for the fullscreen slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
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
- `showFullscreen`: Whether show the fullscreen toggle button in the header of the dialog. (type `boolean`; default `true`; optional)
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
- `fullscreenProps`: Properties forwarded to the fullscreen element. (type `DialogFullscreenProps`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `BottomSheetCancelProps`; optional)
- `confirmProps`: Properties forwarded to the confirm element. (type `BottomSheetConfirmProps`; optional)
- `dir`: The text direction of the dialog (type `Direction`; optional)
- `isAlert`: Whether the dialog is an alert dialog. An alert dialog is a dialog that interrupts the user's workflow to communicate an important message and requires a response. When set to `true`, the dialog will have `role="alertdialog"` and will require a `DialogTitle` to be provided. This is used for accessibility purposes. (type `boolean`; default `false`; optional)
- `alertType`: The alert type of the dialog, which determines the default icon and styles when the dialog is an alert dialog. (type `DialogAlertType`; optional)
- `draggable`: Whether the dialog can be moved by dragging its header. (type `boolean`; default `false`; optional)
- `fullscreen`: The controlled fullscreen state of the dialog. Can be bound with `v-model:fullscreen`. (type `boolean`; default `undefined`; optional)
- `defaultFullscreen`: The fullscreen state of the dialog when it is initially rendered. Use when you do not need to control its fullscreen state. (type `boolean`; default `false`; optional)
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
- `fullscreen`: Event handler called when the fullscreen state of the dialog is requested to be toggled. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `confirm`: Event handler called when the dialog is requested to be closed by confirming. (type `[event: MouseEvent]`; parameters `event: MouseEvent`)
- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `update:fullscreen`: Event handler called when the fullscreen state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
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
- `fullscreen`: Custom content for the fullscreen slot. (type `((props: DialogCompactBaseSlotProps) => any) | undefined`)
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
- `draggable`: Whether the dialog can be moved by dragging its header. (type `boolean`; default `false`; optional)
- `fullscreen`: The controlled fullscreen state of the dialog. Can be bound with `v-model:fullscreen`. (type `boolean`; default `undefined`; optional)
- `defaultFullscreen`: The fullscreen state of the dialog when it is initially rendered. Use when you do not need to control its fullscreen state. (type `boolean`; default `false`; optional)
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

## Notes

### Architecture and benchmark differences

`BottomSheetCompact` owns the handle/overlay/popup/header/content/footer composition and the drag/snap/scale state flow (via `useSnapPoints`/`useScaleBackground`) while every primitive stays style-free and only the UI wrapper injects the `bottomSheetVariants` classes. This mirrors the vaul/radix-dialog headless split. Ant Design, Element Plus, Mantine and Naive UI ship a single styled drawer/modal; a dedicated draggable bottom-sheet with `snapPoints` is typically a separate library (vaul, @radix-ui/dialog + manual). SoybeanUI exposes per-slot `*Props`, a `size` scale, and the snap/scale/drag model inline.

| Capability            | SoybeanUI | shadcn/ui + vaul | Ant Design | Element Plus | Mantine | Naive UI |
| :-------------------- | :-------: | :--------------: | :--------: | :----------: | :-----: | :------: |
| Reuses dialog base    |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Headless/styled split |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Drag-to-dismiss       |    ✅     |        ✅        |     —      |      —       |   ✅    |    —     |
| Snap points           |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Background scale      |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Nested sheets         |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| Sizes (6)             |    ✅     |        —         |     —      |      —       |    —    |    —     |

`—` = unsupported or a different interaction model.

### Cautions

- `modal` defaults to `true`; the popup teleports to `document.body` and body scroll is managed by the hide-others layer.
- Drag-to-dismiss uses pointer capture; `dismissible` (default `true`) enables releasing past the threshold to close. Set `false` to force explicit actions.
- `snapPoints` accepts an array of `fraction` (0–1) or `height` numbers; `activeSnapPoint` tracks the current snap level.
- `handleOnly` restricts dragging to the handle; `fixed` keeps the sheet in place while inner content scrolls.
- `nested` renders via `BottomSheetRootNested`; each nested sheet needs its own `BottomSheetProvider` context.

### Roadmap

N/A — bottom-sheet is feature-complete for the current parity set.

## FAQ

### How do I enable snap points?

Pass an array of `fraction` or `height` values:

```vue
<template #trigger><SButton>Open</SButton></template>
<div>Sheet content</div>
```

### How do I disable drag-to-dismiss?

Set `dismissible={false}` to require an explicit action:

```vue
<template #trigger><SButton>Open</SButton></template>
<div>Sheet content</div>
```

### How do I restrict dragging to the handle?

Set `handle-only`:

```vue
<template #trigger><SButton>Open</SButton></template>
<div>Sheet content</div>
```

### How do I show a step-based confirmation?

Use `show-confirm`/`show-cancel` with the footer:

```vue
<template #trigger><SButton danger>Delete</SButton></template>
<div>This cannot be undone.</div>
```
