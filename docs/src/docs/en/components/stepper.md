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

<ComponentApi component="stepper" />
