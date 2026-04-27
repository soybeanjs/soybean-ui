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

| Method         | Description                                                                            |
| -------------- | -------------------------------------------------------------------------------------- |
| `start()`      | Show the progress bar with the default start position and delay, then start trickling. |
| `set(value)`   | Set the raw progress value between `minimum` and `maximum`.                            |
| `inc()`        | Increment the current progress value.                                                  |
| `dec()`        | Decrement the current progress value.                                                  |
| `trickle()`    | Apply one automatic increment step.                                                    |
| `done()`       | Complete the progress bar and hide it after the configured delay.                      |
| `configure()`  | Update the shared progress options.                                                    |
| `pause()`      | Pause automatic trickling.                                                             |
| `resume()`     | Resume automatic trickling.                                                            |
| `remove()`     | Hide the progress bar immediately.                                                     |
| `reset()`      | Reset the shared progress state and options.                                           |
| `isStarted()`  | Check whether the progress flow is active.                                             |
| `isRendered()` | Check whether a progress provider is currently mounted.                                |
| `promise()`    | Bind the progress lifecycle to a promise or promise factory.                           |

## API

<ComponentApi component="progress" />
