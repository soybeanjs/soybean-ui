<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';

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
