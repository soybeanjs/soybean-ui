<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectPaginationRootContext } from './pagination-root.vue';

export interface PaginationLastProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PaginationLastProps>(), { as: 'button' });

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
