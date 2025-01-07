<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import type { ToastTitlePropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastTitle'
});

const props = withDefaults(defineProps<ToastTitlePropsWithPrimitive>(), {
  as: 'div'
});

useForwardExpose();
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
