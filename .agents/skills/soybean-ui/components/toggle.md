# Toggle

Source URL: https://ui.soybeanjs.cn/components/toggle
Markdown URL: https://ui.soybeanjs.cn/components/toggle.md
Category: Forms
Description: A two-state button that toggles between pressed and unpressed.

## Overview

A two-state button that toggles between pressed and unpressed.

## Usage

Usage examples for toggle are rendered on the site.

## Demos

Interactive demos for toggle are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (1): Toggle.

### Toggle

#### Props
Properties for the Toggle component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `variant`: Visual variant of the component. (type `ToggleVariant`; optional)
- `shape`: Shape of the component. (type `ToggleShape`; optional)
- `defaultValue`: The pressed state of the toggle when it is initially rendered. (type `boolean`; optional)
- `modelValue`: The controlled pressed state of the toggle. Can be bound with v-model. (type `boolean`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Toggle component.
- `update:modelValue`: Event handler called when the pressed state changes. (type `[value: boolean]`; parameters `value: boolean`)
