# Progress

Source URL: https://ui.soybeanjs.cn/components/progress
Markdown URL: https://ui.soybeanjs.cn/components/progress.md
Category: Data Display
Description: A progress bar component for displaying determinate or indeterminate task completion.

## Overview

A progress bar component for displaying determinate or indeterminate task completion.

## Usage

Usage examples for progress are rendered on the site.

## Demos

Interactive demos for progress are rendered on the site.

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

Structured API summary generated from build-time component metadata.
- Exported symbols (8): Progress, ProgressCircle, ProgressCircleCompact, ProgressCircleSvg, ProgressCompact, ProgressIndicator, ProgressProvider, ProgressRoot.

### Progress

#### Props
Properties for the Progress component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ProgressUi>`; optional)
- `indicatorProps`: Properties forwarded to the indicator element. (type `ProgressIndicatorProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `modelValue`: The controlled progress value. Can be bind as `v-model`. (type `number | null`; optional)
- `max`: The maximum progress value. (type `number`; optional)
- `getValueLabel`: The accessible label of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `getValueText`: The accessible text of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the Progress component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: number | null | undefined]`; parameters `value: number | null | undefined`)
- `update:max`: Emitted when the max value changes. (type `[value: number]`; parameters `value: number`)
#### Slots
Slots for the Progress component.
- `default`: Custom content for the default slot. (type `((props: ProgressSlotProps) => any) | undefined`)
#### Slot Props
Slot properties for the Progress component family.
- `modelValue`: Current model value. (type `number | null | undefined`; required)
- `max`: Max used by the component. (type `number`; required)
- `progressState`: Progress state used by the component. (type `'loading' | 'indeterminate' | 'complete'`; required)
- `valuePercent`: Current progress percentage. (type `number | null`; required)

### ProgressCircle

#### Props
Properties for the ProgressCircle component.
- `class`: Additional class names applied to the root element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `color`: Theme color of the component. (type `ThemeColor`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<ProgressUi>`; optional)
- `strokeWidth`: Stroke width. (type `number`; optional)
- `circleSvgProps`: Properties forwarded to the ProgressCircleSvg component. (type `ProgressCircleSvgProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `modelValue`: The controlled progress value. Can be bind as `v-model`. (type `number | null`; optional)
- `max`: The maximum progress value. (type `number`; optional)
- `getValueLabel`: The accessible label of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `getValueText`: The accessible text of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ProgressCircle component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: number | null | undefined]`; parameters `value: number | null | undefined`)
- `update:max`: Emitted when the max value changes. (type `[value: number]`; parameters `value: number`)
#### Slots
Slots for the ProgressCircle component.
- `default`: Custom content for the default slot. (type `((props: ProgressSlotProps) => any) | undefined`)

### ProgressCircleCompact

#### Props
Properties for the ProgressCircleCompact component.
- `strokeWidth`: Stroke width. (type `number`; optional)
- `circleSvgProps`: Properties forwarded to the ProgressCircleSvg component. (type `ProgressCircleSvgProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `modelValue`: The controlled progress value. Can be bind as `v-model`. (type `number | null`; optional)
- `max`: The maximum progress value. (type `number`; optional)
- `getValueLabel`: The accessible label of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `getValueText`: The accessible text of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ProgressCircleCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: number | null | undefined]`; parameters `value: number | null | undefined`)
- `update:max`: Emitted when the max value changes. (type `[value: number]`; parameters `value: number`)
#### Slots
Slots for the ProgressCircleCompact component.
- `default`: Custom content for the default slot. (type `((props: ProgressSlotProps) => any) | undefined`)

### ProgressCircleSvg

#### Props
Properties for the ProgressCircleSvg component.
- `strokeWidth`: Stroke width. (type `number`; optional)

### ProgressCompact

#### Props
Properties for the ProgressCompact component.
- `indicatorProps`: Properties forwarded to the indicator element. (type `ProgressIndicatorProps`; optional)
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `modelValue`: The controlled progress value. Can be bind as `v-model`. (type `number | null`; optional)
- `max`: The maximum progress value. (type `number`; optional)
- `getValueLabel`: The accessible label of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `getValueText`: The accessible text of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ProgressCompact component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: number | null | undefined]`; parameters `value: number | null | undefined`)
- `update:max`: Emitted when the max value changes. (type `[value: number]`; parameters `value: number`)
#### Slots
Slots for the ProgressCompact component.
- `default`: Custom content for the default slot. (type `((props: ProgressSlotProps) => any) | undefined`)

### ProgressIndicator

#### Props
Properties for the ProgressIndicator component.
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)

### ProgressProvider

#### Props
Properties for the ProgressProvider component.
- `direction`: Direction. (type `Direction`; optional)
- `minimum`: Minimum. (type `number`; optional)
- `maximum`: Maximum. (type `number`; optional)
- `easing`: Easing. (type `string`; optional)
- `speed`: Speed. (type `number`; optional)
- `trickle`: Whether trickle. (type `boolean`; optional)
- `trickleSpeed`: Trickle speed. (type `number`; optional)

### ProgressRoot

#### Props
Properties for the ProgressRoot component.
- `dir`: Reading direction of the component. (type `Direction`; optional)
- `modelValue`: The controlled progress value. Can be bind as `v-model`. (type `number | null`; optional)
- `max`: The maximum progress value. (type `number`; optional)
- `getValueLabel`: The accessible label of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `getValueText`: The accessible text of the current progress value. (type `((value: number | null, max: number) => string)`; optional)
- `asChild`: Change the default rendered element for the one passed as a child, merging their props and behavior. (type `boolean`; optional)
- `as`: The element or component this component should render as. Can be overwrite by `asChild` (type `AsTag | Component`; default `'div'`; optional)
#### Emits
Events for the ProgressRoot component.
- `update:modelValue`: Emitted when the model value changes. (type `[value: number | null | undefined]`; parameters `value: number | null | undefined`)
- `update:max`: Emitted when the max value changes. (type `[value: number]`; parameters `value: number`)
