<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectPaginationRootContext } from './context';
import type { PaginationListItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'PaginationListItem'
});

const props = withDefaults(defineProps<PaginationListItemPropsWithPrimitive>(), { as: 'button' });
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
