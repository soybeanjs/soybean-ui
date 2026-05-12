# ScrollArea

Source URL: https://ui.soybeanjs.cn/components/scroll-area
Markdown URL: https://ui.soybeanjs.cn/components/scroll-area.md
Category: Data Display
Description: A custom scroll container that keeps native scrolling behavior while rendering styled scrollbars for vertical and horizontal overflow.

## Overview

A custom scroll container that keeps native scrolling behavior while rendering styled scrollbars for vertical and horizontal overflow.

## Usage

Usage examples for scroll-area are rendered on the site.

## Demos

Interactive demos for scroll-area are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (7): ScrollArea, ScrollAreaCompact, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport.

### ScrollArea

#### Props
Properties for the ScrollArea component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ScrollAreaUi>`; optional)
- `viewportProps`: Properties forwarded to the viewport element. (type `ScrollAreaViewportProps`; optional)
- `verticalScrollbarProps`: Properties forwarded to the vertical scrollbar element. (type `ScrollAreaScrollbarProps`; optional)
- `horizontalScrollbarProps`: Properties forwarded to the horizontal scrollbar element. (type `ScrollAreaScrollbarProps`; optional)
- `thumbProps`: Properties forwarded to the thumb elements. (type `ScrollAreaThumbProps`; optional)
- `cornerProps`: Properties forwarded to the corner element. (type `ScrollAreaCornerProps`; optional)
- `type`: Controls scrollbar visibility behavior. (type `ScrollAreaType`; optional)
- `dir`: The reading direction of the scroll area. (type `Direction`; optional)
- `scrollHideDelay`: Delay before transient scrollbars are hidden. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ScrollAreaCompact

#### Props
Properties for the ScrollAreaCompact component.
- `viewportProps`: Properties forwarded to the viewport element. (type `ScrollAreaViewportProps`; optional)
- `verticalScrollbarProps`: Properties forwarded to the vertical scrollbar element. (type `ScrollAreaScrollbarProps`; optional)
- `horizontalScrollbarProps`: Properties forwarded to the horizontal scrollbar element. (type `ScrollAreaScrollbarProps`; optional)
- `thumbProps`: Properties forwarded to the thumb elements. (type `ScrollAreaThumbProps`; optional)
- `cornerProps`: Properties forwarded to the corner element. (type `ScrollAreaCornerProps`; optional)
- `type`: Controls scrollbar visibility behavior. (type `ScrollAreaType`; optional)
- `dir`: The reading direction of the scroll area. (type `Direction`; optional)
- `scrollHideDelay`: Delay before transient scrollbars are hidden. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Slots
Slots for the ScrollAreaCompact component.
- `default`: Custom content for the default slot. (type `(() => any) | undefined`)

### ScrollAreaCorner

#### Props
Properties for the ScrollAreaCorner component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ScrollAreaRoot

#### Props
Properties for the ScrollAreaRoot component.
- `type`: Controls scrollbar visibility behavior. (type `ScrollAreaType`; optional)
- `dir`: The reading direction of the scroll area. (type `Direction`; optional)
- `scrollHideDelay`: Delay before transient scrollbars are hidden. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ScrollAreaScrollbar

#### Props
Properties for the ScrollAreaScrollbar component.
- `orientation`: The scrollbar orientation. (type `ScrollAreaOrientation`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ScrollAreaThumb

#### Props
Properties for the ScrollAreaThumb component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ScrollAreaViewport

#### Props
Properties for the ScrollAreaViewport component.
- `nonce`: Adds a nonce to the injected style tag. (type `string`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
