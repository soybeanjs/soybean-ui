<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { ListboxGroup } from '../listbox';
import { useId } from '../../composables';
import type { ComboboxGroupPropsWithPrimitive } from './types';
import { injectComboboxRootContext, provideComboboxGroupContext } from './context';

defineOptions({
  name: 'ComboboxGroup'
});

const props = defineProps<ComboboxGroupPropsWithPrimitive>();
const id = useId(undefined, 'soybean-combobox-group');
const rootContext = injectComboboxRootContext();

const isRender = computed(() => {
  const { ignoreFilter, filterState } = rootContext;
  if (ignoreFilter.value) return true;
  if (!filterState.search) return true;

  return filterState.filtered.groups.has(id);
});

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
