<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useId } from '../../composables';
import { ListboxGroup } from '../listbox';
import { injectComboboxRootContext, provideComboboxGroupContext } from './context';
import type { ComboboxGroupPropsWithPrimitive } from './types';

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
  <ListboxGroup v-bind="props" :id="id" :aria-labelledby="context.labelId" :hidden="isRender ? undefined : true">
    <slot />
  </ListboxGroup>
</template>
