<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface PaginationEllipsisProps extends PrimitiveProps {}

const props = defineProps<PaginationEllipsisProps>();
useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" data-type="ellipsis">
    <slot>&#8230;</slot>
  </Primitive>
</template>
