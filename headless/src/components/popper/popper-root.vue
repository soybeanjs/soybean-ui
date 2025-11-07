<script setup lang="ts">
import { providePopperRootContext } from './context';

defineOptions({
  name: 'PopperRoot',
  inheritAttrs: false
});

providePopperRootContext();
</script>

<template>
  <slot />
</template>
