<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface ToastDescriptionProps extends PrimitiveProps {}

const props = defineProps<ToastDescriptionProps>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
