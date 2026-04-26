# InputOtp

## Overview

InputOtp is a one-time-password input built around a real native input. It keeps the robust selection, paste, and mobile autofill behavior from vue-input-otp while exposing a default SoybeanUI presentation and a fully custom scoped slot.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';

const otp = ref('');
</script>

<template>
  <SInputOtp v-model="otp" :maxlength="6" placeholder="123456" aria-label="Verification code" />
</template>
```

## Demo

```playground
basic
placeholder
custom-slot
disabled
```

## API

<ComponentApi component="input-otp" />
