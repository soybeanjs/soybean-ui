# Pagination

Source URL: https://ui.soybeanjs.cn/components/pagination
Markdown URL: https://ui.soybeanjs.cn/components/pagination.md
Category: Navigation
Description: Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.

## Overview

Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.

## Usage

Usage examples for pagination are rendered on the site.

## Demos

Interactive demos for pagination are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (11): Pagination, PaginationButton, PaginationCompact, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, PaginationRoot.

### Pagination

#### Props
Properties for the Pagination component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: The custom ui class names (type `Partial<PaginationUi>`; optional)
- `size`: The size of the pagination (type `ThemeSize`; optional)
- `variant`: The variant of the pagination (type `PaginationVariant`; optional)
- `shape`: The shape of the pagination (type `PaginationShape`; optional)
- `actionAsSelected`: Whether to apply the selected state to the action button (type `boolean`; optional)
- `showFirstOrLast`: Whether to show a first or last. (type `boolean`; optional)
- `listProps`: Properties forwarded to the list element. (type `PaginationListProps`; optional)
- `listItemProps`: Properties forwarded to the list item element. (type `PaginationListItemProps`; optional)
- `ellipsisProps`: Properties forwarded to the ellipsis element. (type `PaginationEllipsisProps`; optional)
- `firstProps`: Properties forwarded to the first element. (type `PaginationButtonProps`; optional)
- `prevProps`: Properties forwarded to the prev element. (type `PaginationButtonProps`; optional)
- `nextProps`: Properties forwarded to the next element. (type `PaginationButtonProps`; optional)
- `lastProps`: Properties forwarded to the last element. (type `PaginationButtonProps`; optional)
- `page`: The controlled value of the current page. Can be bound as `v-model:page`. (type `number`; optional)
- `defaultPage`: The value of the page that should be active when initially rendered. Use when you do not need to control the value state. (type `number`; optional)
- `pageSize`: Number of items per page (type `number`; optional)
- `defaultPageSize`: The default value of `pageSize` when initially rendered. Use when you do not need to control the value state. (type `number`; default `10`; optional)
- `total`: Number of items in your list (type `number`; optional)
- `siblingCount`: Number of sibling should be shown around the current page (type `number`; optional)
- `disabled`: When `true`, prevents the user from interacting with item (type `boolean`; optional)
- `showEdges`: When `true`, always show first page, last page, and ellipsis (type `boolean`; optional)
#### Emits
Events for the Pagination component.
- `update:page`: Event handler called when the page value changes (type `[value: number]`; parameters `value: number`)
- `update:pageSize`: Event handler called when the page size value changes (type `[value: number]`; parameters `value: number`)
#### Slots
Slots for the Pagination component.
- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `first`: Custom content for the first slot. (type `(() => any) | undefined`)
- `prev`: Custom content for the prev slot. (type `(() => any) | undefined`)
- `next`: Custom content for the next slot. (type `(() => any) | undefined`)
- `last`: Custom content for the last slot. (type `(() => any) | undefined`)
- `ellipsis`: Custom content for the ellipsis slot. (type `(() => any) | undefined`)

### PaginationButton

#### Props
Properties for the PaginationButton component.
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### PaginationCompact

#### Props
Properties for the PaginationCompact component.
- `showFirstOrLast`: Whether to show a first or last. (type `boolean`; optional)
- `listProps`: Properties forwarded to the list element. (type `PaginationListProps`; optional)
- `listItemProps`: Properties forwarded to the list item element. (type `PaginationListItemProps`; optional)
- `ellipsisProps`: Properties forwarded to the ellipsis element. (type `PaginationEllipsisProps`; optional)
- `firstProps`: Properties forwarded to the first element. (type `PaginationButtonProps`; optional)
- `prevProps`: Properties forwarded to the prev element. (type `PaginationButtonProps`; optional)
- `nextProps`: Properties forwarded to the next element. (type `PaginationButtonProps`; optional)
- `lastProps`: Properties forwarded to the last element. (type `PaginationButtonProps`; optional)
- `page`: The controlled value of the current page. Can be bound as `v-model:page`. (type `number`; optional)
- `defaultPage`: The value of the page that should be active when initially rendered. Use when you do not need to control the value state. (type `number`; optional)
- `pageSize`: Number of items per page (type `number`; optional)
- `defaultPageSize`: The default value of `pageSize` when initially rendered. Use when you do not need to control the value state. (type `number`; default `10`; optional)
- `total`: Number of items in your list (type `number`; optional)
- `siblingCount`: Number of sibling should be shown around the current page (type `number`; optional)
- `disabled`: When `true`, prevents the user from interacting with item (type `boolean`; optional)
- `showEdges`: When `true`, always show first page, last page, and ellipsis (type `boolean`; optional)
#### Emits
Events for the PaginationCompact component.
- `update:page`: Event handler called when the page value changes (type `[value: number]`; parameters `value: number`)
- `update:pageSize`: Event handler called when the page size value changes (type `[value: number]`; parameters `value: number`)
#### Slots
Slots for the PaginationCompact component.
- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `first`: Custom content for the first slot. (type `(() => any) | undefined`)
- `prev`: Custom content for the prev slot. (type `(() => any) | undefined`)
- `next`: Custom content for the next slot. (type `(() => any) | undefined`)
- `last`: Custom content for the last slot. (type `(() => any) | undefined`)
- `ellipsis`: Custom content for the ellipsis slot. (type `(() => any) | undefined`)

### PaginationEllipsis

- No documented props, emits, slots, or slot props were available.

### PaginationFirst

- No documented props, emits, slots, or slot props were available.

### PaginationLast

- No documented props, emits, slots, or slot props were available.

### PaginationList

- No documented props, emits, slots, or slot props were available.

### PaginationListItem

#### Props
Properties for the PaginationListItem component.
- `value`: Value for the page (type `number`; required)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### PaginationNext

- No documented props, emits, slots, or slot props were available.

### PaginationPrev

- No documented props, emits, slots, or slot props were available.

### PaginationRoot

#### Props
Properties for the PaginationRoot component.
- `page`: The controlled value of the current page. Can be bound as `v-model:page`. (type `number`; optional)
- `defaultPage`: The value of the page that should be active when initially rendered. Use when you do not need to control the value state. (type `number`; optional)
- `pageSize`: Number of items per page (type `number`; optional)
- `defaultPageSize`: The default value of `pageSize` when initially rendered. Use when you do not need to control the value state. (type `number`; default `10`; optional)
- `total`: Number of items in your list (type `number`; optional)
- `siblingCount`: Number of sibling should be shown around the current page (type `number`; optional)
- `disabled`: When `true`, prevents the user from interacting with item (type `boolean`; optional)
- `showEdges`: When `true`, always show first page, last page, and ellipsis (type `boolean`; optional)
#### Emits
Events for the PaginationRoot component.
- `update:page`: Event handler called when the page value changes (type `[value: number]`; parameters `value: number`)
- `update:pageSize`: Event handler called when the page size value changes (type `[value: number]`; parameters `value: number`)
