# Calendar

## Overview

Browse and select dates by month with support for single or multiple selection, disabled dates, range limits, and custom cell rendering.

## Usage

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 18));
</script>

<template>
  <SCalendar v-model="value" :default-placeholder="value" />
</template>
```

## Demos

```playground
basic
multiple
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Root element class.' },
  { name: 'v-model', type: 'DateValue | DateValue[]', default: '-', description: 'Controlled calendar value.' },
  { name: 'defaultValue', type: 'DateValue | DateValue[]', default: '-', description: 'Initial uncontrolled value.' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: 'Initial visible month.' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: 'Controlled visible month.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether multiple dates can be selected.' },
  { name: 'pagedNavigation', type: 'boolean', default: 'false', description: 'Whether navigation advances by the visible month count.' },
  { name: 'preventDeselect', type: 'boolean', default: 'false', description: 'Whether deselecting the current value is prevented.' },
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
  { name: 'prevPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: 'Custom previous-page resolver.' },
  { name: 'nextPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: 'Custom next-page resolver.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Calendar size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Per-slot class overrides.' },
  { name: 'headerProps', type: 'CalendarHeaderProps', default: '-', description: 'Header props.' },
  { name: 'headingProps', type: 'CalendarHeadingProps', default: '-', description: 'Heading props.' },
  { name: 'prevProps', type: 'CalendarPrevProps', default: '-', description: 'Previous button props.' },
  { name: 'nextProps', type: 'CalendarNextProps', default: '-', description: 'Next button props.' },
  { name: 'gridProps', type: 'CalendarGridProps', default: '-', description: 'Month grid props.' },
  { name: 'gridHeadProps', type: 'CalendarGridHeadProps', default: '-', description: 'Grid head props.' },
  { name: 'gridBodyProps', type: 'CalendarGridBodyProps', default: '-', description: 'Grid body props.' },
  { name: 'gridRowProps', type: 'CalendarGridRowProps', default: '-', description: 'Grid row props.' },
  { name: 'headCellProps', type: 'CalendarHeadCellProps', default: '-', description: 'Weekday head-cell props.' },
  { name: 'cellProps', type: 'CalendarCellProps', default: '-', description: 'Date cell props.' },
  { name: 'cellTriggerProps', type: 'CalendarCellTriggerProps', default: '-', description: 'Date trigger props.' }
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateValue | DateValue[] | undefined) => void', description: 'Emitted when the selected value changes.' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: 'Emitted when the visible month changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'heading', parameters: '{ headingValue: string }', description: 'Custom heading content.' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: 'Custom previous button content.' },
  { name: 'next', parameters: '{ disabled: boolean }', description: 'Custom next button content.' },
  { name: 'head-cell', parameters: 'CalendarHeadCellSlotProps', description: 'Custom weekday heading content.' },
  { name: 'day', parameters: 'CalendarDaySlotProps', description: 'Custom day trigger content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'CalendarHeadCellSlotProps',
    description: 'Weekday heading slot props.',
    fields: [
      { name: 'date', type: 'DateValue', description: 'Current month placeholder date.' },
      { name: 'index', type: 'number', description: 'Weekday index.' },
      { name: 'label', type: 'string', description: 'Weekday label.' }
    ]
  },
  {
    name: 'CalendarDaySlotProps',
    description: 'Day slot props.',
    fields: [
      { name: 'day', type: 'DateValue', description: 'Current date value.' },
      { name: 'dayValue', type: 'string', description: 'Rendered day text.' },
      { name: 'month', type: 'DateValue', description: 'Month represented by the current grid.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the date is disabled.' },
      { name: 'selected', type: 'boolean', description: 'Whether the date is selected.' },
      { name: 'today', type: 'boolean', description: 'Whether the date is today.' },
      { name: 'outsideView', type: 'boolean', description: 'Whether the date belongs to another month.' },
      { name: 'outsideVisibleView', type: 'boolean', description: 'Whether the date is outside the rendered month range.' },
      { name: 'unavailable', type: 'boolean', description: 'Whether the date is unavailable.' }
    ]
  },
  {
    name: 'Ui',
    description: 'Available class override slots.',
    fields: [
      { name: 'root', type: 'ClassValue', description: 'Root class.' },
      { name: 'header', type: 'ClassValue', description: 'Header class.' },
      { name: 'heading', type: 'ClassValue', description: 'Heading class.' },
      { name: 'prev', type: 'ClassValue', description: 'Previous button class.' },
      { name: 'next', type: 'ClassValue', description: 'Next button class.' },
      { name: 'grid', type: 'ClassValue', description: 'Grid class.' },
      { name: 'gridHead', type: 'ClassValue', description: 'Grid head class.' },
      { name: 'gridBody', type: 'ClassValue', description: 'Grid body class.' },
      { name: 'gridRow', type: 'ClassValue', description: 'Grid row class.' },
      { name: 'headCell', type: 'ClassValue', description: 'Weekday head-cell class.' },
      { name: 'cell', type: 'ClassValue', description: 'Date cell class.' },
      { name: 'cellTrigger', type: 'ClassValue', description: 'Date trigger class.' }
    ]
  }
]" />
