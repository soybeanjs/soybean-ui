<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';

export interface ToastDescriptionProps extends PrimitiveProps {}

const props = defineProps<ToastDescriptionProps>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
