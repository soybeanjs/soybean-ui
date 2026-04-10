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
loading-bar
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

## Loading Bar

`useLoadingBar` controls a top loading bar built on `SProgress`. When your app is wrapped with `SConfigProvider`, the loading bar provider is mounted automatically. `SLoadingBar` is also exported for scoped usage inside an existing `SConfigProvider` tree when needed.

```vue
<script setup lang="ts">
import { SButton, useLoadingBar } from '@soybeanjs/ui';

const loadingBar = useLoadingBar();

const handleClick = () => {
  loadingBar.start();

  window.setTimeout(() => {
    loadingBar.finish();
  }, 1200);
};
</script>

<template>
  <SButton @click="handleClick">Start loading</SButton>
</template>
```

### `useLoadingBar` Methods

| Method | Description |
| --- | --- |
| `start()` | Show the loading bar and start the automatic trickle animation. |
| `set(value)` | Update the loading progress with a value between `0` and `100`. |
| `finish()` | Complete the loading bar with the provider color, then hide it. |
| `error()` | Complete the loading bar with the error color, then hide it. |
| `clear()` | Hide the loading bar immediately and reset its state. |

### `SLoadingBar` Props

<DataTable preset="props" :data="[
  { name: 'color', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: `'primary'`, description: 'Default loading bar color.' },
  { name: 'errorColor', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: `'destructive'`, description: 'Color used by `error()`.' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: `'xs'`, description: 'Loading bar thickness.' },
  { name: 'ui', type: 'Partial<Ui>', default: '{}', description: 'Custom classes for the loading bar slots.' },
]"/>
