# Color Area

Source URL: https://ui.soybeanjs.cn/components/color-area
Markdown URL: https://ui.soybeanjs.cn/components/color-area.md
Category: Forms
Description: A two-dimensional color editor for saturation/lightness, saturation/brightness, or OKLCH chroma/lightness selection.

## Overview

A two-dimensional color editor for saturation/lightness, saturation/brightness, or OKLCH chroma/lightness selection.

## Usage

Usage examples for color-area are rendered on the site.

## Demo

Interactive demos for color-area are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): ColorArea, ColorAreaArea, ColorAreaCompact, ColorAreaRoot, ColorAreaThumb.

### ColorArea

#### Props

Properties for the ColorArea component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ColorAreaUi>`; optional)
- `areaProps`: Properties forwarded to the area element. (type `ColorAreaAreaProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `ColorAreaThumbProps`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `xChannel`: X channel. (type `ColorAreaAxisChannel`; optional)
- `yChannel`: Y channel. (type `ColorAreaAxisChannel`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `xName`: X name. (type `string`; optional)
- `yName`: Y name. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ColorArea component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `changeEnd`: Emitted when change end occurs. (type `[value: string]`; parameters `value: string`)

### ColorAreaArea

#### Props

Properties for the ColorAreaArea component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ColorAreaCompact

#### Props

Properties for the ColorAreaCompact component.

- `areaProps`: Properties forwarded to the area element. (type `ColorAreaAreaProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `ColorAreaThumbProps`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `xChannel`: X channel. (type `ColorAreaAxisChannel`; optional)
- `yChannel`: Y channel. (type `ColorAreaAxisChannel`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `xName`: X name. (type `string`; optional)
- `yName`: Y name. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ColorAreaCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `changeEnd`: Emitted when change end occurs. (type `[value: string]`; parameters `value: string`)

### ColorAreaRoot

#### Props

Properties for the ColorAreaRoot component.

- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `format`: Format. (type `ColorFormat`; optional)
- `xChannel`: X channel. (type `ColorAreaAxisChannel`; optional)
- `yChannel`: Y channel. (type `ColorAreaAxisChannel`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `xName`: X name. (type `string`; optional)
- `yName`: Y name. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ColorAreaRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `changeEnd`: Emitted when change end occurs. (type `[value: string]`; parameters `value: string`)

### ColorAreaThumb

#### Props

Properties for the ColorAreaThumb component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
