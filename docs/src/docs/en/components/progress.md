# Progress

## Overview

A progress bar component for displaying determinate or indeterminate task completion.

## Usage

```vue
<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';
</script>

<template>
  <SProgress :model-value="45" />
</template>
```

## Demos

```playground
basic
size
color
state
slot
circle
```

## Progress API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number | null | undefined', default: 'undefined', description: 'The current progress value. `null` or `undefined` renders an indeterminate state.' },
  { name: 'max', type: 'number', default: '100', description: 'The maximum progress value.' },
  { name: 'class', type: 'string', default: '-', description: 'Root container class name' },
  { name: 'color', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: 'primary', description: 'Progress indicator color.' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: 'md', description: 'Progress bar size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Add class name to the corresponding container' },
  { name: 'indicatorProps', type: 'HTMLAttributes', default: '{}', description: 'Props forwarded to the indicator element.' },
  { name: 'getValueLabel', type: '(value, max) => string | undefined', default: 'percentage formatter', description: 'Accessible label generator for the current value.' },
  { name: 'getValueText', type: '(value, max) => string | undefined', default: '-', description: 'Accessible value text generator for the current value.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue, max, progressState, valuePercent }', description: 'Custom indicator content.' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class names for Progress. `circle`, `track`, and `label` apply to `SProgressCircle`.',
    fields: [
      { name: 'root', type: 'string', description: 'Add class name to the root container.' },
      { name: 'indicator', type: 'string', description: 'Add class name to the indicator container.' },
      { name: 'circle', type: 'string', description: 'Add class name to the circular progress container (`SProgressCircle` only).' },
      { name: 'track', type: 'string', description: 'Add class name to the circular progress track (`SProgressCircle` only).' },
      { name: 'label', type: 'string', description: 'Add class name to the circular progress label/content container (`SProgressCircle` only).' },
    ],
  },
  {
    name: 'ProgressState',
    description: 'Current progress state.',
    fields: [
      { name: 'indeterminate', type: 'string', description: 'Progress value is not available.' },
      { name: 'loading', type: 'string', description: 'Progress is between 0 and max.' },
      { name: 'complete', type: 'string', description: 'Progress has reached max.' },
    ],
  }
]"/>

## Circle Progress

```vue
<script setup lang="ts">
import { SProgressCircle } from '@soybeanjs/ui';
</script>

<template>
  <SProgressCircle :model-value="72" size="xl">
    <template #default="{ valuePercent }">{{ Math.round(valuePercent ?? 0) }}%</template>
  </SProgressCircle>
</template>
```

`SProgressCircle` supports the same props, emits, slot props, and `Ui` type as `SProgress`, and adds the following prop:

<DataTable preset="props" :data="[
  { name: 'strokeWidth', type: 'number', default: '8', description: 'Stroke width of the circular indicator.' },
]"/>
