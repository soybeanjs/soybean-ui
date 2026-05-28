# DatePicker

Source URL: https://ui.soybeanjs.cn/components/date-picker
Markdown URL: https://ui.soybeanjs.cn/components/date-picker.md
Category: Forms
Description: A date picker component that combines a text input with a calendar popup for selecting dates.

A date picker component that combines a text input with a calendar popup for selecting dates.

## Usage

Usage examples for date-picker are rendered on the site.

## Examples

Interactive demos for date-picker are rendered on the site.

## API

Structured API summary generated from build-time component metadata.

- Exported symbols (2): DatePicker, DatePickerCompact.

### DatePicker

#### Props

Properties for the DatePicker component.

- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<DatePickerUi>`; optional)
- `calendarUi`: Per-slot class overrides for the Calendar component within the DatePicker. (type `Partial<CalendarUi>`; optional)
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
- `dir`: The direction of the content. Used to determine the placement when not explicitly provided and for RTL flipping behavior. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
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
- `locale`: Locale. (type `string`; optional)
- `modelValue`: Current model value. (type `DateValue`; optional)
- `defaultValue`: Default value. (type `DateValue`; optional)
- `multiple`: Whether multiple values are supported. (type `false`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
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

Events for the DatePicker component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Emitted when the model value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)

### DatePickerCompact

#### Props

Properties for the DatePickerCompact component.

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
- `dir`: The direction of the content. Used to determine the placement when not explicitly provided and for RTL flipping behavior. (type `Direction`; optional)
- `open`: The controlled open state of the dialog. Can be bound with `v-model:open`. (type `boolean`; default `undefined`; optional)
- `defaultOpen`: The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. (type `boolean`; default `false`; optional)
- `modal`: The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. (type `boolean`; default `true`; optional)
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
- `locale`: Locale. (type `string`; optional)
- `modelValue`: Current model value. (type `DateValue`; optional)
- `defaultValue`: Default value. (type `DateValue`; optional)
- `multiple`: Whether multiple values are supported. (type `false`; optional)
- `placeholder`: Placeholder. (type `DateValue`; optional)
- `defaultPlaceholder`: Default placeholder. (type `DateValue`; optional)
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

Events for the DatePickerCompact component.

- `update:open`: Event handler called when the open state of the dialog changes. (type `[value: boolean]`; parameters `value: boolean`)
- `escapeKeyDown`: Event handler called when the escape key is down. Can be prevented. (type `[event: KeyboardEvent]`; parameters `event: KeyboardEvent`)
- `pointerDownOutside`: Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. (type `[event: PointerDownOutsideEvent]`; parameters `event: PointerDownOutsideEvent`)
- `focusOutside`: Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. (type `[event: FocusOutsideEvent]`; parameters `event: FocusOutsideEvent`)
- `interactOutside`: Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. (type `[event: PointerDownOutsideEvent | FocusOutsideEvent]`; parameters `event: PointerDownOutsideEvent | FocusOutsideEvent`)
- `openAutoFocus`: Event handler called when auto-focusing on open. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `closeAutoFocus`: Event handler called when auto-focusing on close. Can be prevented. (type `[event: Event]`; parameters `event: Event`)
- `update:modelValue`: Emitted when the model value changes. (type `[date: DateValue | undefined]`; parameters `date: DateValue | undefined`)
- `update:placeholder`: Emitted when the placeholder value changes. (type `[date: DateValue]`; parameters `date: DateValue`)

#### Slot Props

- `open`: No description. (type `boolean`; required)
- `close`: No description. (type `() => void`; required)
- `calendarProps`: No description. (type `CalendarCompactProps<false>`; required)
- `onUpdateModelValue`: No description. (type `(value: DateValue | undefined) => void`; required)
- `onUpdatePlaceholder`: No description. (type `(placeholder: DateValue) => void`; required)
