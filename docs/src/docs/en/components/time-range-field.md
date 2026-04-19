# TimeRangeField

## Overview

TimeRangeField is a segmented time range input with independent editable start and end time segments while still submitting native form values for both sides.

## Usage

```vue
<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
});
</script>

<template>
  <STimeRangeField v-model="value" aria-label="Working hours" />
</template>
```

## Demo

```playground
basic
seconds
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root container.' },
  { name: 'modelValue', type: 'TimeRange', default: '-', description: 'Controlled time range value.' },
  { name: 'defaultValue', type: 'TimeRange', default: '-', description: 'Uncontrolled initial time range value.' },
  { name: 'defaultPlaceholder', type: 'TimeValue', default: '-', description: 'Initial placeholder time used before values exist.' },
  { name: 'placeholder', type: 'TimeValue', default: '-', description: 'Controlled placeholder time used to format visible segments.' },
  { name: 'granularity', type: 'TimeGranularity', default: '`minute`', description: 'Visible segment precision.' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: 'Locale default', description: 'Controls 12-hour or 24-hour hour segments.' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: 'Hides the time zone segment for zoned values.' },
  { name: 'minValue', type: 'TimeValue', default: '-', description: 'Minimum selectable time.' },
  { name: 'maxValue', type: 'TimeValue', default: '-', description: 'Maximum selectable time.' },
  { name: 'isTimeUnavailable', type: '(time: TimeValue) => boolean', default: '-', description: 'Marks matching values as invalid.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the field is read-only.' },
  { name: 'locale', type: 'string', default: 'Current locale', description: 'Locale used for segment order and formatting.' },
  { name: 'dir', type: 'Direction', default: 'Inherited', description: 'Reading direction for segment navigation.' },
  { name: 'startName', type: 'string', default: '-', description: 'Native form field name for the start time.' },
  { name: 'endName', type: 'string', default: '-', description: 'Native form field name for the end time.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the hidden native inputs are required.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'separator', type: 'string', default: '`–`', description: 'Separator text between start and end time segments.' },
  { name: 'ui', type: 'Partial<TimeRangeFieldUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'inputProps', type: `Omit<TimeRangeFieldInputProps, 'part' | 'type'>`, default: '{}', description: 'Props forwarded to every visible segment item.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: TimeRange) => void', description: 'Emitted when the composed time range changes.' },
  { name: 'update:placeholder', parameters: '(value: TimeValue) => void', description: 'Emitted when the visible placeholder time changes.' },
  { name: 'update:startValue', parameters: '(value: TimeValue | undefined) => void', description: 'Emitted when the start time changes.' },
  { name: 'update:endValue', parameters: '(value: TimeValue | undefined) => void', description: 'Emitted when the end time changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'TimeRangeFieldSlotProps', description: 'Fully custom render function for both start and end segmented content.' },
  { name: 'separator', parameters: '-', description: 'Custom separator content between start and end time segments.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'TimeRangeFieldUi',
    description: 'Class mapping for the time range field structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Segment item class for both start and end segments.' },
      { name: 'separator', type: 'string', description: 'Separator element class.' }
    ]
  },
  {
    name: 'TimeRange',
    description: 'Time range value structure.',
    fields: [
      { name: 'start', type: 'TimeValue | undefined', description: 'Start time value.' },
      { name: 'end', type: 'TimeValue | undefined', description: 'End time value.' }
    ]
  }
]"/>
