<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

export interface ComboboxSeparatorProps extends PrimitiveProps {}

const props = defineProps<ComboboxSeparatorProps>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
