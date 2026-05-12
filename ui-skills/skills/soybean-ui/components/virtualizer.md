# Virtualizer

Source URL: https://ui.soybeanjs.cn/components/virtualizer
Markdown URL: https://ui.soybeanjs.cn/components/virtualizer.md
Category: Data Display
Description: A virtual scrolling component that efficiently renders large lists by only rendering items currently in the viewport.

## Overview

A virtual scrolling component that efficiently renders large lists by only rendering items currently in the viewport.

## Usage

Usage examples for virtualizer are rendered on the site.

## Demos

Interactive demos for virtualizer are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): Virtualizer, VirtualizerContent, VirtualizerDynamicContent, VirtualizerItem, VirtualizerRoot.

### Virtualizer

#### Props

Properties for the Virtualizer component.

- `contentProps`: Properties forwarded to the content element. (type `VirtualizerContentProps`; optional)
- `dynamicContentProps`: Properties forwarded to the dynamic content element. (type `VirtualizerDynamicContentProps`; optional)
- `height`: The height of the virtualizer root (type `string | number`; required)
- `items`: Items rendered by the component. (type `T[]`; required)
- `options`: Options. (type `VirtualizerOptions`; optional)
- `dynamic`: Whether dynamic. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### VirtualizerContent

#### Props

Properties for the VirtualizerContent component.

- `dynamicContentProps`: Properties forwarded to the dynamic content element. (type `VirtualizerDynamicContentProps`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### VirtualizerDynamicContent

- No documented props, emits, slots, or slot props were available.

### VirtualizerItem

#### Props

Properties for the VirtualizerItem component.

- `data`: Data. (type `VirtualItem`; required)
- `customStyle`: Whether custom style. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### VirtualizerRoot

#### Props

Properties for the VirtualizerRoot component.

- `height`: The height of the virtualizer root (type `string | number`; required)
- `items`: Items rendered by the component. (type `T[]`; required)
- `options`: Options. (type `VirtualizerOptions`; optional)
- `dynamic`: Whether dynamic. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
