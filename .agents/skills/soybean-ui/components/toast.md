# Toast

Source URL: https://ui.soybeanjs.cn/components/toast
Markdown URL: https://ui.soybeanjs.cn/components/toast.md
Category: Feedback
Description: `SToastProvider` renders the toast viewports and `toast` is the imperative API used to create, update, dismiss, and inspect notifications.

## Overview

`SToastProvider` renders the toast viewports and `toast` is the imperative API used to create, update, dismiss, and inspect notifications.

The first argument of `toast(...)` becomes the toast title/message. Use `description`, `action`, `cancel`, `icon`, `ui`, and `position` to customize each notification.

## Usage

Mount one `SToastProvider` near your app root. If your app is already wrapped with `SConfigProvider`, a default `SToastProvider` is rendered automatically unless `customToast` is set to `true`.

Usage examples for toast are rendered on the site.

## Demos

Interactive demos for toast are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (2): Toaster, ToastProvider.

### Toaster

#### Props
Properties for the Toaster component.
- `id`: Id. (type `string`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `hotkey`: Hotkey. (type `string[]`; optional)
- `customAriaLabel`: Custom aria label. (type `string`; optional)
- `containerAriaLabel`: Container aria label. (type `string`; optional)
- `position`: Position. (type `ToastPosition`; optional)
- `defaultExpanded`: Whether default expanded. (type `boolean`; optional)
- `duration`: The duration (in milliseconds) before the toast automatically closes. Set to `0` or `Infinity` to disable auto-dismissal. (type `number`; optional)
- `gap`: Gap. (type `number`; optional)
- `offset`: The maximum number of visible toasts per position. (type `ToastOffset`; default `3`; optional)
- `visibleCounts`: Visible counts. (type `number`; optional)
- `swipeDirections`: Swipe directions. (type `SwipeDirection[]`; optional)
- `showIcon`: Whether to show an icon. (type `boolean`; optional)
- `showClose`: Whether to show the close button on the toast. (type `boolean`; default `true`; optional)
- `icons`: Icons. (type `Partial<Record<ToastIconType, IconValue>>`; optional)
- `toastProps`: Properties forwarded to the toast element. (type `LiHTMLAttributes`; optional)
- `wrapperProps`: Properties forwarded to the wrapper element. (type `HTMLAttributes`; optional)
- `contentProps`: Properties forwarded to the content element. (type `HTMLAttributes`; optional)
- `titleProps`: Properties forwarded to the title element. (type `HTMLAttributes`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `HTMLAttributes`; optional)
- `iconProps`: Properties forwarded to the icon component. (type `HTMLAttributes`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `HTMLAttributes`; optional)
- `actionProps`: Properties forwarded to the action element. (type `HTMLAttributes`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `HTMLAttributes`; optional)
- `closeProps`: Properties forwarded to the close element. (type `HTMLAttributes`; optional)

### ToastProvider

#### Props
Properties for the ToastProvider component.
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `ToastUi`; optional)
- `id`: Id. (type `string`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `hotkey`: Hotkey. (type `string[]`; optional)
- `customAriaLabel`: Custom aria label. (type `string`; optional)
- `containerAriaLabel`: Container aria label. (type `string`; optional)
- `position`: Position. (type `ToastPosition`; optional)
- `defaultExpanded`: Whether default expanded. (type `boolean`; optional)
- `duration`: The duration (in milliseconds) before the toast automatically closes. Set to `0` or `Infinity` to disable auto-dismissal. (type `number`; optional)
- `gap`: Gap. (type `number`; optional)
- `offset`: The maximum number of visible toasts per position. (type `ToastOffset`; default `3`; optional)
- `visibleCounts`: Visible counts. (type `number`; optional)
- `swipeDirections`: Swipe directions. (type `SwipeDirection[]`; optional)
- `showIcon`: Whether to show an icon. (type `boolean`; optional)
- `showClose`: Whether to show the close button on the toast. (type `boolean`; default `true`; optional)
- `icons`: Icons. (type `Partial<Record<ToastIconType, IconValue>>`; optional)
- `toastProps`: Properties forwarded to the toast element. (type `LiHTMLAttributes`; optional)
- `wrapperProps`: Properties forwarded to the wrapper element. (type `HTMLAttributes`; optional)
- `contentProps`: Properties forwarded to the content element. (type `HTMLAttributes`; optional)
- `titleProps`: Properties forwarded to the title element. (type `HTMLAttributes`; optional)
- `descriptionProps`: Properties forwarded to the description element. (type `HTMLAttributes`; optional)
- `iconProps`: Properties forwarded to the icon component. (type `HTMLAttributes`; optional)
- `footerProps`: Properties forwarded to the footer element. (type `HTMLAttributes`; optional)
- `actionProps`: Properties forwarded to the action element. (type `HTMLAttributes`; optional)
- `cancelProps`: Properties forwarded to the cancel element. (type `HTMLAttributes`; optional)
- `closeProps`: Properties forwarded to the close element. (type `HTMLAttributes`; optional)
