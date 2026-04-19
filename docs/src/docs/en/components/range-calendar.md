# RangeCalendar

## Overview

RangeCalendar displays one or more month grids and lets users choose a start and end date directly from the calendar surface.

## Usage

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SRangeCalendar } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 18),
  end: new CalendarDate(2026, 4, 22)
});
</script>

<template>
  <SRangeCalendar v-model="value" :default-placeholder="value.start" />
</template>
```

## Demos

```playground
basic
two-months
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root element class.' },
  { name: 'v-model', type: 'DateRange', default: '-', description: 'Controlled range value.' },
  { name: 'defaultValue', type: 'DateRange', default: '-', description: 'Initial uncontrolled range.' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: 'Initial visible month.' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: 'Controlled visible month.' },
  { name: 'pagedNavigation', type: 'boolean', default: 'false', description: 'Whether navigation advances by visible month count.' },
  { name: 'preventDeselect', type: 'boolean', default: 'false', description: 'Whether clicking the current start day can clear the partial range.' },
  { name: 'allowNonContiguousRanges', type: 'boolean', default: 'false', description: 'Whether unavailable days may exist inside the selected range.' },
  { name: 'maximumDays', type: 'number', default: '-', description: 'Maximum number of days allowed in a range.' },
  { name: 'fixedDate', type: `'start' | 'end'`, default: '-', description: 'Keeps one side of the range fixed when reselecting.' },
  { name: 'weekStartsOn', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: 'locale derived', description: 'First day of the week.' },
  { name: 'weekdayFormat', type: `'narrow' | 'short' | 'long'`, default: `'narrow'`, description: 'Weekday heading format.' },
  { name: 'calendarLabel', type: 'string', default: `'Event Date'`, description: 'Accessible calendar label.' },
  { name: 'fixedWeeks', type: 'boolean', default: 'false', description: 'Whether six weeks are always rendered.' },
  { name: 'numberOfMonths', type: 'number', default: '1', description: 'Visible month count.' },
  { name: 'minValue', type: 'DateValue', default: '-', description: 'Minimum selectable date.' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: 'Maximum selectable date.' },
  { name: 'locale', type: 'string', default: `'en'`, description: 'Formatting locale.' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: 'inherits', description: 'Reading direction.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the whole calendar is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether selection is read-only.' },
  { name: 'initialFocus', type: 'boolean', default: 'false', description: 'Whether focus moves to the active day on mount.' },
  { name: 'disableDaysOutsideCurrentView', type: 'boolean', default: 'false', description: 'Whether days outside the current month are disabled.' },
  { name: 'isDateDisabled', type: '(date: DateValue) => boolean', default: '-', description: 'Predicate for disabled dates.' },
  { name: 'isDateUnavailable', type: '(date: DateValue) => boolean', default: '-', description: 'Predicate for unavailable dates.' },
  { name: 'isDateHighlightable', type: '(date: DateValue) => boolean', default: '-', description: 'Predicate for dates that may keep an unavailable range highlight.' },
  { name: 'prevPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: 'Custom previous-page resolver.' },
  { name: 'nextPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: 'Custom next-page resolver.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Calendar size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Per-slot class overrides.' }
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateRange) => void', description: 'Emitted when the selected range changes.' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: 'Emitted when the visible month changes.' },
  { name: 'update:startValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the current range start changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'heading', parameters: '{ headingValue: string }', description: 'Custom heading content.' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: 'Custom previous button content.' },
  { name: 'next', parameters: '{ disabled: boolean }', description: 'Custom next button content.' },
  { name: 'head-cell', parameters: 'RangeCalendarHeadCellSlotProps', description: 'Custom weekday heading content.' },
  { name: 'day', parameters: 'RangeCalendarDaySlotProps', description: 'Custom day trigger content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'RangeCalendarHeadCellSlotProps',
    description: 'Weekday heading slot props.',
    fields: [
      { name: 'date', type: 'DateValue', description: 'Current month placeholder date.' },
      { name: 'index', type: 'number', description: 'Weekday index.' },
      { name: 'label', type: 'string', description: 'Weekday label.' }
    ]
  },
  {
    name: 'RangeCalendarDaySlotProps',
    description: 'Day slot props.',
    fields: [
      { name: 'day', type: 'DateValue', description: 'Current date value.' },
      { name: 'dayValue', type: 'string', description: 'Rendered day text.' },
      { name: 'month', type: 'DateValue', description: 'Month represented by the current grid.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the date is disabled.' },
      { name: 'selected', type: 'boolean', description: 'Whether the date belongs to the committed range.' },
      { name: 'selectionStart', type: 'boolean', description: 'Whether the date is the range start.' },
      { name: 'selectionEnd', type: 'boolean', description: 'Whether the date is the range end.' },
      { name: 'highlighted', type: 'boolean', description: 'Whether the date belongs to the hover-preview range.' },
      { name: 'highlightedStart', type: 'boolean', description: 'Whether the date is the preview start.' },
      { name: 'highlightedEnd', type: 'boolean', description: 'Whether the date is the preview end.' },
      { name: 'today', type: 'boolean', description: 'Whether the date is today.' },
      { name: 'outsideView', type: 'boolean', description: 'Whether the date belongs to another month.' },
      { name: 'outsideVisibleView', type: 'boolean', description: 'Whether the date is outside the rendered month range.' },
      { name: 'unavailable', type: 'boolean', description: 'Whether the date is unavailable.' }
    ]
  }
]" />
