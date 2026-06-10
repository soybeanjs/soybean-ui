# Splitter

Source URL: https://ui.soybeanjs.cn/components/splitter
Markdown URL: https://ui.soybeanjs.cn/components/splitter.md
Category: Layout
Description: A composable layout component that divides an area into resizable panels.

## Overview

A composable layout component that divides an area into resizable panels.

## Usage

Usage examples for splitter are rendered on the site.

## Demo

Interactive demos for splitter are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (3): SplitterGroup, SplitterPanel, SplitterResizeHandle.

### SplitterGroup

#### Props

Properties for the SplitterGroup component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<SplitterUi>`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `direction`: The orientation of the splitter group. Either `horizontal` or `vertical`. Defaults to `horizontal`. (type `DataOrientation`; optional)
- `dir`: The reading direction of the splitter group. (type `Direction`; optional)
- `defaultLayout`: The initial layout percentages for the panels. (type `number[]`; optional)
- `keyboardResizeBy`: The percentage step size used for keyboard resizing. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the SplitterGroup component.

- `layout`: Event handler called when the group layout changes. (type `[value: number[]]`; parameters `value: number[]`)

### SplitterPanel

#### Props

Properties for the SplitterPanel component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `defaultSize`: The initial size of the panel as a percentage of the group. (type `number`; optional)
- `collapsible`: Whether the panel can collapse. (type `boolean`; optional)
- `collapsedSize`: The size of the panel when collapsed. (type `number`; optional)
- `maxSize`: The maximum size of the panel. (type `number`; optional)
- `minSize`: The minimum size of the panel when expanded. (type `number`; optional)
- `order`: The order of the panel within the group. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the SplitterPanel component.

- `collapse`: Event handler called when the panel collapses. (type `[]`)
- `expand`: Event handler called when the panel expands. (type `[]`)
- `resize`: Event handler called when the panel size changes. (type `[size: number, prevSize: number | undefined]`; parameters `size: number, prevSize: number | undefined`)

### SplitterResizeHandle

#### Props

Properties for the SplitterResizeHandle component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `withHandle`: Whether with handle. (type `boolean`; optional)
- `disabled`: Whether the resize handle is disabled. (type `boolean`; optional)
- `tabindex`: The tabindex of the resize handle. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the SplitterResizeHandle component.

- `dragging`: Event handler called when dragging state changes. (type `[value: boolean]`; parameters `value: boolean`)
