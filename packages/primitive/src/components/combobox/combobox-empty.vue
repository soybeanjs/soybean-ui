<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectComboboxRootContext } from './combobox-root.vue';

export interface ComboboxEmptyProps extends PrimitiveProps {}

const props = defineProps<ComboboxEmptyProps>();
const rootContext = injectComboboxRootContext();

const isRender = computed(() =>
  rootContext.ignoreFilter.value
    ? rootContext.allItems.value.size === 0
    : Boolean(rootContext.filterState.search) && rootContext.filterState.filtered.count === 0
);
</script>

<template>
  <Primitive v-if="isRender" v-bind="props">
    <slot>No options</slot>
  </Primitive>
</template>
