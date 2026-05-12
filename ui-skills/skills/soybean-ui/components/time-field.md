# TimeField

Source URL: https://ui.soybeanjs.cn/components/time-field
Markdown URL: https://ui.soybeanjs.cn/components/time-field.md
Category: Forms
Description: TimeField is a segmented time input for hour, minute, optional second, and locale-aware day period editing while still submitting a native form value.

## Overview

TimeField is a segmented time input for hour, minute, optional second, and locale-aware day period editing while still submitting a native form value.

## Usage

Usage examples for time-field are rendered on the site.

## Demo

Interactive demos for time-field are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): TimeField, TimeFieldCompact, TimeFieldInput, TimeFieldRoot.

### TimeField

#### Props

Properties for the TimeField component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<TimeFieldUi>`; optional)
- `inputProps`: Properties forwarded to the input element. (type `TimeFieldInputProps`; optional)
- `defaultValue`: Default value for the time field. (type `TimeValue`; optional)
- `modelValue`: Current model value. (type `TimeValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `TimeValue`; optional)
- `placeholder`: Placeholder. (type `TimeValue`; optional)
- `granularity`: Granularity. (type `TimeGranularity`; optional)
- `maxValue`: Max value. (type `TimeValue`; optional)
- `minValue`: Min value. (type `TimeValue`; optional)
- `isTimeUnavailable`: Whether the time is unavailable. (type `TimeMatcher`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)

#### Emits

Events for the TimeField component.

- `update:modelValue`: Emitted when the model value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[time: TimeValue]`; parameters `time: TimeValue`)

### TimeFieldCompact

#### Props

Properties for the time field compact component.

- `inputProps`: Properties forwarded to the input element. (type `TimeFieldInputProps`; optional)
- `defaultValue`: Default value for the time field. (type `TimeValue`; optional)
- `modelValue`: Current model value. (type `TimeValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `TimeValue`; optional)
- `placeholder`: Placeholder. (type `TimeValue`; optional)
- `granularity`: Granularity. (type `TimeGranularity`; optional)
- `maxValue`: Max value. (type `TimeValue`; optional)
- `minValue`: Min value. (type `TimeValue`; optional)
- `isTimeUnavailable`: Whether the time is unavailable. (type `TimeMatcher`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)

#### Emits

Events for the time field compact component.

- `update:modelValue`: Emitted when the model value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[time: TimeValue]`; parameters `time: TimeValue`)

### TimeFieldInput

- No documented props, emits, slots, or slot props were available.

### TimeFieldRoot

#### Props

Properties for the TimeFieldRoot component.

- `defaultValue`: Default value for the time field. (type `TimeValue`; optional)
- `modelValue`: Current model value. (type `TimeValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `TimeValue`; optional)
- `placeholder`: Placeholder. (type `TimeValue`; optional)
- `granularity`: Granularity. (type `TimeGranularity`; optional)
- `maxValue`: Max value. (type `TimeValue`; optional)
- `minValue`: Min value. (type `TimeValue`; optional)
- `isTimeUnavailable`: Whether the time is unavailable. (type `TimeMatcher`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)

#### Emits

Events for the TimeFieldRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[time: TimeValue]`; parameters `time: TimeValue`)

#### Slots

Slots for the TimeFieldRoot component.

- `default`: No description. (type `((props: TimeFieldRootSlotProps) => any) | undefined`)

#### Slot Props

Slot properties for the TimeFieldRoot component.

- `modelValue`: Current model value. (type `TimeValue | undefined`; required)
- `segments`: Segments used by the default slot. (type `DateFieldSegment[]`; required)
- `isInvalid`: Whether the current value is invalid. (type `boolean`; required)
