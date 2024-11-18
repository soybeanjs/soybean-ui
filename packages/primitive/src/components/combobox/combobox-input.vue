<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue';
import { usePrimitiveElement } from '../../composables';
import { ListboxFilter, injectListboxRootContext } from '../listbox';
import type { ComboboxInputPropsWithPrimitive } from './types';
import { injectComboboxRootContext } from './context';

defineOptions({
  name: 'ComboboxInput'
});

const props = withDefaults(defineProps<ComboboxInputPropsWithPrimitive>(), {
  as: 'input'
});
const rootContext = injectComboboxRootContext();
const listboxContext = injectListboxRootContext();
const { primitiveElement, currentElement } = usePrimitiveElement();

const modelValue = defineModel<string>('modelValue');

function handleKeyDown(_ev: KeyboardEvent) {
  if (!rootContext.open.value) rootContext.onOpenChange(true);
}

function handleInput(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  if (!rootContext.open.value) {
    rootContext.onOpenChange(true);
    nextTick(() => {
      if (target.value) {
        rootContext.filterState.search = target.value;
        listboxContext.highlightFirstItem(event);
      }
    });
  } else {
    rootContext.filterState.search = target.value;
  }
}

function resetSearchTerm() {
  const rootModelValue = rootContext.modelValue.value;

  if (props.displayValue) {
    modelValue.value = props.displayValue(rootModelValue);
  } else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) {
    if (typeof rootModelValue !== 'object') modelValue.value = rootModelValue.toString();
    else modelValue.value = '';
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
    if (!rootContext.isUserInputted.value) resetSearchTerm();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (currentElement.value) rootContext.onInputElementChange(currentElement.value as HTMLInputElement);
});
</script>

<template>
  <ListboxFilter
    ref="primitiveElement"
    v-model="modelValue"
    :class="props.class"
    :as
    :as-child
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
