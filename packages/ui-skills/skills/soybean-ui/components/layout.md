# Layout

Source URL: https://ui.soybeanjs.cn/components/layout
Markdown URL: https://ui.soybeanjs.cn/components/layout.md
Category: Layout
Description: The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Overview

The layout component structure for admin dashboards or complex applications. It manages sidebar, header, footer, tabs, and main content areas.

## Usage

Usage examples for layout are rendered on the site.

## Demos

Interactive demos for layout are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (14): Layout, LayoutClassic, LayoutClassicCompact, LayoutCompact, LayoutContent, LayoutFooter, LayoutHeader, LayoutMain, LayoutMobile, LayoutRail, LayoutRoot, LayoutSidebar, LayoutTab, LayoutTrigger.

### Layout

#### Props

Properties for the Layout component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<LayoutUi>`; optional)
- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `variant`: The variant of the layout. (type `LayoutVariant`; optional)
- `collapsible`: The collapsible state of the layout. (type `LayoutCollapsible`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `sidebarProps`: No description. (type `LayoutSidebarProps`; optional)
- `railProps`: No description. (type `LayoutRailProps`; optional)
- `mainProps`: No description. (type `LayoutMainProps`; optional)
- `headerProps`: No description. (type `LayoutHeaderProps`; optional)
- `tabProps`: No description. (type `LayoutTabProps`; optional)
- `contentProps`: No description. (type `LayoutContentProps`; optional)
- `footerProps`: No description. (type `LayoutFooterProps`; optional)
- `mobileProps`: No description. (type `LayoutMobileProps`; optional)

#### Emits

Events for the Layout component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the Layout component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `sidebar`: Custom content for the sidebar slot. (type `((props: { open: boolean | undefined; collapsedSidebarWidth: number; }) => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `tab`: Custom content for the tab slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)

### LayoutClassic

#### Props

Properties for the LayoutClassic component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<LayoutClassicUi>`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `scrollBehavior`: Scroll behavior. (type `LayoutClassicScrollBehavior`; optional)
- `scrollId`: Scroll id. (type `string`; optional)
- `baseZIndex`: The base z-index of the layout. The z-index of the sidebar, header, tab, footer, and their fixed versions will be calculated based on this value. (type `number`; default `50`; optional)
- `fixedTop`: Whether the header and tab are fixed to the top of the layout when the orientation is vertical. If true, the header and tab will be fixed to the top of the layout when the orientation is vertical, and will scroll with the content when the orientation is horizontal. (type `boolean`; default `true`; optional)
- `fixedFooter`: Whether footer is fixed (type `boolean`; default `true`; optional)
- `stretchFooter`: Whether the footer should stretch to the full width of the layout or the content when layout orientation is vertical. (type `boolean`; default `true`; optional)
- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `sidebarProps`: No description. (type `LayoutSidebarProps`; optional)
- `railProps`: No description. (type `LayoutRailProps`; optional)
- `mainProps`: No description. (type `LayoutMainProps`; optional)
- `headerProps`: No description. (type `LayoutHeaderProps`; optional)
- `tabProps`: No description. (type `LayoutTabProps`; optional)
- `contentProps`: No description. (type `LayoutContentProps`; optional)
- `footerProps`: No description. (type `LayoutFooterProps`; optional)
- `mobileProps`: No description. (type `LayoutMobileProps`; optional)

#### Emits

Events for the LayoutClassic component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the LayoutClassic component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `sidebar`: Custom content for the sidebar slot. (type `((props: { open: boolean | undefined; collapsedSidebarWidth: number; }) => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `tab`: Custom content for the tab slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)

### LayoutClassicCompact

#### Props

Properties for the LayoutClassicCompact component.

- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `scrollBehavior`: Scroll behavior. (type `LayoutClassicScrollBehavior`; optional)
- `scrollId`: Scroll id. (type `string`; optional)
- `baseZIndex`: The base z-index of the layout. The z-index of the sidebar, header, tab, footer, and their fixed versions will be calculated based on this value. (type `number`; default `50`; optional)
- `fixedTop`: Whether the header and tab are fixed to the top of the layout when the orientation is vertical. If true, the header and tab will be fixed to the top of the layout when the orientation is vertical, and will scroll with the content when the orientation is horizontal. (type `boolean`; default `true`; optional)
- `fixedFooter`: Whether footer is fixed (type `boolean`; default `true`; optional)
- `stretchFooter`: Whether the footer should stretch to the full width of the layout or the content when layout orientation is vertical. (type `boolean`; default `true`; optional)
- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `sidebarProps`: No description. (type `LayoutSidebarProps`; optional)
- `railProps`: No description. (type `LayoutRailProps`; optional)
- `mainProps`: No description. (type `LayoutMainProps`; optional)
- `headerProps`: No description. (type `LayoutHeaderProps`; optional)
- `tabProps`: No description. (type `LayoutTabProps`; optional)
- `contentProps`: No description. (type `LayoutContentProps`; optional)
- `footerProps`: No description. (type `LayoutFooterProps`; optional)
- `mobileProps`: No description. (type `LayoutMobileProps`; optional)

