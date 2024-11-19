<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { PaginationEllipsisPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationEllipsis'
});

const props = defineProps<PaginationEllipsisPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" data-type="ellipsis">
    <slot>&#8230;</slot>
  </Primitive>
</template>
