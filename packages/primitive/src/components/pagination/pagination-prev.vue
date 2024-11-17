<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectPaginationRootContext } from './pagination-root.vue';

export interface PaginationPrevProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PaginationPrevProps>(), { as: 'button' });

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
