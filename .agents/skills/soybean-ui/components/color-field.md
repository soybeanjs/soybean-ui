# Color Field

Source URL: https://ui.soybeanjs.cn/components/color-field
Markdown URL: https://ui.soybeanjs.cn/components/color-field.md
Category: Forms
Description: An input for editing either a full color string or a single channel, with support for `hex`, `rgb`, `hsl`, and `oklch` output.

## Overview

An input for editing either a full color string or a single channel, with support for `hex`, `rgb`, `hsl`, and `oklch` output.

## Usage

Usage examples for color-field are rendered on the site.

## Demo

Interactive demos for color-field are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (4): ColorField, ColorFieldCompact, ColorFieldInput, ColorFieldRoot.

### ColorField

#### Props
Properties for the ColorField component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ColorFieldUi>`; optional)
- `inputProps`: Properties forwarded to the input element. (type `ColorFieldInputProps`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `channel`: Channel. (type `ColorChannel`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `placeholder`: Placeholder. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `disableWheelChange`: Whether to disable wheel change. (type `boolean`; optional)
- `step`: Step. (type `number`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ColorField component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)

### ColorFieldCompact

#### Props
Properties for the ColorFieldCompact component.
- `inputProps`: Properties forwarded to the input element. (type `ColorFieldInputProps`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `channel`: Channel. (type `ColorChannel`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `placeholder`: Placeholder. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `disableWheelChange`: Whether to disable wheel change. (type `boolean`; optional)
- `step`: Step. (type `number`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ColorFieldCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)

### ColorFieldInput

- No documented props, emits, slots, or slot props were available.

### ColorFieldRoot

#### Props
Properties for the ColorFieldRoot component.
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `channel`: Channel. (type `ColorChannel`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `placeholder`: Placeholder. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `disableWheelChange`: Whether to disable wheel change. (type `boolean`; optional)
- `step`: Step. (type `number`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ColorFieldRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
