# Backtop

Source URL: https://ui.soybeanjs.cn/components/backtop
Markdown URL: https://ui.soybeanjs.cn/components/backtop.md
Category: Data Display
Description: Backtop reveals a floating button after the scroll target passes a threshold and scrolls that target back to the start when activated.

## Overview

Backtop reveals a floating button after the scroll target passes a threshold and scrolls that target back to the start when activated.

> Note: In addition to SBacktop, the headless layer also exports Backtop for custom composition.

## Usage

Usage examples for backtop are rendered on the site.

## Demos

Interactive demos for backtop are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (1): Backtop.

### Backtop

#### Props
Properties for the Backtop component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ButtonVariant`; optional)
- `shape`: Shape of the component. (type `ButtonShape`; optional)
- `shadow`: Shadow style of the component. (type `ButtonShadow`; optional)
- `fitContent`: Whether the component should fit its content width. (type `boolean`; optional)
- `icon`: The icon name of iconify. (type `string`; default `'lucide:arrow-up'`; optional)
- `iconClass`: The class of the icon. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `iconProps`: The props of the icon. (type `Partial<IconProps>`; optional)
- `visibilityHeight`: Scroll distance that must be reached before the Backtop button becomes visible. (type `number`; default `400`; optional)
- `target`: Scroll target that Backtop listens to and scrolls. (type `AffixTarget | null`; default `window`; optional)
- `duration`: Duration of the scroll-to-top animation in milliseconds. (type `number`; default `300`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
#### Emits
Events for the Backtop component.
- `change`: Emitted when change occurs. (type `[visible: boolean]`; parameters `visible: boolean`)
- `click`: Emitted when click occurs. (type `[event: PointerEvent]`; parameters `event: PointerEvent`)
