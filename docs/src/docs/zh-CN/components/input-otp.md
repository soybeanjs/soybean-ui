# InputOtp

## 概述

InputOtp 是一个基于真实原生 input 的验证码输入组件。它保留了 vue-input-otp 中成熟的选区、粘贴、移动端自动填充和密码管理器适配行为，同时提供 SoybeanUI 默认样式和可完全自定义的 scoped slot。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SInputOtp } from '@soybeanjs/ui';

const otp = ref('');
</script>

<template>
  <SInputOtp v-model="otp" :maxlength="6" placeholder="123456" aria-label="验证码" />
</template>
```

## 演示

```playground
basic
placeholder
custom-slot
disabled
```

## API

<ComponentApi component="input-otp" />
