# DateRangePicker

Source URL: https://ui.soybeanjs.cn/components/date-range-picker
Markdown URL: https://ui.soybeanjs.cn/components/date-range-picker.md
Category: Forms
Description: A date range picker component that allows users to select a start and end date from a calendar popup.

A date range picker component that allows users to select a start and end date from a calendar popup.

## Usage

Usage examples for date-range-picker are rendered on the site.

## Examples

Interactive demos for date-range-picker are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (2): DateRangePicker, DateRangePickerCompact.

### DateRangePicker

#### Props

Properties for the DateRangePicker component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DateRangePickerUi>`; optional)
- `calendarRangeUi`: Per-slot class overrides for the CalendarRange component within the DateRangePicker. (type `Partial<CalendarRangeUi>`; optional)
- `dateFieldProps`: No description. (type `BaseProps`; optional)
- `placement`: Placement. (type `import("@/index").Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopoverTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `PortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `PopoverPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopoverPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `PopperArrowProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `PopoverCloseProps`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
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

Events for the DateRangePicker component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)

### DateRangePickerCompact

#### Props

Properties for the DateRangePickerCompact component.

- `dateFieldProps`: No description. (type `BaseProps`; optional)
- `placement`: Placement. (type `import("@/index").Placement`; optional)
- `showArrow`: Whether to show an arrow. (type `boolean`; optional)
- `triggerProps`: Properties forwarded to the trigger element. (type `PopoverTriggerProps`; optional)
- `portalProps`: Properties forwarded to the portal element. (type `PortalProps`; optional)
- `positionerProps`: Properties forwarded to the positioner element. (type `PopoverPositionerProps`; optional)
- `popupProps`: Properties forwarded to the popup element. (type `PopoverPopupProps`; optional)
- `arrowProps`: Properties forwarded to the arrow element. (type `PopperArrowProps`; optional)
- `closeProps`: Properties forwarded to the close element. (type `PopoverCloseProps`; optional)
- `disabled`: Whether the component is disabled. (type `boolean`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
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

Events for the DateRangePickerCompact component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Emitted when the model value changes. (type `[range: DateRange]`; parameters `range: DateRange`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)
- `update:startValue`: Emitted when the start value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)

#### Slot Props

- `open`: No description. (type `boolean`; required)
- `close`: No description. (type `() => void`; required)
- `calendarRangeProps`: No description. (type `CalendarRangeCompactProps`; required)
- `onUpdateModelValue`: No description. (type `(value: DateRange) => void`; required)
- `onUpdatePlaceholder`: No description. (type `(placeholder: DateValue) => void`; required)
