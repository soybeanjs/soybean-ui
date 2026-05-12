# Calendar

Source URL: https://ui.soybeanjs.cn/components/calendar
Markdown URL: https://ui.soybeanjs.cn/components/calendar.md
Category: Forms
Description: Browse and select dates by month with support for single or multiple selection, disabled dates, range limits, custom cell rendering, and built-in month/year Select controls in the compact header.

## Overview

Browse and select dates by month with support for single or multiple selection, disabled dates, range limits, custom cell rendering, and built-in month/year Select controls in the compact header.

## Usage

Usage examples for calendar are rendered on the site.

## Demos

Interactive demos for calendar are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (14): Calendar, CalendarCell, CalendarCellTrigger, CalendarCompact, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading, CalendarNext, CalendarPrev, CalendarRoot.

### Calendar

#### Props
Properties for the Calendar component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CalendarUi>`; optional)
- `headerProps`: Properties forwarded to the header element. (type `CalendarHeaderProps`; optional)
- `headingProps`: Properties forwarded to the heading element. (type `CalendarHeadingProps`; optional)
- `prevProps`: Properties forwarded to the prev element. (type `CalendarPrevProps`; optional)
- `nextProps`: Properties forwarded to the next element. (type `CalendarNextProps`; optional)
- `gridProps`: Properties forwarded to the grid element. (type `CalendarGridProps`; optional)
- `gridHeadProps`: Properties forwarded to the grid head element. (type `CalendarGridHeadProps`; optional)
- `gridBodyProps`: Properties forwarded to the grid body element. (type `CalendarGridBodyProps`; optional)
- `gridRowProps`: Properties forwarded to the grid row element. (type `CalendarGridRowProps`; optional)
- `headCellProps`: Properties forwarded to the head cell element. (type `CalendarHeadCellProps`; optional)
- `cellProps`: Properties forwarded to the cell element. (type `CalendarCellProps`; optional)
- `cellTriggerProps`: Properties forwarded to the cell trigger element. (type `CalendarCellTriggerProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `locale`: Locale. (type `string`; optional)
- `modelValue`: Current model value. (type `CalendarModelValue<M>`; optional)
- `defaultValue`: Default value. (type `CalendarModelValue<M>`; optional)
- `multiple`: Whether multiple values are supported. (type `M`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `pagedNavigation`: Whether paged navigation. (type `boolean`; optional)
- `preventDeselect`: Whether prevent deselect. (type `boolean`; optional)
- `weekStartsOn`: Week starts on. (type `WeekStartsOn`; optional)
- `weekdayFormat`: Weekday format. (type `WeekDayFormat`; optional)
- `calendarLabel`: Calendar label. (type `string`; optional)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `numberOfMonths`: Number of months. (type `number`; optional)
- `initialFocus`: Whether initial focus. (type `boolean`; optional)
- `isDateDisabled`: Whether the date is disabled. (type `DateMatcher`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `disableDaysOutsideCurrentView`: Whether to disable days outside current view. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Calendar component.
- `update:modelValue`: Emitted when the model value changes. (type `[date: CalendarModelValue<M>]`; parameters `date: CalendarModelValue<M>`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
#### Slots
Slots for the Calendar component.
- `default`: Custom content for the default slot. (type `((props: { modelValue: CalendarModelValue<M>; }) => any) | undefined`)
- `prev`: Custom content for the prev slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `heading`: Custom content for the heading slot. (type `((props: CalendarHeadingSlotProps) => any) | undefined`)
- `next`: Custom content for the next slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `head-cell`: Custom content for the head cell slot. (type `((props: { date: DateValue; index: number; label: string; }) => any) | undefined`)
- `day`: Custom content for the day slot. (type `((props: CalendarDaySlotProps) => any) | undefined`)

### CalendarCell

#### Props
Properties for the CalendarCell component.
- `date`: Date. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarCellTrigger

#### Props
Properties for the CalendarCellTrigger component.
- `day`: Day. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `month`: Month. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Slots
Slots for the CalendarCellTrigger component.
- `default`: Custom content for the default slot. (type `((props: CalendarCellTriggerSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the CalendarCellTrigger component.
- `dayValue`: Day value string exposed in the slot scope. (type `string`; required)
- `disabled`: Whether the date is disabled. (type `boolean`; required)
- `selected`: Whether the date is selected. (type `boolean`; required)
- `unavailable`: Whether the date is unavailable. (type `boolean`; required)
- `today`: Whether the date is today. (type `boolean`; required)
- `outsideView`: Whether the date is outside the current view. (type `boolean`; required)
- `outsideVisibleView`: Whether the date is outside the visible view. (type `boolean`; required)

### CalendarCompact

#### Props
Properties for the CalendarCompact component.
- `headerProps`: Properties forwarded to the header element. (type `CalendarHeaderProps`; optional)
- `headingProps`: Properties forwarded to the heading element. (type `CalendarHeadingProps`; optional)
- `prevProps`: Properties forwarded to the prev element. (type `CalendarPrevProps`; optional)
- `nextProps`: Properties forwarded to the next element. (type `CalendarNextProps`; optional)
- `gridProps`: Properties forwarded to the grid element. (type `CalendarGridProps`; optional)
- `gridHeadProps`: Properties forwarded to the grid head element. (type `CalendarGridHeadProps`; optional)
- `gridBodyProps`: Properties forwarded to the grid body element. (type `CalendarGridBodyProps`; optional)
- `gridRowProps`: Properties forwarded to the grid row element. (type `CalendarGridRowProps`; optional)
- `headCellProps`: Properties forwarded to the head cell element. (type `CalendarHeadCellProps`; optional)
- `cellProps`: Properties forwarded to the cell element. (type `CalendarCellProps`; optional)
- `cellTriggerProps`: Properties forwarded to the cell trigger element. (type `CalendarCellTriggerProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `locale`: Locale. (type `string`; optional)
- `modelValue`: Current model value. (type `CalendarModelValue<M>`; optional)
- `defaultValue`: Default value. (type `CalendarModelValue<M>`; optional)
- `multiple`: Whether multiple values are supported. (type `M`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `pagedNavigation`: Whether paged navigation. (type `boolean`; optional)
- `preventDeselect`: Whether prevent deselect. (type `boolean`; optional)
- `weekStartsOn`: Week starts on. (type `WeekStartsOn`; optional)
- `weekdayFormat`: Weekday format. (type `WeekDayFormat`; optional)
- `calendarLabel`: Calendar label. (type `string`; optional)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `numberOfMonths`: Number of months. (type `number`; optional)
- `initialFocus`: Whether initial focus. (type `boolean`; optional)
- `isDateDisabled`: Whether the date is disabled. (type `DateMatcher`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `disableDaysOutsideCurrentView`: Whether to disable days outside current view. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the CalendarCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[date: CalendarModelValue<M>]`; parameters `date: CalendarModelValue<M>`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
#### Slots
Slots for the CalendarCompact component.
- `default`: Custom content for the default slot. (type `((props: { modelValue: CalendarModelValue<M>; }) => any) | undefined`)
- `prev`: Custom content for the prev slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `heading`: Custom content for the heading slot. (type `((props: CalendarHeadingSlotProps) => any) | undefined`)
- `next`: Custom content for the next slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `head-cell`: Custom content for the head cell slot. (type `((props: { date: DateValue; index: number; label: string; }) => any) | undefined`)
- `day`: Custom content for the day slot. (type `((props: CalendarDaySlotProps) => any) | undefined`)

### CalendarGrid

#### Props
Properties for the CalendarGrid component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarGridBody

#### Props
Properties for the CalendarGridBody component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarGridHead

#### Props
Properties for the CalendarGridHead component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarGridRow

#### Props
Properties for the CalendarGridRow component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarHeadCell

#### Props
Properties for the CalendarHeadCell component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarHeader

#### Props
Properties for the CalendarHeader component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarHeading

#### Props
Properties for the CalendarHeading component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Slot Props
Slot properties for the CalendarHeading component.
- `selectedMonth`: No description. (type `number`; required)
- `selectedYear`: No description. (type `number`; required)
- `headingValue`: Heading value exposed in the slot scope. (type `string`; required)
- `yearOptions`: Year options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onYearChange`: Callback invoked when the year changes. (type `(value?: number | undefined) => void`; required)
- `monthOptions`: Month options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onMonthChange`: Callback invoked when the month changes. (type `(value?: number | undefined) => void`; required)

### CalendarNext

#### Props
Properties for the CalendarNext component.
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarPrev

#### Props
Properties for the CalendarPrev component.
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRoot

#### Props
Properties for the CalendarRoot component.
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `locale`: Locale. (type `string`; optional)
- `modelValue`: Current model value. (type `CalendarModelValue<M>`; optional)
- `defaultValue`: Default value. (type `CalendarModelValue<M>`; optional)
- `multiple`: Whether multiple values are supported. (type `M`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `pagedNavigation`: Whether paged navigation. (type `boolean`; optional)
- `preventDeselect`: Whether prevent deselect. (type `boolean`; optional)
- `weekStartsOn`: Week starts on. (type `WeekStartsOn`; optional)
- `weekdayFormat`: Weekday format. (type `WeekDayFormat`; optional)
- `calendarLabel`: Calendar label. (type `string`; optional)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `numberOfMonths`: Number of months. (type `number`; optional)
- `initialFocus`: Whether initial focus. (type `boolean`; optional)
- `isDateDisabled`: Whether the date is disabled. (type `DateMatcher`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `disableDaysOutsideCurrentView`: Whether to disable days outside current view. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the CalendarRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[date: CalendarModelValue<M>]`; parameters `date: CalendarModelValue<M>`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
#### Slots
Slots for the Calendar component.
- `default`: Custom content for the default slot. (type `((props: CalendarRootSlotProps<M>) => any) | undefined`)
#### Slot Props
Slot properties for the CalendarRoot component.
- `date`: Date exposed in the slot scope. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `headingValue`: Heading value exposed in the slot scope. (type `string`; required)
- `placeholder`: Placeholder exposed in the slot scope. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `grid`: Grid exposed in the slot scope. (type `DateGrid<DateValue>[]`; required)
- `weekDays`: Week days exposed in the slot scope. (type `string[]`; required)
- `weekStartsOn`: Week starts on exposed in the slot scope. (type `number`; required)
- `locale`: Locale exposed in the slot scope. (type `string`; required)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; required)
- `modelValue`: Current model value. (type `M extends true ? DateValue[] | undefined : DateValue | undefined`; required)
- `formatter`: Formatter exposed in the slot scope. (type `Formatter`; required)
- `minValue`: Min value exposed in the slot scope. (type `DateValue | undefined`; required)
- `maxValue`: Max value exposed in the slot scope. (type `DateValue | undefined`; required)
- `disabled`: Whether the component is disabled. (type `boolean`; required)
- `onPlaceholderChange`: Callback invoked when the placeholder changes. (type `(date: DateValue) => void`; required)
- `yearOptions`: Year options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onYearChange`: Callback invoked when the year changes. (type `(value?: number | undefined) => void`; required)
- `monthOptions`: Month options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onMonthChange`: Callback invoked when the month changes. (type `(value?: number | undefined) => void`; required)
