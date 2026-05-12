# DateField

Source URL: https://ui.soybeanjs.cn/components/date-field
Markdown URL: https://ui.soybeanjs.cn/components/date-field.md
Category: Forms
Description: DateField is a segmented date input that keeps keyboard-editable parts for day, month, year, and optional time values while still submitting a native form value.

## Overview

DateField is a segmented date input that keeps keyboard-editable parts for day, month, year, and optional time values while still submitting a native form value.

## Usage

Usage examples for date-field are rendered on the site.

## Demo

Interactive demos for date-field are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (4): DateField, DateFieldCompact, DateFieldInput, DateFieldRoot.

### DateField

#### Props
Properties for the DateField component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DateFieldUi>`; optional)
- `inputProps`: Properties forwarded to the input element. (type `DateFieldInputProps`; optional)
- `id`: Id. (type `string`; optional)
- `granularity`: Granularity. (type `Granularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `step`: Step. (type `DateStep`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultValue`: Default value. (type `DateValue`; optional)
- `modelValue`: Current model value. (type `DateValue`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DateField component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: DateValue | undefined]`; parameters `value: DateValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[value: DateValue]`; parameters `value: DateValue`)

### DateFieldCompact

#### Props
Properties for the DateFieldCompact component.
- `inputProps`: Properties forwarded to the input element. (type `DateFieldInputProps`; optional)
- `id`: Id. (type `string`; optional)
- `granularity`: Granularity. (type `Granularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `step`: Step. (type `DateStep`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultValue`: Default value. (type `DateValue`; optional)
- `modelValue`: Current model value. (type `DateValue`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DateFieldCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: DateValue | undefined]`; parameters `value: DateValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[value: DateValue]`; parameters `value: DateValue`)

### DateFieldInput

#### Props
Properties for the DateFieldInput component.
- `part`: Part. (type `import("../../date").EditableSegmentPart | import("../../date").NonEditableSegmentPart`; required)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### DateFieldRoot

#### Props
Properties for the DateFieldRoot component.
- `id`: Id. (type `string`; optional)
- `granularity`: Granularity. (type `Granularity`; optional)
- `hourCycle`: Hour cycle. (type `12 | 24`; optional)
- `step`: Step. (type `DateStep`; optional)
- `hideTimeZone`: Whether hide time zone. (type `boolean`; optional)
- `name`: The name of the field. Submitted with its owning form as part of a name/value pair. (type `string`; optional)
- `required`: When `true`, indicates that the user must set the value before the owning form can be submitted. (type `boolean`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultValue`: Default value. (type `DateValue`; optional)
- `modelValue`: Current model value. (type `DateValue`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `locale`: Locale. (type `string`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the DateFieldRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: DateValue | undefined]`; parameters `value: DateValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[value: DateValue]`; parameters `value: DateValue`)
#### Slots
Slots for the DateFieldRoot component.
- `default`: No description. (type `((props: DateFieldRootSlotProps) => any) | undefined`)
#### Slot Props
Properties for the DateFieldRoot slot.
- `modelValue`: Current model value. (type `DateValue | undefined`; required)
- `segments`: Segments used by the default slot. (type `DateFieldSegment[]`; required)
- `isInvalid`: Whether the current value is invalid. (type `boolean`; required)
