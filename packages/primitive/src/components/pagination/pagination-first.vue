<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectPaginationRootContext } from './pagination-root.vue';

export interface PaginationFirstProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PaginationFirstProps>(), { as: 'button' });

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
