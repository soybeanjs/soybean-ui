<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectPaginationRootContext } from './context';
import { getRange, transform } from './shared';
import type { PaginationListPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationList'
});

const props = defineProps<PaginationListPropsWithPrimitive>();

defineSlots<{
  default: (props: {
    /** Pages item */
    items: typeof transformedRange.value;
  }) => any;
}>();

useForwardExpose();
const rootContext = injectPaginationRootContext();

const transformedRange = computed(() => {
  return transform(
    getRange(
      rootContext.page.value,
      rootContext.pageCount.value,
      rootContext.siblingCount.value,
      rootContext.showEdges.value
    )
  );
});
</script>

<template>
  <Primitive v-bind="props">
    <slot :items="transformedRange" />
  </Primitive>
</template>
