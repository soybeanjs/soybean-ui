<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectPaginationRootContext } from './context';
import type { PaginationLastPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationLast'
});

const props = withDefaults(defineProps<PaginationLastPropsWithPrimitive>(), { as: 'button' });

const rootContext = injectPaginationRootContext();
useForwardExpose();

const disabled = computed(
  (): boolean => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value
);
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Last Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(rootContext.pageCount.value)"
  >
    <slot>Last page</slot>
  </Primitive>
</template>
