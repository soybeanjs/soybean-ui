<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectPaginationRootContext } from './context';
import type { PaginationNextPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationNext'
});

const props = withDefaults(defineProps<PaginationNextPropsWithPrimitive>(), { as: 'button' });

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
