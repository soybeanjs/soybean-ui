<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import { usePrimitiveElement } from '../../composables';
import { ListboxFilter, injectListboxRootContext } from '../listbox';
import { injectComboboxRootContext } from './context';
import type { ComboboxInputEmits, ComboboxInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxInput'
});

const props = withDefaults(defineProps<ComboboxInputPropsWithPrimitive>(), {
  modelValue: undefined,
  as: 'input'
});

const emit = defineEmits<ComboboxInputEmits>();

const rootContext = injectComboboxRootContext();
const listboxContext = injectListboxRootContext();
const { primitiveElement, currentElement } = usePrimitiveElement();

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: (props.modelValue === undefined) as false
});

function handleKeyDown(_ev: KeyboardEvent) {
  if (!rootContext.open.value) rootContext.onOpenChange(true);
}

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  if (!rootContext.open.value) {
    rootContext.onOpenChange(true);
    nextTick(() => {
      if (target.value) {
        rootContext.filterSearch.value = target.value;
        listboxContext.highlightFirstItem();
      }
    });
  } else {
    rootContext.filterSearch.value = target.value;
  }
}

function resetSearchTerm() {
  const rootModelValue = rootContext.modelValue.value;

  if (props.displayValue) {
    modelValue.value = props.displayValue(rootModelValue);
  } else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) {
    if (typeof rootModelValue !== 'object') {
      modelValue.value = rootModelValue.toString();
    } else modelValue.value = '';
  } else {
    modelValue.value = '';
  }

  nextTick(() => {
    // Temporary force reassign
    // eslint-disable-next-line no-self-assign
    modelValue.value = modelValue.value;
  });
}

rootContext.onResetSearchTerm(() => {
  resetSearchTerm();
});

watch(
  rootContext.modelValue,
  async () => {
    if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) {
      resetSearchTerm();
    }
  },
  { immediate: true, deep: true }
);

watch(rootContext.filterState, () => {
  // we exclude virtualized list as the state would be constantly updated
  if (!rootContext.isVirtual.value) {
    listboxContext.highlightFirstItem();
  }
});

onMounted(() => {
  if (currentElement.value) rootContext.onInputElementChange(currentElement.value as HTMLInputElement);
});
</script>

<template>
  <ListboxFilter
    ref="primitiveElement"
    v-model="modelValue"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :auto-focus="autoFocus"
    :aria-expanded="rootContext.open.value"
    :aria-controls="rootContext.contentId"
    aria-autocomplete="list"
    role="combobox"
    autocomplete="false"
    @input="handleInput"
    @keydown.down.up.prevent="handleKeyDown"
  >
    <slot />
  </ListboxFilter>
</template>
