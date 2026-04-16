<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { provideListboxGroupContext, useListboxUi } from '../listbox/context';
import { useComboboxRootContext } from './context';
import type { ComboboxGroupProps } from './types';

defineOptions({
  name: 'ComboboxGroup'
});

defineProps<ComboboxGroupProps>();

const { id } = provideListboxGroupContext();
const { filterSearch, ignoreFilter, filterState, allGroups } = useComboboxRootContext('ComboboxGroup');
const cls = useListboxUi('group');

const visible = computed(() => {
  if (!filterSearch.value || ignoreFilter.value) {
    return true;
  }

  return filterState.value.groups.has(id);
});

onMounted(() => {
  if (!allGroups.value.has(id)) {
    allGroups.value.set(id, new Set());
  }
});

onUnmounted(() => {
  allGroups.value.delete(id);
});
</script>

<template>
  <div :aria-labelledby="id" role="group" :class="cls" :hidden="visible ? undefined : true" data-slot="group">
    <slot />
  </div>
</template>
