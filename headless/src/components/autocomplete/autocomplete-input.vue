<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, shallowRef, watchSyncEffect } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { InputControl, InputRoot } from '../input';
import { useListboxRootContext } from '../listbox/context';
import { useAutocompleteRootContext } from './context';
import type { AutocompleteInputEmits, AutocompleteInputProps } from './types';

defineOptions({
  name: 'AutocompleteInput'
});

const props = defineProps<AutocompleteInputProps>();

const emit = defineEmits<AutocompleteInputEmits>();

const forwardedProps = useOmitProps(props, ['inputRef', 'controlProps']);

const {
  disabled: listboxDisabled,
  focusable,
  highlightedElement,
  highlightFirstItem,
  onCompositionEnd,
  onCompositionStart,
  onKeydownEnter,
  onKeydownNavigation
} = useListboxRootContext('AutocompleteInput');

const {
  modelValue,
  open,
  disabled: autocompleteDisabled,
  openOnClick,
  openOnFocus,
  onModelValueChange,
  onOpenChange,
  contentId,
  inputId: generatedInputId,
  initInputId,
  setInputElement
} = useAutocompleteRootContext('AutocompleteInput');

const [inputElement, setLocalInputElement] = useForwardElement(el => {
  const input = el as HTMLInputElement;

  setInputElement(input);
  props.inputRef?.(input);
});

const disabled = computed(() => props.disabled || listboxDisabled.value || autocompleteDisabled.value || false);
const activedescendant = shallowRef<string>();
const resolvedInputId = computed(() => props.id ?? props.controlProps?.id ?? generatedInputId.value);

const onUpdateModelValue = (value: string) => {
  onModelValueChange(value);
  emit('update:modelValue', value);
};

const openAndHighlight = () => {
  if (!open.value) {
    onOpenChange(true);
  }

  nextTick(() => {
    highlightFirstItem();
  });
};

const onInput = () => {
  openAndHighlight();
};

const onFocus = () => {
  if (!openOnFocus.value || open.value) return;

  openAndHighlight();
};

const onClick = () => {
  if (!openOnClick.value || open.value) return;

  openAndHighlight();
};

const onKeydown = (event: KeyboardEvent) => {
  if (!open.value) {
    openAndHighlight();
    return;
  }

  onKeydownNavigation(event);
};

watchSyncEffect(() => {
  activedescendant.value = highlightedElement.value?.id;
});

onMounted(() => {
  focusable.value = false;

  setTimeout(() => {
    if (props.autofocus) {
      inputElement.value?.focus();
    }
  }, 1);
});

onUnmounted(() => {
  focusable.value = true;
  setInputElement(undefined);
});

initInputId();
</script>

<template>
  <InputRoot v-slot="{ clear }" v-bind="forwardedProps" :model-value="modelValue" @update:model-value="onUpdateModelValue">
    <slot name="leading" :clear="clear" />
    <InputControl
      v-bind="controlProps"
      :id="resolvedInputId"
      :ref="setLocalInputElement"
      :aria-activedescendant="activedescendant"
      :aria-controls="contentId"
      :aria-expanded="open || false"
      aria-autocomplete="list"
      autocomplete="off"
      :disabled="disabled"
      role="combobox"
      spellcheck="false"
      type="text"
      @click="onClick"
      @compositionend="onCompositionEnd"
      @compositionstart="onCompositionStart"
      @focus="onFocus"
      @input="onInput"
      @keydown.down.up.home.end.prevent="onKeydown"
      @keydown.enter="onKeydownEnter"
    />
    <slot name="trailing" :clear="clear" />
  </InputRoot>
</template>
