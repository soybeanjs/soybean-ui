<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import type { ListboxGroupProps } from '../listbox';
import { ListboxGroup } from '../listbox';
import { createContext, useId } from '../../composables';
import { injectComboboxRootContext } from './combobox-root.vue';

export interface ComboboxGroupProps extends ListboxGroupProps {}

type ComboboxGroupContext = {
  id: string;
  labelId: string;
};

export const [injectComboboxGroupContext, provideComboboxGroupContext] =
  createContext<ComboboxGroupContext>('ComboboxGroup');

const props = defineProps<ComboboxGroupProps>();
const id = useId(undefined, 'soybean-combobox-group');
const rootContext = injectComboboxRootContext();

const isRender = computed(() =>
  rootContext.ignoreFilter.value
    ? true
    : !rootContext.filterState.search
      ? true
      : rootContext.filterState.filtered.groups.has(id)
);

const context = provideComboboxGroupContext({
  id,
  labelId: ''
});

onMounted(() => {
  if (!rootContext.allGroups.value.has(id)) rootContext.allGroups.value.set(id, new Set());
});
onUnmounted(() => {
  rootContext.allGroups.value.delete(id);
});
</script>

<template>
  <ListboxGroup :id="id" :aria-labelledby="context.labelId" v-bind="props" :hidden="isRender ? undefined : true">
    <slot />
  </ListboxGroup>
</template>
