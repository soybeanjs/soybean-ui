# Color Slider

Source URL: https://ui.soybeanjs.cn/components/color-slider
Markdown URL: https://ui.soybeanjs.cn/components/color-slider.md
Category: Forms
Description: A single-channel color slider for hue, alpha, and individual RGB/HSL/HSV/OKLCH channels.

## Overview

A single-channel color slider for hue, alpha, and individual RGB/HSL/HSV/OKLCH channels.

## Usage

Usage examples for color-slider are rendered on the site.

## Demo

Interactive demos for color-slider are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (5): ColorSlider, ColorSliderCompact, ColorSliderRoot, ColorSliderThumb, ColorSliderTrack.

### ColorSlider

#### Props

Properties for the ColorSlider component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ColorSliderUi>`; optional)
- `trackProps`: Properties forwarded to the track element. (type `ColorSliderTrackProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `ColorSliderThumbProps`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `channel`: Channel. (type `'alpha' | 'hue' | 'saturation' | 'lightness' | 'brightness' | 'red' | 'green' | 'blue' | 'chroma'`; required)
- `format`: Format. (type `ColorFormat`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `inverted`: Whether inverted. (type `boolean`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `step`: Step. (type `number`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ColorSlider component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `changeEnd`: Emitted when change end occurs. (type `[value: string]`; parameters `value: string`)

### ColorSliderCompact

#### Props

Properties for the ColorSliderCompact component.

- `trackProps`: Properties forwarded to the track element. (type `ColorSliderTrackProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `ColorSliderThumbProps`; optional)
- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `channel`: Channel. (type `'alpha' | 'hue' | 'saturation' | 'lightness' | 'brightness' | 'red' | 'green' | 'blue' | 'chroma'`; required)
- `format`: Format. (type `ColorFormat`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `inverted`: Whether inverted. (type `boolean`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `step`: Step. (type `number`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ColorSliderCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `changeEnd`: Emitted when change end occurs. (type `[value: string]`; parameters `value: string`)

### ColorSliderRoot

#### Props

Properties for the ColorSliderRoot component.

- `modelValue`: Current model value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `defaultValue`: Default value. (type `import("@soybeanjs/colord").AnyColor`; optional)
- `colorSpace`: Color space. (type `ColorSpace`; optional)
- `channel`: Channel. (type `'alpha' | 'hue' | 'saturation' | 'lightness' | 'brightness' | 'red' | 'green' | 'blue' | 'chroma'`; required)
- `format`: Format. (type `ColorFormat`; optional)
- `orientation`: Orientation of the component. (type `DataOrientation`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `inverted`: Whether inverted. (type `boolean`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `step`: Step. (type `number`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

#### Emits

Events for the ColorSliderRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[value: string]`; parameters `value: string`)
- `update:color`: Emitted when the color value changes. (type `[value: NormalizedColor]`; parameters `value: NormalizedColor`)
- `change`: Emitted when change occurs. (type `[value: string]`; parameters `value: string`)
- `changeEnd`: Emitted when change end occurs. (type `[value: string]`; parameters `value: string`)

### ColorSliderThumb

#### Props

Properties for the ColorSliderThumb component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ColorSliderTrack

#### Props

Properties for the ColorSliderTrack component.

- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
