# Button

Source URL: https://ui.soybeanjs.cn/components/button
Markdown URL: https://ui.soybeanjs.cn/components/button.md
Category: General
Description: A button component that can be used to trigger an action.

## Overview

A button component that can be used to trigger an action.

## Usage

Usage examples for button are rendered on the site.

## Features

- 🎨 8 variants: solid, outline, dashed, soft, ghost, link, plain, pure
- 🌈 8 colors: primary, destructive, success, warning, info, carbon, secondary, accent
- 📏 6 sizes: xs, sm, md, lg, xl, 2xl
- 🔲 4 shapes: auto, rounded, square, circle
- ⚡ Loading state support
- 🌐 Link function support (SButtonLink)
- ♿ Full accessibility support
- 🎯 TypeScript type safety

## Button component family

- **SButton** - Basic button component
- **SButtonLink** - Link button, supports route navigation
- **SButtonIcon** - Icon button, compact design
- **SButtonLoading** - Loading state button
- **SButtonGroup** - Button group component

## Demos

Interactive demos for button are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): Button, ButtonGroup, ButtonIcon, ButtonLink, ButtonLoading.

### Button

#### Props

Properties for the Button component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ButtonVariant`; optional)
- `shape`: Shape of the component. (type `ButtonShape`; optional)
- `shadow`: Shadow style of the component. (type `ButtonShadow`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the Button component.

- `click`: Emitted when click occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)

### ButtonGroup

#### Props

Properties for the ButtonGroup component.

- `orientation`: The orientation of the button group. (type `DataOrientation`; default `'horizontal'`; optional)
- `dir`: The direction of the button group. (type `Direction`; default `'ltr'`; optional)
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ButtonVariant`; optional)
- `shape`: Shape of the component. (type `ButtonShape`; optional)
- `shadow`: Shadow style of the component. (type `ButtonShadow`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ButtonIcon

#### Props

Properties for the ButtonIcon component.

- `icon`: The icon value of iconify. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; required)
- `iconClass`: The class of the icon. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `iconProps`: The props of the icon. (type `Partial<IconProps>`; optional)
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ButtonVariant`; optional)
- `shape`: Shape of the component. (type `ButtonShape`; optional)
- `shadow`: Shadow style of the component. (type `ButtonShadow`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ButtonLink

#### Props

Properties for the ButtonLink component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ButtonVariant`; optional)
- `shape`: Shape of the component. (type `ButtonShape`; optional)
- `shadow`: Shadow style of the component. (type `ButtonShadow`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. When `true`, the link is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `to`: Route Location the link should navigate to when clicked on. (type `string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric`; optional)
- `replace`: Calls `router.replace` instead of `router.push`. (type `boolean`; optional)
- `href`: The URL the link should navigate to when clicked on. (type `string`; optional)
- `activeClass`: Class to apply when the link is active (type `string`; optional)
- `exactActiveClass`: Class to apply when the link is exact active (type `string`; optional)
- `inactiveClass`: The class to apply to the link when it is inactive. (type `string`; optional)
- `prefetchedClass`: A class to apply to links that have been prefetched. (type `string`; optional)
- `external`: Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases (type `boolean`; optional)
- `ariaCurrentValue`: Value passed to the attribute `aria-current` when the link is exact active. (type `'true' | 'false' | 'date' | 'time' | 'page' | 'step' | 'location'`; default `'page'`; optional)
- `viewTransition`: Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported. (type `boolean`; optional)
- `target`: Where to display the linked URL, as the name for a browsing context. (type `'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null`; optional)
- `rel`: A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links. (type `(string & {}) | 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | null`; default `'noopener noreferrer'`; optional)
- `noRel`: If set to true, no rel attribute will be added to the link (type `boolean`; optional)
- `prefetch`: When enabled will prefetch middleware, layouts and payloads of links in the viewport. (type `boolean`; optional)
- `prefetchOn`: Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility. (type `'visibility' | 'interaction' | Partial<{ visibility: boolean; interaction: boolean; }>`; optional)
- `noPrefetch`: Escape hatch to disable `prefetch` attribute. (type `boolean`; optional)
- `trailingSlash`: An option to either add or remove trailing slashes in the `href` for this specific link. Overrides the global `trailingSlash` option if provided. (type `'append' | 'remove'`; optional)

### ButtonLoading

#### Props

Properties for the ButtonLoading component.

- `loading`: Whether the button is loading. (type `boolean`; default `false`; optional)
- `loadingText`: The text to display when the button is loading. It will be displayed when the loading position is center. (type `string`; optional)
- `loadingDuration`: The duration of the loading state in milliseconds. (type `number`; default `150 ms`; optional)
- `autoLoading`: Whether to automatically handle loading state during click event. When true, the button will show loading state during click event execution. When false, you need to manually control the loading state. (type `boolean`; default `false`; optional)
- `loadingIcon`: The icon name of iconify to display when the button is loading. (type `string | import("vue").Component | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, { [...`; default `'svg-spinners:270-ring'`; optional)
- `loadingIconProps`: The props of the loading icon. (type `Partial<IconProps>`; optional)
- `loadingPosition`: The position of the loading icon. (type `Align`; default `'start'`; optional)
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ButtonVariant`; optional)
- `shape`: Shape of the component. (type `ButtonShape`; optional)
- `shadow`: Shadow style of the component. (type `ButtonShadow`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
