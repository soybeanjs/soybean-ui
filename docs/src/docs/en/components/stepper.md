# Stepper

## Overview

Displays progress through a multi-step workflow.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SStepper } from '@soybeanjs/ui';

const value = ref(2);

const items = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Complete your profile' },
  { title: 'Review', description: 'Confirm and submit' }
];
</script>

<template>
  <SStepper v-model="value" :items="items" />
</template>
```

## Demo

```playground
basic
vertical
linear
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'StepperOptionData[]', default: '-', description: 'Stepper items.', required: true },
  { name: 'modelValue', type: 'number', default: '-', description: 'Active step.' },
  { name: 'defaultValue', type: 'number', default: '1', description: 'Default active step.' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Layout orientation.' },
  { name: 'linear', type: 'boolean', default: 'true', description: 'Whether steps must be completed in order.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Stepper color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Stepper size.' },
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom root class name.' },
  { name: 'ui', type: 'Ui', default: '{}', description: 'Custom classes for internal elements.' },
  { name: 'itemProps', type: 'StepperItemProps', default: '-', description: 'Props forwarded to StepperItem.' },
  { name: 'triggerProps', type: 'StepperTriggerProps', default: '-', description: 'Props forwarded to StepperTrigger.' },
  { name: 'indicatorProps', type: 'StepperIndicatorProps', default: '-', description: 'Props forwarded to StepperIndicator.' },
  { name: 'separatorProps', type: 'StepperSeparatorProps', default: '-', description: 'Props forwarded to StepperSeparator.' },
  { name: 'titleProps', type: 'StepperTitleProps', default: '-', description: 'Props forwarded to StepperTitle.' },
  { name: 'descriptionProps', type: 'StepperDescriptionProps', default: '-', description: 'Props forwarded to StepperDescription.' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: number) => void', description: 'Emitted when the active step changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'item', parameters: '{ step: number; state: StepperState; modelValue: number }', description: 'Custom step item content.' },
  { name: 'indicator', parameters: '{ step: number; state: StepperState; modelValue: number }', description: 'Custom step indicator content.' },
  { name: 'title', parameters: '{ step: number; state: StepperState; modelValue: number }', description: 'Custom step title content.' },
  { name: 'description', parameters: '{ step: number; state: StepperState; modelValue: number }', description: 'Custom step description content.' },
  { name: 'separator', parameters: '{ step: number; state: StepperState; modelValue: number }', description: 'Custom step separator content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'StepperOptionData',
    description: 'Stepper item data.',
    fields: [
      { name: 'step', type: 'number', description: 'Step index. Auto-generated from array order when omitted.' },
      { name: 'title', type: 'string', description: 'Step title.' },
      { name: 'description', type: 'string', description: 'Step description.' },
      { name: 'disabled', type: 'boolean', description: 'Whether the step is disabled.' },
      { name: 'completed', type: 'boolean', description: 'Whether the step is forced to completed state.' },
    ]
  },
  {
    name: 'Ui',
    description: 'Custom class mapping.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'item', type: 'string', description: 'Step item class.' },
      { name: 'trigger', type: 'string', description: 'Step trigger class.' },
      { name: 'indicator', type: 'string', description: 'Step indicator class.' },
      { name: 'separator', type: 'string', description: 'Step separator class.' },
      { name: 'title', type: 'string', description: 'Step title class.' },
      { name: 'description', type: 'string', description: 'Step description class.' },
      { name: 'itemContent', type: 'string', description: 'Title and description wrapper class.' },
      { name: 'indicatorIcon', type: 'string', description: 'Completed icon class.' },
    ]
  }
]"/>

<UnionType name="ThemeColor" description="Theme color type" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
