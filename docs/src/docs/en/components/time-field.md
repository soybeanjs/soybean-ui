# TimeField

## Overview

TimeField is a segmented time input for hour, minute, optional second, and locale-aware day period editing while still submitting a native form value.

## Usage

```vue
<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(new Time(9, 30, 0));
</script>

<template>
  <STimeField v-model="value" aria-label="Meeting time" />
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
  { name: 'modelValue', type: 'TimeValue', default: '-', description: 'Controlled time value.' },
  { name: 'defaultValue', type: 'TimeValue', default: '-', description: 'Uncontrolled initial time value.' },
  { name: 'defaultPlaceholder', type: 'TimeValue', default: '-', description: 'Initial placeholder time used before a value exists.' },
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
  { name: 'name', type: 'string', default: '-', description: 'Native form field name.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the hidden native input is required.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'ui', type: 'Partial<TimeFieldUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'inputProps', type: `Omit<TimeFieldInputProps, 'part'>`, default: '{}', description: 'Props forwarded to every visible segment item.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: TimeValue | undefined) => void', description: 'Emitted when the composed time value changes.' },
  { name: 'update:placeholder', parameters: '(value: TimeValue) => void', description: 'Emitted when the visible placeholder time changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'TimeFieldSlotProps', description: 'Fully custom render function for segmented content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'TimeFieldUi',
    description: 'Class mapping for the default segmented structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Segment item class.' }
    ]
  },
  {
    name: 'TimeFieldSlotProps',
    description: 'Scoped slot payload for custom rendering.',
    fields: [
      { name: 'modelValue', type: 'TimeValue | undefined', description: 'Current composed time value.' },
      { name: 'segments', type: '{ part: SegmentPart; value: string }[]', description: 'Visible segment list in display order.' },
      { name: 'isInvalid', type: 'boolean', description: 'Whether the current composed value is invalid.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="TimeGranularity" description="Displayed segment precision" type="'hour' | 'minute' | 'second'" />
