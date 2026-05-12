# Anchor

Source URL: https://ui.soybeanjs.cn/components/anchor
Markdown URL: https://ui.soybeanjs.cn/components/anchor.md
Category: Navigation
Description: Anchor provides in-page navigation for long content sections and keeps the current section highlighted while scrolling.

## Overview

Anchor provides in-page navigation for long content sections and keeps the current section highlighted while scrolling.

When the active item changes while scrolling, the hash in the address bar is also synchronized. Scroll-driven updates always use `history.replaceState` to avoid creating excessive history entries.

If the current URL already contains a hash on initial render, Anchor will scroll to the matching section after mount. When a custom scroll container becomes available later, Anchor will re-sync once that container is ready.

> `SAnchor` now delegates recursive item rendering to headless `AnchorCompact`. The same six `ui` slots are available from both `SAnchor` and `@soybeanjs/headless/anchor`.

## Usage

Usage examples for anchor are rendered on the site.

## Demos

Interactive demos for anchor are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (5): Anchor, AnchorCompact, AnchorItemCompact, AnchorLink, AnchorRoot.

### Anchor

#### Props
Properties for the Anchor component.
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<AnchorExtendedUi>`; optional)
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `sticky`: Whether sticky. (type `boolean`; optional)
- `items`: Items rendered by the component. (type `AnchorOptionData[]`; required)
- `linkProps`: Properties forwarded to the link element. (type `AnchorLinkProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `HTMLAttributes`; optional)
- `titleProps`: Properties forwarded to the title element. (type `HTMLAttributes`; optional)
- `subProps`: Properties forwarded to the sub element. (type `HTMLAttributes`; optional)
- `bounds`: Bounds. (type `number`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `getContainer`: Get container. (type `(() => AnchorContainer | null)`; optional)
- `getCurrentAnchor`: Get current anchor. (type `((activeHref: string) => string)`; optional)
- `modelValue`: Current model value. (type `string`; optional)
- `offsetTop`: Offset top. (type `number`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `replace`: Whether replace. (type `boolean`; optional)
- `targetOffset`: Target offset. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Anchor component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `activeChange`: Emitted when active change occurs. (type `[value: string]`; parameters `value: string`)
- `itemSelect`: Emitted when item select occurs. (type `[event: MouseEvent, payload: { href: string; }]`; parameters `event: MouseEvent, payload: { href: string; }`)

### AnchorCompact

#### Props
Properties for the AnchorCompact component.
- `items`: Items rendered by the component. (type `AnchorOptionData[]`; required)
- `linkProps`: Properties forwarded to the link element. (type `AnchorLinkProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `HTMLAttributes`; optional)
- `titleProps`: Properties forwarded to the title element. (type `HTMLAttributes`; optional)
- `subProps`: Properties forwarded to the sub element. (type `HTMLAttributes`; optional)
- `bounds`: Bounds. (type `number`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `getContainer`: Get container. (type `(() => AnchorContainer | null)`; optional)
- `getCurrentAnchor`: Get current anchor. (type `((activeHref: string) => string)`; optional)
- `modelValue`: Current model value. (type `string`; optional)
- `offsetTop`: Offset top. (type `number`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `replace`: Whether replace. (type `boolean`; optional)
- `targetOffset`: Target offset. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the AnchorCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `activeChange`: Emitted when active change occurs. (type `[value: string]`; parameters `value: string`)
- `itemSelect`: Emitted when item select occurs. (type `[event: MouseEvent, payload: { href: string; }]`; parameters `event: MouseEvent, payload: { href: string; }`)

### AnchorItemCompact

#### Props
Properties for the AnchorItemCompact component.
- `modelValue`: Current model value. (type `string`; optional)
- `item`: Current item data. (type `AnchorOptionData`; required)
- `linkProps`: Properties forwarded to the link element. (type `AnchorLinkProps`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `HTMLAttributes`; optional)
- `titleProps`: Properties forwarded to the title element. (type `HTMLAttributes`; optional)
- `subProps`: Properties forwarded to the sub element. (type `HTMLAttributes`; optional)

### AnchorLink

#### Props
Properties for the AnchorLink component.
- `href`: The link of anchor (type `string`; required)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `to`: Route Location the link should navigate to when clicked on. (type `string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric`; optional)
- `external`: Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases (type `boolean`; optional)
- `target`: Where to display the linked URL, as the name for a browsing context. (type `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### AnchorRoot

#### Props
Properties for the AnchorRoot component.
- `bounds`: Bounds. (type `number`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `getContainer`: Get container. (type `(() => AnchorContainer | null)`; optional)
- `getCurrentAnchor`: Get current anchor. (type `((activeHref: string) => string)`; optional)
- `modelValue`: Current model value. (type `string`; optional)
- `offsetTop`: Offset top. (type `number`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `replace`: Whether replace. (type `boolean`; optional)
- `targetOffset`: Target offset. (type `number`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the AnchorRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `activeChange`: Emitted when active change occurs. (type `[value: string]`; parameters `value: string`)
- `itemSelect`: Emitted when item select occurs. (type `[event: MouseEvent, payload: { href: string; }]`; parameters `event: MouseEvent, payload: { href: string; }`)
