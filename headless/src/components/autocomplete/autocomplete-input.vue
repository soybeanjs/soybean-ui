<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useId, watchSyncEffect } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { useComboboxRootContext } from '../combobox/context';
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
  open,
  contentId,
  inputElement: comboboxInputElement,
  triggerElement,
  disabled: comboboxDisabled,
  openOnClick,
  openOnFocus,
  filterSearch,
  isUserInputted,
  onOpenChange,
  onInputElementChange
} = useComboboxRootContext('AutocompleteInput');

const { modelValue } = useAutocompleteRootContext('AutocompleteInput');

const generatedInputId = useId();

const [localInputElement, setLocalInputElement] = useForwardElement(el => {
  const input = el as HTMLInputElement;

  onInputElementChange(input);
  props.inputRef?.(input);
});

const disabled = computed(() => props.disabled || listboxDisabled.value || comboboxDisabled.value || false);
const activedescendant = shallowRef<string>();
const resolvedInputId = computed(
  () => props.id ?? props.controlProps?.id ?? `soybean-autocomplete-input-${generatedInputId}`
);

const onUpdateModelValue = (value: string) => {
  modelValue.value = value;
  emit('update:modelValue', value);
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  isUserInputted.value = true;

  if (!open.value) {
    onOpenChange(true);

    nextTick(() => {
      if (target.value) {
        filterSearch.value = target.value;
        highlightFirstItem();
      }
    });

    return;
  }

  filterSearch.value = target.value;
};

const onFocus = () => {
  if (!openOnFocus.value || open.value) return;

  onOpenChange(true);
};

const onClick = () => {
  if (!openOnClick.value || open.value) return;

  onOpenChange(true);
};

const onKeydown = (event: KeyboardEvent) => {
  if (!open.value) {
    onOpenChange(true);
    return;
  }

  onKeydownNavigation(event);
};

const onBlur = (event: FocusEvent) => {
  if (!open.value) {
    return;
  }

  const nextFocus = event.relatedTarget as Element | null;

  if (!nextFocus) {
    return;
  }

  const isInsideTrigger = triggerElement.value?.contains(nextFocus);
  const isInsideContent = document.getElementById(contentId.value)?.contains(nextFocus);

  if (!isInsideTrigger && !isInsideContent) {
    onOpenChange(false);
  }
};

watchSyncEffect(() => {
  activedescendant.value = highlightedElement.value?.id;
});

onMounted(() => {
  focusable.value = false;

  setTimeout(() => {
    if (props.autofocus) {
      localInputElement.value?.focus();
    }
  }, 1);
});

onUnmounted(() => {
  focusable.value = true;
  comboboxInputElement.value = undefined;
});
</script>

<template>
  <InputRoot
    v-slot="{ clear }"
    v-bind="forwardedProps"
    :model-value="modelValue"
    @update:model-value="onUpdateModelValue"
  >
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
      @blur="onBlur"
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
