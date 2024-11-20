<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import type { ToastDescriptionPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastDescription',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastDescriptionPropsWithPrimitive>(), {
  as: 'div'
});

useForwardExpose();
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
