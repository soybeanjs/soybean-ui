<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useComboboxRootContext, useComboboxUi } from './context';
import type { ComboboxEmptyProps } from './types';

defineOptions({
  name: 'ComboboxEmpty'
});

const props = withDefaults(defineProps<ComboboxEmptyProps>(), {
  as: 'div'
});

const cls = useComboboxUi('empty');

const { allItems, filterState, ignoreFilter, filterSearch } = useComboboxRootContext('ComboboxEmpty');

const visible = computed(() => {
  if (!filterSearch.value.trim()) {
    return false;
  }

  if (ignoreFilter.value) {
    return allItems.value.size === 0;
  }

  return filterState.value.count === 0;
});
</script>

<template>
  <Primitive v-if="visible" v-bind="props" :class="cls" data-slot="empty">
    <slot />
  </Primitive>
</template>
