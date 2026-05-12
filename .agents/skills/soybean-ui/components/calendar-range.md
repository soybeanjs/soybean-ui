# CalendarRange

Source URL: https://ui.soybeanjs.cn/components/calendar-range
Markdown URL: https://ui.soybeanjs.cn/components/calendar-range.md
Category: Forms
Description: CalendarRange displays one or more month grids and lets users choose a start and end date directly from the calendar surface.

## Overview

CalendarRange displays one or more month grids and lets users choose a start and end date directly from the calendar surface.

## Usage

Usage examples for calendar-range are rendered on the site.

## Demos

Interactive demos for calendar-range are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (14): CalendarRange, CalendarRangeCell, CalendarRangeCellTrigger, CalendarRangeCompact, CalendarRangeGrid, CalendarRangeGridBody, CalendarRangeGridHead, CalendarRangeGridRow, CalendarRangeHeadCell, CalendarRangeHeader, CalendarRangeHeading, CalendarRangeNext, CalendarRangePrev, CalendarRangeRoot.

### CalendarRange

#### Props
Properties for the CalendarRange component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<CalendarRangeUi>`; optional)
- `headerProps`: Properties forwarded to the header element. (type `CalendarRangeHeaderProps`; optional)
- `headingProps`: Properties forwarded to the heading element. (type `CalendarRangeHeadingProps`; optional)
- `prevProps`: Properties forwarded to the prev element. (type `CalendarRangePrevProps`; optional)
- `nextProps`: Properties forwarded to the next element. (type `CalendarRangeNextProps`; optional)
- `gridProps`: Properties forwarded to the grid element. (type `CalendarRangeGridProps`; optional)
- `gridHeadProps`: Properties forwarded to the grid head element. (type `CalendarRangeGridHeadProps`; optional)
- `gridBodyProps`: Properties forwarded to the grid body element. (type `CalendarRangeGridBodyProps`; optional)
- `gridRowProps`: Properties forwarded to the grid row element. (type `CalendarRangeGridRowProps`; optional)
- `headCellProps`: Properties forwarded to the head cell element. (type `CalendarRangeHeadCellProps`; optional)
- `cellProps`: Properties forwarded to the cell element. (type `CalendarRangeCellProps`; optional)
- `cellTriggerProps`: Properties forwarded to the cell trigger element. (type `CalendarRangeCellTriggerProps`; optional)
- `defaultValue`: Default value. (type `DateRange`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `modelValue`: Current model value. (type `DateRange`; optional)
- `allowNonContiguousRanges`: Whether to allow non contiguous ranges. (type `boolean`; optional)
- `pagedNavigation`: Whether paged navigation. (type `boolean`; optional)
- `preventDeselect`: Whether prevent deselect. (type `boolean`; optional)
- `maximumDays`: Maximum days. (type `number`; optional)
- `weekStartsOn`: Week starts on. (type `WeekStartsOn`; optional)
- `weekdayFormat`: Weekday format. (type `WeekDayFormat`; optional)
- `calendarLabel`: Calendar label. (type `string`; optional)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `locale`: Locale. (type `string`; optional)
- `numberOfMonths`: Number of months. (type `number`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `initialFocus`: Whether initial focus. (type `boolean`; optional)
- `isDateDisabled`: Whether the date is disabled. (type `DateMatcher`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `isDateHighlightable`: Whether a date highlightable. (type `DateMatcher`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `disableDaysOutsideCurrentView`: Whether to disable days outside current view. (type `boolean`; optional)
- `fixedDate`: Fixed date. (type `'start' | 'end'`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the CalendarRange component.
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
#### Slots
Slots for the CalendarRange component.
- `default`: Custom content for the default slot. (type `((props: { modelValue: DateRange; }) => any) | undefined`)
- `prev`: Custom content for the prev slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `heading`: Custom content for the heading slot. (type `((props: CalendarRangeHeadingSlotProps) => any) | undefined`)
- `next`: Custom content for the next slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `head-cell`: Custom content for the head cell slot. (type `((props: { date: DateValue; index: number; label: string; }) => any) | undefined`)
- `day`: Custom content for the day slot. (type `((props: CalendarRangeDaySlotProps) => any) | undefined`)

### CalendarRangeCell

#### Props
Properties for the CalendarRangeCell component.
- `date`: Date. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeCellTrigger

#### Props
Properties for the CalendarRangeCellTrigger component.
- `day`: Day. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `month`: Month. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Slots
Slots for the CalendarRangeCellTrigger component.
- `default`: No description. (type `((props: CalendarRangeCellTriggerSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the CalendarRangeCellTrigger component.
- `dayValue`: Day value string exposed in the slot scope. (type `string`; required)
- `disabled`: Whether the date is disabled. (type `boolean`; required)
- `selected`: Whether the date is selected. (type `boolean`; required)
- `unavailable`: Whether the date is unavailable. (type `boolean`; required)
- `today`: Whether the date is today. (type `boolean`; required)
- `outsideView`: Whether the date is outside the current view. (type `boolean`; required)
- `outsideVisibleView`: Whether the date is outside the visible view. (type `boolean`; required)
- `highlighted`: Whether the date is focused. (type `boolean`; required)
- `highlightedStart`: Whether the date is a highlighted start. (type `boolean`; required)
- `highlightedEnd`: Whether the date is a highlighted end. (type `boolean`; required)
- `selectionStart`: Whether the date is a selection start. (type `boolean`; required)
- `selectionEnd`: Whether the date is a selection end. (type `boolean`; required)

### CalendarRangeCompact

#### Props
Properties for the CalendarRangeCompact component.
- `headerProps`: Properties forwarded to the header element. (type `CalendarRangeHeaderProps`; optional)
- `headingProps`: Properties forwarded to the heading element. (type `CalendarRangeHeadingProps`; optional)
- `prevProps`: Properties forwarded to the prev element. (type `CalendarRangePrevProps`; optional)
- `nextProps`: Properties forwarded to the next element. (type `CalendarRangeNextProps`; optional)
- `gridProps`: Properties forwarded to the grid element. (type `CalendarRangeGridProps`; optional)
- `gridHeadProps`: Properties forwarded to the grid head element. (type `CalendarRangeGridHeadProps`; optional)
- `gridBodyProps`: Properties forwarded to the grid body element. (type `CalendarRangeGridBodyProps`; optional)
- `gridRowProps`: Properties forwarded to the grid row element. (type `CalendarRangeGridRowProps`; optional)
- `headCellProps`: Properties forwarded to the head cell element. (type `CalendarRangeHeadCellProps`; optional)
- `cellProps`: Properties forwarded to the cell element. (type `CalendarRangeCellProps`; optional)
- `cellTriggerProps`: Properties forwarded to the cell trigger element. (type `CalendarRangeCellTriggerProps`; optional)
- `defaultValue`: Default value. (type `DateRange`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `modelValue`: Current model value. (type `DateRange`; optional)
- `allowNonContiguousRanges`: Whether to allow non contiguous ranges. (type `boolean`; optional)
- `pagedNavigation`: Whether paged navigation. (type `boolean`; optional)
- `preventDeselect`: Whether prevent deselect. (type `boolean`; optional)
- `maximumDays`: Maximum days. (type `number`; optional)
- `weekStartsOn`: Week starts on. (type `WeekStartsOn`; optional)
- `weekdayFormat`: Weekday format. (type `WeekDayFormat`; optional)
- `calendarLabel`: Calendar label. (type `string`; optional)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `locale`: Locale. (type `string`; optional)
- `numberOfMonths`: Number of months. (type `number`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `initialFocus`: Whether initial focus. (type `boolean`; optional)
- `isDateDisabled`: Whether the date is disabled. (type `DateMatcher`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `isDateHighlightable`: Whether a date highlightable. (type `DateMatcher`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `disableDaysOutsideCurrentView`: Whether to disable days outside current view. (type `boolean`; optional)
- `fixedDate`: Fixed date. (type `'start' | 'end'`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the CalendarRangeCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
#### Slots
Slots for the CalendarRangeCompact component.
- `default`: Custom content for the default slot. (type `((props: { modelValue: DateRange; }) => any) | undefined`)
- `prev`: Custom content for the prev slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `heading`: Custom content for the heading slot. (type `((props: CalendarRangeHeadingSlotProps) => any) | undefined`)
- `next`: Custom content for the next slot. (type `((props: { disabled: boolean; }) => any) | undefined`)
- `head-cell`: Custom content for the head cell slot. (type `((props: { date: DateValue; index: number; label: string; }) => any) | undefined`)
- `day`: Custom content for the day slot. (type `((props: CalendarRangeDaySlotProps) => any) | undefined`)

### CalendarRangeGrid

#### Props
Properties for the CalendarRangeGrid component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeGridBody

#### Props
Properties for the CalendarRangeGridBody component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeGridHead

#### Props
Properties for the CalendarRangeGridHead component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeGridRow

#### Props
Properties for the CalendarRangeGridRow component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeHeadCell

#### Props
Properties for the CalendarRangeHeadCell component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeHeader

#### Props
Properties for the CalendarRangeHeader component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeHeading

#### Props
Properties for the CalendarRangeHeading component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Slot Props
Slot properties for the CalendarRangeHeading component.
- `selectedMonth`: No description. (type `number`; required)
- `selectedYear`: No description. (type `number`; required)
- `headingValue`: Heading value exposed in the slot scope. (type `string`; required)
- `yearOptions`: Year options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onYearChange`: Callback invoked when the year changes. (type `(value?: number | undefined) => void`; required)
- `monthOptions`: Month options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onMonthChange`: Callback invoked when the month changes. (type `(value?: number | undefined) => void`; required)

### CalendarRangeNext

#### Props
Properties for the CalendarRangeNext component.
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangePrev

#### Props
Properties for the CalendarRangePrev component.
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `type`: The type of the button element. Can be one of 'button', 'submit', or 'reset'. (type `ButtonType`; default `'button'`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### CalendarRangeRoot

#### Props
Properties for the CalendarRangeRoot component.
- `defaultValue`: Default value. (type `DateRange`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `modelValue`: Current model value. (type `DateRange`; optional)
- `allowNonContiguousRanges`: Whether to allow non contiguous ranges. (type `boolean`; optional)
- `pagedNavigation`: Whether paged navigation. (type `boolean`; optional)
- `preventDeselect`: Whether prevent deselect. (type `boolean`; optional)
- `maximumDays`: Maximum days. (type `number`; optional)
- `weekStartsOn`: Week starts on. (type `WeekStartsOn`; optional)
- `weekdayFormat`: Weekday format. (type `WeekDayFormat`; optional)
- `calendarLabel`: Calendar label. (type `string`; optional)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; optional)
- `maxValue`: Max value. (type `DateValue`; optional)
- `minValue`: Min value. (type `DateValue`; optional)
- `locale`: Locale. (type `string`; optional)
- `numberOfMonths`: Number of months. (type `number`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `readonly`: Whether the component is readonly. (type `boolean`; optional)
- `initialFocus`: Whether initial focus. (type `boolean`; optional)
- `isDateDisabled`: Whether the date is disabled. (type `DateMatcher`; optional)
- `isDateUnavailable`: Whether the date is unavailable. (type `DateMatcher`; optional)
- `isDateHighlightable`: Whether a date highlightable. (type `DateMatcher`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `nextPage`: Next page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `prevPage`: Prev page. (type `((placeholder: DateValue) => DateValue)`; optional)
- `disableDaysOutsideCurrentView`: Whether to disable days outside current view. (type `boolean`; optional)
- `fixedDate`: Fixed date. (type `'start' | 'end'`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the CalendarRangeRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
#### Slots
Slots for the CalendarRangeRoot component.
- `default`: Custom content for the default slot. (type `((props: CalendarRangeRootSlotProps) => any) | undefined`)
#### Slot Props
- `date`: Date exposed in the slot scope. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `headingValue`: Heading value exposed in the slot scope. (type `string`; required)
- `placeholder`: Placeholder exposed in the slot scope. (type `import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@intern...`; required)
- `grid`: Grid exposed in the slot scope. (type `DateGrid<DateValue>[]`; required)
- `weekDays`: Week days exposed in the slot scope. (type `string[]`; required)
- `weekStartsOn`: Week starts on exposed in the slot scope. (type `number`; required)
- `locale`: Locale exposed in the slot scope. (type `string`; required)
- `fixedWeeks`: Whether fixed weeks. (type `boolean`; required)
- `modelValue`: Current model value. (type `DateRange`; required)
- `formatter`: Formatter exposed in the slot scope. (type `Formatter`; required)
- `minValue`: Min value exposed in the slot scope. (type `DateValue | undefined`; required)
- `maxValue`: Max value exposed in the slot scope. (type `DateValue | undefined`; required)
- `disabled`: Whether the component is disabled. (type `boolean`; required)
- `onPlaceholderChange`: Callback invoked when the placeholder changes. (type `(date: DateValue) => void`; required)
- `yearOptions`: Year options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onYearChange`: Callback invoked when the year changes. (type `(value?: number | undefined) => void`; required)
- `monthOptions`: Month options exposed in the slot scope. (type `SelectOptionData<number>[]`; required)
- `onMonthChange`: Callback invoked when the month changes. (type `(value?: number | undefined) => void`; required)
