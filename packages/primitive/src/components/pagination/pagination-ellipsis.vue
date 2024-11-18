<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';

export interface PaginationEllipsisProps extends PrimitiveProps {}

const props = defineProps<PaginationEllipsisProps>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" data-type="ellipsis">
    <slot>&#8230;</slot>
  </Primitive>
</template>
