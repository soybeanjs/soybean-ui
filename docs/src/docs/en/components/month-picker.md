# MonthPicker

## Overview

MonthPicker lets users pick a month from a year-based popup while keeping the selected value as a `DateValue` anchored to the first day of that month.

## Usage

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SMonthPicker } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 1));
</script>

<template>
  <SMonthPicker v-model="value" aria-label="Billing month" />
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
  { name: 'modelValue', type: 'DateValue', default: '-', description: 'Controlled month value anchored to the first day of the selected month.' },
  { name: 'defaultValue', type: 'DateValue', default: '-', description: 'Uncontrolled initial month value.' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: 'Controlled visible month used to determine the current popup year.' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: 'Initial visible month when uncontrolled.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial popup open state when uncontrolled.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled popup open state.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the picker is read-only.' },
  { name: 'minValue', type: 'DateValue', default: '-', description: 'Minimum selectable month.' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: 'Maximum selectable month.' },
  { name: 'locale', type: 'string', default: 'Current locale', description: 'Locale used for month labels.' },
  { name: 'dir', type: 'Direction', default: 'Inherited', description: 'Reading direction for keyboard navigation.' },
  { name: 'name', type: 'string', default: '-', description: 'Native form field name.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the picker is required.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'ui', type: 'Partial<MonthPickerUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'triggerProps', type: 'MonthPickerTriggerProps', default: '{}', description: 'Props forwarded to the trigger.' },
  { name: 'popupProps', type: 'MonthPickerPopupProps', default: '{}', description: 'Props forwarded to the popup.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the selected month changes.' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: 'Emitted when the visible popup month changes.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Emitted when the popup open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ displayValue: string; modelValue: DateValue | undefined; open: boolean }', description: 'Custom trigger content.' },
  { name: 'heading', parameters: '{ headingValue: string }', description: 'Custom popup year heading.' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: 'Custom previous-year trigger content.' },
  { name: 'next', parameters: '{ disabled: boolean }', description: 'Custom next-year trigger content.' },
  { name: 'month', parameters: '{ date: DateValue; label: string; disabled: boolean; focused: boolean; selected: boolean }', description: 'Custom month cell content.' },
  { name: 'default', parameters: '{ displayValue: string; modelValue: DateValue | undefined; open: boolean }', description: 'Additional content rendered inside the root.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'MonthPickerUi',
    description: 'Class mapping for the month picker structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'trigger', type: 'string', description: 'Trigger button class.' },
      { name: 'popup', type: 'string', description: 'Popup panel class.' },
      { name: 'header', type: 'string', description: 'Popup header class.' },
      { name: 'heading', type: 'string', description: 'Popup year heading class.' },
      { name: 'prev', type: 'string', description: 'Previous-year button class.' },
      { name: 'next', type: 'string', description: 'Next-year button class.' },
      { name: 'grid', type: 'string', description: 'Month grid class.' },
      { name: 'cellTrigger', type: 'string', description: 'Month button class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
