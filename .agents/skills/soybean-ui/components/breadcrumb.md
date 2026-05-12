# Breadcrumb

Source URL: https://ui.soybeanjs.cn/components/breadcrumb
Markdown URL: https://ui.soybeanjs.cn/components/breadcrumb.md
Category: Navigation
Description: Breadcrumbs allow users to navigate through the hierarchy of pages. It displays the current location within the application structure.

## Overview

Breadcrumbs allow users to navigate through the hierarchy of pages. It displays the current location within the application structure.

## Usage

Usage examples for breadcrumb are rendered on the site.

> `SBreadcrumb` delegates its list aggregation to headless `BreadcrumbCompact`. For unstyled, data-driven composition, import `BreadcrumbCompact` from `@soybeanjs/headless/breadcrumb`.

## Demos

Interactive demos for breadcrumb are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (11): Breadcrumb, BreadcrumbCompact, BreadcrumbCompactEllipsis, BreadcrumbCompactItem, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbRoot, BreadcrumbSeparator.

### Breadcrumb

#### Props
Properties for the Breadcrumb component.
- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<BreadcrumbUi>`; optional)
- `items`: Items rendered by the component. (type `T[]`; required)
- `ellipsis`: The range of items to show ellipsis. When the item count is greater than 4, we will show ellipsis. (type `true | [number, number] | null`; optional)
- `listProps`: Properties forwarded to the list element. (type `BreadcrumbListProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `BreadcrumbItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `BreadcrumbLinkProps`; optional)
- `pageProps`: Properties forwarded to the page element. (type `BreadcrumbPageProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `BreadcrumbSeparatorProps`; optional)
- `ellipsisProps`: Properties forwarded to the ellipsis element. (type `BreadcrumbEllipsisProps`; optional)
#### Emits
Events for the Breadcrumb component.
- `click`: Emitted when click occurs. (type `[item: T]`; parameters `item: T`)
#### Slots
Slots for the Breadcrumb component.
- `default`: Custom content for the default slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `ellipsis`: Custom content for the ellipsis slot. (type `((props: BreadcrumbCompactEllipsisSlotProps<T>) => any) | undefined`)
- `ellipsis-icon`: Custom content for the ellipsis icon slot. (type `(() => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `(() => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `item-link`: Custom content for the item link slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `item-label`: Custom content for the item label slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)

### BreadcrumbCompact

#### Props
Properties for the BreadcrumbCompact component.
- `items`: Items rendered by the component. (type `T[]`; required)
- `ellipsis`: The range of items to show ellipsis. When the item count is greater than 4, we will show ellipsis. (type `true | [number, number] | null`; optional)
- `listProps`: Properties forwarded to the list element. (type `BreadcrumbListProps`; optional)
- `itemProps`: Properties forwarded to the item element. (type `BreadcrumbItemProps`; optional)
- `linkProps`: Properties forwarded to the link element. (type `BreadcrumbLinkProps`; optional)
- `pageProps`: Properties forwarded to the page element. (type `BreadcrumbPageProps`; optional)
- `separatorProps`: Properties forwarded to the separator element. (type `BreadcrumbSeparatorProps`; optional)
- `ellipsisProps`: Properties forwarded to the ellipsis element. (type `BreadcrumbEllipsisProps`; optional)
#### Emits
Events for the BreadcrumbCompact component.
- `click`: Emitted when click occurs. (type `[item: T]`; parameters `item: T`)
#### Slots
Slots for the BreadcrumbCompact component.
- `default`: Custom content for the default slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `ellipsis`: Custom content for the ellipsis slot. (type `((props: BreadcrumbCompactEllipsisSlotProps<T>) => any) | undefined`)
- `ellipsis-icon`: Custom content for the ellipsis icon slot. (type `(() => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `(() => any) | undefined`)
- `item-leading`: Custom content for the item leading slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `item-link`: Custom content for the item link slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `item-label`: Custom content for the item label slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)
- `item-trailing`: Custom content for the item trailing slot. (type `((props: BreadcrumbCompactItemSlotProps<T>) => any) | undefined`)

### BreadcrumbCompactEllipsis

#### Slot Props
Slot properties for the BreadcrumbCompactEllipsis component.
- `ellipsisItems`: Ellipsis items exposed in the slot scope. (type `T[]`; required)

### BreadcrumbCompactItem

#### Slot Props
Slot properties for the BreadcrumbCompactItem component.
- `item`: Current item data. (type `T`; required)
- `index`: Index of the current item. (type `number`; required)

### BreadcrumbEllipsis

- No documented props, emits, slots, or slot props were available.

### BreadcrumbItem

- No documented props, emits, slots, or slot props were available.

### BreadcrumbLink

#### Props
Properties for the BreadcrumbLink component.
- `to`: Route Location the link should navigate to when clicked on. (type `string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric`; optional)
- `replace`: Calls `router.replace` instead of `router.push`. (type `boolean`; optional)
- `href`: The URL the link should navigate to when clicked on. (type `string`; optional)
- `disabled`: When `true`, the link is disabled. (type `boolean`; optional)
- `activeClass`: Class to apply when the link is active (type `string`; optional)
- `exactActiveClass`: Class to apply when the link is exact active (type `string`; optional)
- `inactiveClass`: The class to apply to the link when it is inactive. (type `string`; optional)
- `prefetchedClass`: A class to apply to links that have been prefetched. (type `string`; optional)
- `external`: Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases (type `boolean`; optional)
- `ariaCurrentValue`: Value passed to the attribute `aria-current` when the link is exact active. (type `'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time'`; default ``'page'``; optional)
- `viewTransition`: Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported. (type `boolean`; optional)
- `target`: Where to display the linked URL, as the name for a browsing context. (type `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null`; optional)
- `rel`: A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links. (type `(string & {}) | 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | null`; default `'noopener noreferrer'`; optional)
- `noRel`: If set to true, no rel attribute will be added to the link (type `boolean`; optional)
- `prefetch`: When enabled will prefetch middleware, layouts and payloads of links in the viewport. (type `boolean`; optional)
- `prefetchOn`: Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility. (type `'visibility' | 'interaction' | Partial<{ visibility: boolean; interaction: boolean; }>`; optional)
- `noPrefetch`: Escape hatch to disable `prefetch` attribute. (type `boolean`; optional)
- `trailingSlash`: An option to either add or remove trailing slashes in the `href` for this specific link. Overrides the global `trailingSlash` option if provided. (type `'append' | 'remove'`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### BreadcrumbList

- No documented props, emits, slots, or slot props were available.

### BreadcrumbPage

- No documented props, emits, slots, or slot props were available.

### BreadcrumbRoot

- No documented props, emits, slots, or slot props were available.

### BreadcrumbSeparator

- No documented props, emits, slots, or slot props were available.
