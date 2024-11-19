<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { ComboboxSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxSeparator'
});

const props = defineProps<ComboboxSeparatorPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
