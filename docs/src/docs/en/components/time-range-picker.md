# TimeRangePicker

## Overview

TimeRangePicker lets users select a start and end time from a popup list while preserving the selected values as `TimeValue` objects.

## Usage

```vue
<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
});
</script>

<template>
  <STimeRangePicker v-model="value" aria-label="Working hours" />
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
  { name: 'modelValue', type: 'TimeRange', default: '-', description: 'Controlled time range value.' },
  { name: 'defaultValue', type: 'TimeRange', default: '-', description: 'Uncontrolled initial time range value.' },
  { name: 'defaultPlaceholder', type: 'TimeValue', default: '-', description: 'Initial placeholder time used before values exist.' },
  { name: 'placeholder', type: 'TimeValue', default: '-', description: 'Controlled placeholder time used to derive the active popup option.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial popup open state when uncontrolled.' },
  { name: 'open', type: 'boolean', default: '-', description: 'Controlled popup open state.' },
  { name: 'granularity', type: 'TimeGranularity', default: '`minute`', description: 'Visible time precision for labels.' },
  { name: 'step', type: 'DateStep', default: 'Popup defaults to `30m` when omitted', description: 'Time step used to generate popup options.' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: 'Locale default', description: 'Controls 12-hour or 24-hour formatting.' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: 'Hides the time zone label for zoned values.' },
  { name: 'minValue', type: 'TimeValue', default: '-', description: 'Minimum selectable time.' },
  { name: 'maxValue', type: 'TimeValue', default: '-', description: 'Maximum selectable time.' },
  { name: 'isTimeUnavailable', type: '(time: TimeValue) => boolean', default: '-', description: 'Filters matching values out of the popup option list.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the picker is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the picker is read-only.' },
  { name: 'locale', type: 'string', default: 'Current locale', description: 'Locale used for popup labels.' },
  { name: 'dir', type: 'Direction', default: 'Inherited', description: 'Reading direction for keyboard interaction.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'ui', type: 'Partial<TimeRangePickerUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'triggerProps', type: 'TimeRangePickerTriggerProps', default: '{}', description: 'Props forwarded to the trigger.' },
  { name: 'popupProps', type: 'TimeRangePickerPopupProps', default: '{}', description: 'Props forwarded to the popup.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: TimeRange) => void', description: 'Emitted when the selected time range changes.' },
  { name: 'update:placeholder', parameters: '(value: TimeValue) => void', description: 'Emitted when the focused popup option changes.' },
  { name: 'update:startValue', parameters: '(value: TimeValue | undefined) => void', description: 'Emitted when the selected start time changes.' },
  { name: 'update:endValue', parameters: '(value: TimeValue | undefined) => void', description: 'Emitted when the selected end time changes.' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: 'Emitted when the popup open state changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ displayValue: string; modelValue: TimeRange; open: boolean }', description: 'Custom trigger content.' },
  { name: 'time', parameters: '{ disabled: boolean; focused: boolean; highlighted: boolean; label: string; rangeStart: boolean; rangeEnd: boolean; selected: boolean; time: TimeValue }', description: 'Custom popup time option content.' },
  { name: 'default', parameters: '{ displayValue: string; modelValue: TimeRange; open: boolean }', description: 'Additional content rendered inside the root.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'TimeRangePickerUi',
    description: 'Class mapping for the time range picker structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'trigger', type: 'string', description: 'Trigger button class.' },
      { name: 'popup', type: 'string', description: 'Popup panel class.' },
      { name: 'list', type: 'string', description: 'Popup option list class.' },
      { name: 'cellTrigger', type: 'string', description: 'Popup option button class.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="TimeGranularity" description="Displayed time precision" type="'hour' | 'minute' | 'second'" />
