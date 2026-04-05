# Slider

## Overview

A slider component for selecting one or more numeric values within a continuous range, with horizontal and vertical support.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const value = ref([40]);
</script>

<template>
  <SSlider v-model="value" :thumb-props="{ 'aria-label': 'Volume' }" />
</template>
```

## Demo

```playground
basic
range
size
color
disabled
orientation
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number[]', default: '-', description: 'Controlled slider values.' },
  { name: 'defaultValue', type: 'number[]', default: '[0]', description: 'Default values in uncontrolled mode.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the slider is disabled.' },
  { name: 'orientation', type: '`horizontal` | `vertical`', default: '`horizontal`', description: 'Slider orientation.' },
  { name: 'dir', type: '`ltr` | `rtl`', default: '`ltr`', description: 'Reading direction.' },
  { name: 'inverted', type: 'boolean', default: 'false', description: 'Whether the value direction is inverted.' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
  { name: 'step', type: 'number', default: '1', description: 'Step size.' },
  { name: 'minStepsBetweenThumbs', type: 'number', default: '0', description: 'Minimum step distance between multiple thumbs.' },
  { name: 'name', type: 'string', default: '-', description: 'Form field name used when the slider participates in form submission.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the owning form requires at least one value.' },
  { name: 'thumbAlignment', type: '`contain` | `overflow`', default: '`contain`', description: 'Whether thumbs stay within the track bounds or may overflow it.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root element.' },
  { name: 'color', type: 'ThemeColor', default: '`primary`', description: 'Slider color.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Slider size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal elements.' },
  { name: 'trackProps', type: 'SliderTrackProps', default: '{}', description: 'Props passed to the track element.' },
  { name: 'rangeProps', type: 'SliderRangeProps', default: '{}', description: 'Props passed to the range element.' },
  { name: 'thumbProps', type: 'Omit<SliderThumbProps, `index`>', default: '{}', description: 'Props passed to every thumb. For a single-thumb slider, pass an `aria-label`.' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: number[]) => void', description: 'Triggered when the value changes.' },
  { name: 'valueCommit', parameters: '(value: number[]) => void', description: 'Triggered when a drag or keyboard interaction is committed.' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ index, value, modelValue }', description: 'Custom content for each thumb.' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Custom class map for Slider.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'track', type: 'string', description: 'Track class.' },
      { name: 'range', type: 'string', description: 'Selected range class.' },
      { name: 'thumb', type: 'string', description: 'Thumb class.' },
    ],
  }
]"/>
