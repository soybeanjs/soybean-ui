<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectPaginationRootContext } from './context';
import type { PaginationFirstPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationFirst'
});

const props = withDefaults(defineProps<PaginationFirstPropsWithPrimitive>(), { as: 'button' });

const rootContext = injectPaginationRootContext();
useForwardExpose();

const disabled = computed((): boolean => rootContext.page.value === 1 || rootContext.disabled.value);
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="First Page"
    :type="as === 'button' ? 'button' : undefined"
    :disabled
    @click="!disabled && rootContext.onPageChange(1)"
  >
    <slot>First page</slot>
  </Primitive>
</template>
