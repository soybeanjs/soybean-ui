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
provider
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

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', type: '(value: number | null | undefined) => void', description: 'Emitted when the progress value changes.' },
  { name: 'update:max', type: '(value: number) => void', description: 'Emitted when the maximum value is normalized.' },
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

## Progress Provider

Mount `SProgressProvider` once near your app root before calling the imperative `progress(...)` API. `SConfigProvider` mounts it automatically, so most applications can call `progress` directly.

```vue
<script setup lang="ts">
import { SButton, SProgressProvider, progress } from '@soybeanjs/ui';

const handleClick = () => {
  progress.start();

  window.setTimeout(() => {
    progress.done();
  }, 1200);
};
</script>

<template>
  <SProgressProvider />
  <SButton @click="handleClick">Start loading</SButton>
</template>
```

### `progress` Methods

| Method                    | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `start()`                 | Show the progress bar with the default start position and delay, then start trickling. |
| `set(value)`              | Set the raw progress value between `minimum` and `maximum`.                            |
| `inc()`                   | Increment the current progress value.                                                  |
| `dec()`                   | Decrement the current progress value.                                                  |
| `trickle()`               | Apply one automatic increment step.                                                    |
| `done()`                  | Complete the progress bar and hide it after the configured delay.                      |
| `configure()`             | Update the shared progress options.                                                    |
| `pause()`                 | Pause automatic trickling.                                                             |
| `resume()`                | Resume automatic trickling.                                                            |
| `remove()`                | Hide the progress bar immediately.                                                     |
| `reset()`                 | Reset the shared progress state and options.                                           |
| `isStarted()`             | Check whether the progress flow is active.                                             |
| `isRendered()`            | Check whether a progress provider is currently mounted.                                |
| `promise()`               | Bind the progress lifecycle to a promise or promise factory.                           |

### `SProgressProvider` Props

<DataTable preset="props" :data="[
  { name: 'minimum', type: 'number', default: '0.08', description: 'Minimum raw progress value used by `progress.start()`.' },
  { name: 'maximum', type: 'number', default: '1', description: 'Maximum raw progress value used by the provider.' },
  { name: 'startPosition', type: 'number', default: '0.3', description: 'Default starting progress value used by `progress.start()` for page transitions.' },
  { name: 'delay', type: 'number', default: '100', description: 'Default start delay used by `progress.start()` to avoid flashes on fast navigations.' },
  { name: 'stopDelay', type: 'number', default: '300', description: 'Default completion delay used by `progress.stop()`.' },
  { name: 'forcedStopDelay', type: 'number', default: '0', description: 'Additional delay applied before `progress.stop()` starts its completion delay.' },
  { name: 'easing', type: 'string', default: `'linear'`, description: 'Transition easing used by the provider indicator.' },
  { name: 'speed', type: 'number', default: '200', description: 'Transition duration and auto-hide delay in milliseconds.' },
  { name: 'trickle', type: 'boolean', default: 'true', description: 'Whether `progress.start()` should keep incrementing automatically.' },
  { name: 'trickleSpeed', type: 'number', default: '200', description: 'Delay between automatic trickle steps.' },
  { name: 'direction', type: `'ltr' | 'rtl'`, default: `'ltr'`, description: 'Direction used to position the top progress indicator.' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Render the provider in indeterminate mode.' },
  { name: 'class', type: 'string', default: '-', description: 'Root container class name.' },
  { name: 'color', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: `'primary'`, description: 'Top progress indicator color.' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: `'xs'`, description: 'Top progress thickness.' },
  { name: 'ui', type: 'Partial<Ui>', default: '{}', description: 'Custom classes for the provider slots.' },
  { name: 'indicatorProps', type: 'ProgressIndicatorProps', default: '{}', description: 'Props forwarded to the internal indicator element.' },
]"/>

### `SProgressProvider` Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Content rendered after the provider.' },
]"/>
