# YearRangePicker

## Overview

YearRangePicker lets users select a start and end year from a paged year grid while preserving the selected values as `DateValue` objects anchored to the first day of each year.

## Usage

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SYearRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2024, 1, 1),
  end: new CalendarDate(2026, 1, 1)
});
</script>

<template>
  <SYearRangePicker v-model="value" aria-label="Project year range" />
</template>
```

## Demo

```playground
basic
size
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root container.' },
  { name: 'modelValue', type: 'DateRange', default: '-', description: 'Controlled year range value.' },
  { name: 'defaultValue', type: 'DateRange', default: '-', description: 'Uncontrolled initial year range.' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: 'Controlled visible year used to determine the current year page.' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: 'Initial visible year when uncontrolled.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial popup open state when uncontrolled.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled popup open state.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the picker is read-only.' },
  { name: 'minValue', type: 'DateValue', default: '-', description: 'Minimum selectable year.' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: 'Maximum selectable year.' },
  { name: 'locale', type: 'string', default: 'Current locale', description: 'Locale used for year labels.' },
  { name: 'dir', type: 'Direction', default: 'Inherited', description: 'Reading direction for keyboard navigation.' },
  { name: 'name', type: 'string', default: '-', description: 'Native form field name.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the picker is required.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'ui', type: 'Partial<YearRangePickerUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'triggerProps', type: 'YearRangePickerTriggerProps', default: '{}', description: 'Props forwarded to the trigger.' },
  { name: 'popupProps', type: 'YearRangePickerPopupProps', default: '{}', description: 'Props forwarded to the popup.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateRange) => void', description: 'Emitted when the selected year range changes.' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: 'Emitted when the visible year page changes.' },
  { name: 'update:startValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the selected start year changes.' },
  { name: 'update:endValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the selected end year changes.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Emitted when the popup open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ displayValue: string; modelValue: DateRange; open: boolean }', description: 'Custom trigger content.' },
  { name: 'heading', parameters: '{ headingValue: string }', description: 'Custom popup year-page heading.' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: 'Custom previous-page trigger content.' },
  { name: 'next', parameters: '{ disabled: boolean }', description: 'Custom next-page trigger content.' },
  { name: 'year', parameters: '{ date: DateValue; label: string; disabled: boolean; focused: boolean; highlighted: boolean; rangeStart: boolean; rangeEnd: boolean; selected: boolean }', description: 'Custom year cell content.' },
  { name: 'default', parameters: '{ displayValue: string; modelValue: DateRange; open: boolean }', description: 'Additional content rendered inside the root.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'YearRangePickerUi',
    description: 'Class mapping for the year range picker structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'trigger', type: 'string', description: 'Trigger button class.' },
      { name: 'popup', type: 'string', description: 'Popup panel class.' },
      { name: 'header', type: 'string', description: 'Popup header class.' },
      { name: 'heading', type: 'string', description: 'Popup heading class.' },
      { name: 'prev', type: 'string', description: 'Previous-page button class.' },
      { name: 'next', type: 'string', description: 'Next-page button class.' },
      { name: 'grid', type: 'string', description: 'Year grid class.' },
      { name: 'cellTrigger', type: 'string', description: 'Year button class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
