<script setup lang="ts">
import { computed } from 'vue';
import { provideListboxGroupContext, useListboxUi } from '../listbox/context';
import { useComboboxRootContext } from './context';
import type { ComboboxGroupProps } from './types';

defineOptions({
  name: 'ComboboxGroup'
});

defineProps<ComboboxGroupProps>();

const { id } = provideListboxGroupContext();
const { filterSearch, ignoreFilter, filterState } = useComboboxRootContext('ComboboxGroup');
const cls = useListboxUi('group');

const visible = computed(() => {
  if (!filterSearch.value || ignoreFilter.value) {
    return true;
  }

  return filterState.value.groups.has(id);
});
</script>

<template>
  <div v-if="visible" :aria-labelledby="id" role="group" :class="cls">
    <slot />
  </div>
</template>
