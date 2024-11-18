<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, onMounted, onUnmounted } from 'vue';
import { useId, usePrimitiveElement } from '../../composables';
import { ListboxItem } from '../listbox';
import type { AcceptableValue } from '../../types';
import { injectComboboxGroupContext, injectComboboxRootContext } from './context';
import type { ComboboxItemEmits, ComboboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxItem'
});

const props = defineProps<ComboboxItemPropsWithPrimitive<T>>();
const emit = defineEmits<ComboboxItemEmits<T>>();

const id = useId(undefined, 'soybean-combobox-item');
const rootContext = injectComboboxRootContext();
const groupContext = injectComboboxGroupContext(null);

const { primitiveElement, currentElement } = usePrimitiveElement();

if (!props.value) {
  throw new Error(
    'A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.'
  );
}

const isRender = computed(() => {
  if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterState.search) return true;
  return rootContext.filterState.filtered.items.get(id)! > 0;
});

function onSelect(event: Event) {
  emit('select', event as any);

  if (event.defaultPrevented) return;
  if (rootContext.multiple.value) return;

  event.preventDefault();
  rootContext.onOpenChange(false);
  rootContext.modelValue.value = props.value;
}

onMounted(() => {
  // textValue to perform filter
  rootContext.allItems.value.set(
    id,
    // eslint-disable-next-line unicorn/prefer-dom-node-text-content
    props.textValue || currentElement.value.textContent || currentElement.value.innerText
  );

  const groupId = groupContext?.id;
  if (groupId) {
    if (!rootContext.allGroups.value.has(groupId)) {
      rootContext.allGroups.value.set(groupId, new Set([id]));
    } else {
      rootContext.allGroups.value.get(groupId)?.add(id);
    }
  }
});

onUnmounted(() => {
  rootContext.allItems.value.delete(id);
});
</script>

<template>
  <ListboxItem v-if="isRender" v-bind="props" :id="id" ref="primitiveElement" @select="onSelect">
    <slot>{{ value }}</slot>
  </ListboxItem>
</template>
