<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectPaginationRootContext } from './pagination-root.vue';

export interface PaginationListItemProps extends PrimitiveProps {
  /** Value for the page */
  value: number;
}

const props = withDefaults(defineProps<PaginationListItemProps>(), { as: 'button' });
useForwardExpose();

const rootContext = injectPaginationRootContext();
const isSelected = computed(() => rootContext.page.value === props.value);

const disabled = computed((): boolean => rootContext.disabled.value);
</script>

<template>
  <Primitive
    v-bind="props"
    data-type="page"
    :aria-label="`Page ${value}`"
    :aria-current="isSelected ? 'page' : undefined"
    :data-selected="isSelected ? 'true' : undefined"
    :disabled
    :type="as === 'button' ? 'button' : undefined"
    @click="!disabled && rootContext.onPageChange(value)"
  >
    <slot>{{ value }}</slot>
  </Primitive>
</template>
