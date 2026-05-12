# Slider

Source URL: https://ui.soybeanjs.cn/components/slider
Markdown URL: https://ui.soybeanjs.cn/components/slider.md
Category: Forms
Description: A slider component for selecting one or more numeric values within a continuous range, with horizontal and vertical support.

## Overview

A slider component for selecting one or more numeric values within a continuous range, with horizontal and vertical support.

## Usage

Usage examples for slider are rendered on the site.

## Demo

Interactive demos for slider are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (6): Slider, SliderCompact, SliderRange, SliderRoot, SliderThumb, SliderTrack.

### Slider

#### Props
Properties for the Slider component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<SliderUi>`; optional)
- `trackProps`: Properties forwarded to the track element. (type `SliderTrackProps`; optional)
- `rangeProps`: Properties forwarded to the range element. (type `SliderRangeProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `BaseProps`; optional)
- `modelValue`: The controlled value of the slider. Can be bind as `v-model`. (type `number[]`; optional)
- `defaultValue`: The initial value of the slider when uncontrolled. (type `number[]`; optional)
- `disabled`: Whether the slider is disabled. (type `boolean`; optional)
- `orientation`: The orientation of the slider. (type `DataOrientation`; optional)
- `dir`: The reading direction of the slider. (type `Direction`; optional)
- `inverted`: Whether the slider value direction is inverted. (type `boolean`; optional)
- `min`: The minimum value. (type `number`; optional)
- `max`: The maximum value. (type `number`; optional)
- `step`: The stepping interval. (type `number`; optional)
- `minStepsBetweenThumbs`: The minimum permitted steps between multiple thumbs. (type `number`; optional)
- `thumbAlignment`: Whether thumbs stay within the track bounds or may overflow it. (type `SliderThumbAlignment`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Slider component.
- `update:modelValue`: Event handler called when the slider value changes. (type `[value: number[]]`; parameters `value: number[]`)
- `valueCommit`: Event handler called when a slider interaction is committed. (type `[value: number[]]`; parameters `value: number[]`)

### SliderCompact

#### Props
Properties for the SliderCompact component.
- `trackProps`: Properties forwarded to the track element. (type `SliderTrackProps`; optional)
- `rangeProps`: Properties forwarded to the range element. (type `SliderRangeProps`; optional)
- `thumbProps`: Properties forwarded to the thumb element. (type `BaseProps`; optional)
- `modelValue`: The controlled value of the slider. Can be bind as `v-model`. (type `number[]`; optional)
- `defaultValue`: The initial value of the slider when uncontrolled. (type `number[]`; optional)
- `disabled`: Whether the slider is disabled. (type `boolean`; optional)
- `orientation`: The orientation of the slider. (type `DataOrientation`; optional)
- `dir`: The reading direction of the slider. (type `Direction`; optional)
- `inverted`: Whether the slider value direction is inverted. (type `boolean`; optional)
- `min`: The minimum value. (type `number`; optional)
- `max`: The maximum value. (type `number`; optional)
- `step`: The stepping interval. (type `number`; optional)
- `minStepsBetweenThumbs`: The minimum permitted steps between multiple thumbs. (type `number`; optional)
- `thumbAlignment`: Whether thumbs stay within the track bounds or may overflow it. (type `SliderThumbAlignment`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the SliderCompact component.
- `update:modelValue`: Event handler called when the slider value changes. (type `[value: number[]]`; parameters `value: number[]`)
- `valueCommit`: Event handler called when a slider interaction is committed. (type `[value: number[]]`; parameters `value: number[]`)
#### Slots
Slots for the SliderCompact component.
- `default`: Custom content for the default slot. (type `((props: SliderCompactSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the SliderCompact component.
- `modelValue`: Current model value. (type `number[]`; required)
- `index`: Current thumb index. (type `number`; required)
- `value`: Current thumb value. (type `number`; required)

### SliderRange

#### Props
Properties for the SliderRange component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### SliderRoot

#### Props
Properties for the SliderRoot component.
- `modelValue`: The controlled value of the slider. Can be bind as `v-model`. (type `number[]`; optional)
- `defaultValue`: The initial value of the slider when uncontrolled. (type `number[]`; optional)
- `disabled`: Whether the slider is disabled. (type `boolean`; optional)
- `orientation`: The orientation of the slider. (type `DataOrientation`; optional)
- `dir`: The reading direction of the slider. (type `Direction`; optional)
- `inverted`: Whether the slider value direction is inverted. (type `boolean`; optional)
- `min`: The minimum value. (type `number`; optional)
- `max`: The maximum value. (type `number`; optional)
- `step`: The stepping interval. (type `number`; optional)
- `minStepsBetweenThumbs`: The minimum permitted steps between multiple thumbs. (type `number`; optional)
- `thumbAlignment`: Whether thumbs stay within the track bounds or may overflow it. (type `SliderThumbAlignment`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the SliderRoot component.
- `update:modelValue`: Event handler called when the slider value changes. (type `[value: number[]]`; parameters `value: number[]`)
- `valueCommit`: Event handler called when a slider interaction is committed. (type `[value: number[]]`; parameters `value: number[]`)

### SliderThumb

#### Props
Properties for the SliderThumb component.
- `index`: The thumb index in the current slider value array. (type `number`; required)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### SliderTrack

#### Props
Properties for the SliderTrack component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
