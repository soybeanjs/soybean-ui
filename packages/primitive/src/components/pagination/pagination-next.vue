<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectPaginationRootContext } from './pagination-root.vue';

export interface PaginationNextProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PaginationNextProps>(), { as: 'button' });

useForwardExpose();
const rootContext = injectPaginationRootContext();

const disabled = computed(
  (): boolean => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value
);
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Next Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(rootContext.page.value + 1)"
  >
    <slot>Next page</slot>
  </Primitive>
</template>
