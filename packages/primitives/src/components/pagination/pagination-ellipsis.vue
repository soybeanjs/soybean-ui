<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
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
