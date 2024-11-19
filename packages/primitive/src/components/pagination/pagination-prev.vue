<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectPaginationRootContext } from './context';
import type { PaginationPrevPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationPrev'
});

const props = withDefaults(defineProps<PaginationPrevPropsWithPrimitive>(), { as: 'button' });

useForwardExpose();
const rootContext = injectPaginationRootContext();

const disabled = computed((): boolean => rootContext.page.value === 1 || rootContext.disabled.value);
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Previous Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(rootContext.page.value - 1)"
  >
    <slot>Prev page</slot>
  </Primitive>
</template>
