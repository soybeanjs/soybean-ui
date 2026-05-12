# Clipboard

Source URL: https://ui.soybeanjs.cn/components/clipboard
Markdown URL: https://ui.soybeanjs.cn/components/clipboard.md
Category: General
Description: A clipboard action component for copying text values with accessible button semantics and copied-state feedback.

## Overview

A clipboard action component for copying text values with accessible button semantics and copied-state feedback.

## Usage

Usage examples for clipboard are rendered on the site.

## Features

- 📋 Copies a required text value on click
- 🧩 Ships with built-in icon/text content that can still be overridden by slots
- ✅ Exposes ready, copied, and unsupported states
- 🎨 Supports the same color, size, variant, and shape tokens as button
- ♿ Keeps button semantics and disabled behavior in the headless layer
- 🎯 Provides slot props for custom copied-state UI

## Demos

Interactive demos for clipboard are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (1): Clipboard.

### Clipboard

#### Props
Properties for the Clipboard component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ClipboardVariant`; optional)
- `shape`: Shape of the component. (type `ClipboardShape`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `value`: The text value to copy. (type `string`; required)
- `copiedDuration`: The duration in milliseconds to keep the copied state. (type `number`; default `2000`; optional)
- `legacy`: Whether to enable the legacy `execCommand` fallback. (type `boolean`; default `true`; optional)
- `copyIcon`: The icon to display before copying. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; default `'lucide:copy'`; optional)
- `copiedIcon`: The icon to display after copying. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; default `'lucide:check'`; optional)
- `copyText`: The text to display before copying. (type `string`; default `'Copy'`; optional)
- `copiedText`: The text to display after copying. (type `string`; default `'Copied'`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Clipboard component.
- `click`: Emitted when click occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
- `copied`: Emitted when copied occurs. (type `[value: string]`; parameters `value: string`)
- `copyError`: Emitted when copy error occurs. (type `[error: unknown]`; parameters `error: unknown`)
#### Slot Props
Slot properties for the Clipboard component.
- `copied`: Whether copied. (type `boolean`; required)
- `disabled`: Whether the component is disabled. (type `boolean`; required)
- `icon`: Icon rendered by the component. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; required)
- `supported`: Whether supported. (type `boolean`; required)
- `state`: State exposed in the slot scope. (type `'ready' | 'copied' | 'unsupported'`; required)
- `text`: Text exposed in the slot scope. (type `string`; required)
- `copy`: Copy exposed in the slot scope. (type `() => Promise<void>`; required)
