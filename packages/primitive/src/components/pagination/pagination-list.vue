<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectPaginationRootContext } from './pagination-root.vue';
import { getRange, transform } from './utils';

export interface PaginationListProps extends PrimitiveProps {}

const props = defineProps<PaginationListProps>();

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
