<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectComboboxRootContext } from './context';
import type { ComboboxEmptyPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxEmpty'
});

const props = defineProps<ComboboxEmptyPropsWithPrimitive>();
const rootContext = injectComboboxRootContext();

const isRender = computed(() =>
  rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : rootContext.filterState.value.count === 0
);
</script>

<template>
  <Primitive v-if="isRender" v-bind="props">
    <slot>No options</slot>
  </Primitive>
</template>
