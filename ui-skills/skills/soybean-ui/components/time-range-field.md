# TimeRangeField

Source URL: https://ui.soybeanjs.cn/components/time-range-field
Markdown URL: https://ui.soybeanjs.cn/components/time-range-field.md
Category: Forms
Description: TimeRangeField is a segmented time range input with independent editable start and end time segments while still submitting native form values for both sides.

## Overview

TimeRangeField is a segmented time range input with independent editable start and end time segments while still submitting native form values for both sides.

## Usage

Usage examples for time-range-field are rendered on the site.

## Demo

Interactive demos for time-range-field are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (4): TimeRangeField, TimeRangeFieldCompact, TimeRangeFieldInput, TimeRangeFieldRoot.

### TimeRangeField

#### Props

Properties for the TimeRangeField component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<TimeRangeFieldUi>`; optional)
- `inputProps`: Properties forwarded to the input element. (type `TimeRangeFieldInputProps`; optional)
- `separator`: Separator. (type `string`; optional)
- `defaultValue`: Default value. (type `TimeRange`; optional)
- `modelValue`: Current model value. (type `TimeRange`; optional)
- `startName`: Start name. (type `string`; optional)
- `endName`: End name. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `placeholder`: Placeholder. (type `TimeValue`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `TimeValue`; optional)
- `maxValue`: Max value. (type `TimeValue`; optional)
- `minValue`: Min value. (type `TimeValue`; optional)
- `granularity`: Granularity. (type `TimeGranularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
- `isTimeUnavailable`: Whether the time is unavailable. (type `TimeMatcher`; optional)

#### Emits

Events for the TimeRangeField component.

- `update:modelValue`: Emitted when the model value changes. (type `[range: TimeRange]`; parameters `range: TimeRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[time: TimeValue]`; parameters `time: TimeValue`)
- `update:startValue`: Emitted when the start value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)
- `update:endValue`: Emitted when the end value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)

#### Slots

Slots for the TimeRangeField component.

- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `(() => any) | undefined`)

#### Slot Props

Slot Props for the TimeRangeField component.

- `modelValue`: Current model value. (type `TimeRange`; required)
- `startSegments`: Start segments. (type `DateFieldSegment[]`; required)
- `endSegments`: End segments. (type `DateFieldSegment[]`; required)
- `isInvalid`: Whether the field is invalid. (type `boolean`; required)

### TimeRangeFieldCompact

#### Props

Properties for the TimeRangeFieldCompact component.

- `inputProps`: Properties forwarded to the input element. (type `TimeRangeFieldInputProps`; optional)
- `separator`: Separator. (type `string`; optional)
- `defaultValue`: Default value. (type `TimeRange`; optional)
- `modelValue`: Current model value. (type `TimeRange`; optional)
- `startName`: Start name. (type `string`; optional)
- `endName`: End name. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `placeholder`: Placeholder. (type `TimeValue`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `TimeValue`; optional)
- `maxValue`: Max value. (type `TimeValue`; optional)
- `minValue`: Min value. (type `TimeValue`; optional)
- `granularity`: Granularity. (type `TimeGranularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
- `isTimeUnavailable`: Whether the time is unavailable. (type `TimeMatcher`; optional)

#### Emits

Events for the TimeRangeFieldCompact component.

- `update:modelValue`: Emitted when the model value changes. (type `[range: TimeRange]`; parameters `range: TimeRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[time: TimeValue]`; parameters `time: TimeValue`)
- `update:startValue`: Emitted when the start value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)
- `update:endValue`: Emitted when the end value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)

#### Slots

Slots for the TimeRangeFieldCompact component.

- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `(() => any) | undefined`)

### TimeRangeFieldInput

#### Props

Properties for the TimeRangeFieldInput component.

- `type`: Type. (type `'start' | 'end'`; optional)
- `part`: Part. (type `import("../../date").EditableSegmentPart | import("../../date").NonEditableSegmentPart`; required)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### TimeRangeFieldRoot

#### Props

Properties for the TimeRangeFieldRoot component.

- `defaultValue`: Default value. (type `TimeRange`; optional)
- `modelValue`: Current model value. (type `TimeRange`; optional)
- `startName`: Start name. (type `string`; optional)
- `endName`: End name. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `placeholder`: Placeholder. (type `TimeValue`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `TimeValue`; optional)
- `maxValue`: Max value. (type `TimeValue`; optional)
- `minValue`: Min value. (type `TimeValue`; optional)
- `granularity`: Granularity. (type `TimeGranularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
- `isTimeUnavailable`: Whether the time is unavailable. (type `TimeMatcher`; optional)

#### Emits

Events for the TimeRangeFieldRoot component.

- `update:modelValue`: Emitted when the model value changes. (type `[range: TimeRange]`; parameters `range: TimeRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[time: TimeValue]`; parameters `time: TimeValue`)
- `update:startValue`: Emitted when the start value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)
- `update:endValue`: Emitted when the end value changes. (type `[time: TimeValue | undefined]`; parameters `time: TimeValue | undefined`)

#### Slots

Slots for the TimeRangeField component.

- `default`: Custom content for the default slot. (type `((props: TimeRangeFieldSlotProps) => any) | undefined`)
