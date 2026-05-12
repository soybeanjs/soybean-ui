# DateRangeField

Source URL: https://ui.soybeanjs.cn/components/date-range-field
Markdown URL: https://ui.soybeanjs.cn/components/date-range-field.md
Category: Forms
Description: DateRangeField is a segmented date range input that provides two sets of editable date segments for selecting a start and end date, while submitting native form values for both dates.

## Overview

DateRangeField is a segmented date range input that provides two sets of editable date segments for selecting a start and end date, while submitting native form values for both dates.

## Usage

Usage examples for date-range-field are rendered on the site.

## Demo

Interactive demos for date-range-field are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (4): DateRangeField, DateRangeFieldCompact, DateRangeFieldInput, DateRangeFieldRoot.

### DateRangeField

#### Props
Properties for the DateRangeField component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DateRangeFieldUi>`; optional)
- `inputProps`: Properties forwarded to the input element. (type `DateRangeFieldInputProps`; optional)
- `separator`: Separator. (type `string`; optional)
- `defaultValue`: Default value. (type `DateRange`; optional)
- `modelValue`: Current model value. (type `DateRange`; optional)
- `startName`: Start name. (type `string`; optional)
- `endName`: End name. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `granularity`: Granularity. (type `Granularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
#### Emits
Events for the DateRangeField component.
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
- `update:endValue`: Emitted when the end value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
#### Slots
Slots for the DateRangeField component.
- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `(() => any) | undefined`)
#### Slot Props
Slot properties for the DateRangeField component.
- `startSegments`: Start segments used by the component context. (type `DateFieldSegment[]`; required)
- `endSegments`: End segments used by the component context. (type `DateFieldSegment[]`; required)
- `modelValue`: Current model value. (type `DateRange`; required)
- `isInvalid`: Whether the date is invalid. (type `boolean`; required)

### DateRangeFieldCompact

#### Props
Properties for the DateRangeFieldCompact component.
- `inputProps`: Properties forwarded to the input element. (type `DateRangeFieldInputProps`; optional)
- `separator`: Separator. (type `string`; optional)
- `defaultValue`: Default value. (type `DateRange`; optional)
- `modelValue`: Current model value. (type `DateRange`; optional)
- `startName`: Start name. (type `string`; optional)
- `endName`: End name. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `granularity`: Granularity. (type `Granularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
#### Emits
Events for the DateRangeFieldCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
- `update:endValue`: Emitted when the end value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
#### Slots
Slots for the DateRangeFieldCompact component.
- `leading`: Custom content for the leading slot. (type `(() => any) | undefined`)
- `trailing`: Custom content for the trailing slot. (type `(() => any) | undefined`)
- `separator`: Custom content for the separator slot. (type `(() => any) | undefined`)

### DateRangeFieldInput

#### Props
Properties for the DateRangeFieldInput component.
- `type`: Type. (type `DateRangeType`; optional)
- `part`: Part. (type `import("../../date").EditableSegmentPart | import("../../date").NonEditableSegmentPart`; required)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### DateRangeFieldRoot

#### Props
Properties for the DateRangeFieldRoot component.
- `defaultValue`: Default value. (type `DateRange`; optional)
- `modelValue`: Current model value. (type `DateRange`; optional)
- `startName`: Start name. (type `string`; optional)
- `endName`: End name. (type `string`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `id`: Id. (type `string`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `step`: Step. (type `DateStep`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `granularity`: Granularity. (type `Granularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
#### Emits
Events for the DateRangeFieldRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
- `update:endValue`: Emitted when the end value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
#### Slots
Slots for the DateRangeFieldRoot component.
- `default`: Custom content for the default slot. (type `((props: DateRangeFieldSlotProps) => any) | undefined`)