#### Emits

Events for the LayoutClassicCompact component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the LayoutClassicCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `sidebar`: Custom content for the sidebar slot. (type `((props: { open: boolean | undefined; collapsedSidebarWidth: number; }) => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `tab`: Custom content for the tab slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)

### LayoutCompact

#### Props

Properties for the LayoutCompact component.

- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `variant`: The variant of the layout. (type `LayoutVariant`; optional)
- `collapsible`: The collapsible state of the layout. (type `LayoutCollapsible`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)
- `sidebarProps`: No description. (type `LayoutSidebarProps`; optional)
- `railProps`: No description. (type `LayoutRailProps`; optional)
- `mainProps`: No description. (type `LayoutMainProps`; optional)
- `headerProps`: No description. (type `LayoutHeaderProps`; optional)
- `tabProps`: No description. (type `LayoutTabProps`; optional)
- `contentProps`: No description. (type `LayoutContentProps`; optional)
- `footerProps`: No description. (type `LayoutFooterProps`; optional)
- `mobileProps`: No description. (type `LayoutMobileProps`; optional)

#### Emits

Events for the LayoutCompact component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

#### Slots

Slots for the LayoutCompact component.

- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `sidebar`: Custom content for the sidebar slot. (type `((props: { open: boolean | undefined; collapsedSidebarWidth: number; }) => any) | undefined`)
- `header`: Custom content for the header slot. (type `(() => any) | undefined`)
- `tab`: Custom content for the tab slot. (type `(() => any) | undefined`)
- `content`: Custom content for the content slot. (type `(() => any) | undefined`)
- `footer`: Custom content for the footer slot. (type `(() => any) | undefined`)

### LayoutContent

- No documented props, emits, slots, or slot props were available.

### LayoutFooter

- No documented props, emits, slots, or slot props were available.

### LayoutHeader

- No documented props, emits, slots, or slot props were available.

### LayoutMain

- No documented props, emits, slots, or slot props were available.

### LayoutMobile

- No documented props, emits, slots, or slot props were available.

### LayoutRail

- No documented props, emits, slots, or slot props were available.

### LayoutRoot

#### Props

Properties for the LayoutRoot component.

- `open`: The controlled open state of the layout. Can be bound with `v-model`. (type `boolean`; optional)
- `defaultOpen`: The open state of the layout when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; optional)
- `side`: The side of the layout. (type `HorizontalSide`; optional)
- `variant`: The variant of the layout. (type `LayoutVariant`; optional)
- `collapsible`: The collapsible state of the layout. (type `LayoutCollapsible`; optional)
- `sidebarVisible`: whether to show the sidebar. (type `boolean`; default `true`; optional)
- `sidebarWidth`: The width of the sidebar. (px) (type `number`; default `240`; optional)
- `collapsedSidebarWidth`: The width of the sidebar when it is collapsed. (px) (type `number`; default `50`; optional)
- `isMobile`: Whether the layout is in mobile view. (type `boolean`; default `false`; optional)
- `mobileSidebarWidth`: The width of the sidebar in the mobile view. (px) (type `number`; default `240`; optional)
- `headerVisible`: whether to show the header. (type `boolean`; default `true`; optional)
- `headerHeight`: The height of the header. (px) (type `number`; default `56`; optional)
- `tabVisible`: whether to show the tab. (type `boolean`; default `true`; optional)
- `tabHeight`: The height of the tab. (px) (type `number`; default `44`; optional)
- `footerVisible`: whether to show the footer. (type `boolean`; default `true`; optional)
- `footerHeight`: The height of the footer. (px) (type `number`; default `48`; optional)
- `fullContent`: whether the content takes the full height of the layout (include). (type `boolean`; default `false`; optional)
- `pxToRem`: The function to convert pixels to rem. (type `((px: number) => number)`; default `(px: number) => px / 16 (16 is the base font size)`; optional)

#### Emits

Events for the LayoutRoot component.

- `update:open`: Emitted when the open state changes. (type `[open: boolean]`; parameters `open: boolean`)

### LayoutSidebar

- No documented props, emits, slots, or slot props were available.

### LayoutTab

- No documented props, emits, slots, or slot props were available.

### LayoutTrigger

#### Props

Properties for the LayoutTrigger component.

- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
