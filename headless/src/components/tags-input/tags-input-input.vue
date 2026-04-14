<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { Primitive } from '../primitive';
import { useTagsInputRootContext, useTagsInputUi } from './context';
import type { TagsInputInputProps } from './types';

defineOptions({
  name: 'TagsInputInput'
});

const props = withDefaults(defineProps<TagsInputInputProps>(), {
  as: 'input'
});

const cls = useTagsInputUi('input');

const {
  id,
  addOnPaste,
  addOnBlur,
  addOnTab,
  delimiter,
  disabled,
  isInvalidInput,
  onAddValue,
  onInputKeydown,
  selectedElement
} = useTagsInputRootContext('TagsInputInput');

const isComposing = ref(false);
const isNativeInput = computed(() => !props.asChild && (props.as === undefined || props.as === 'input'));

const handleBlur = (event: FocusEvent) => {
  selectedElement.value = undefined;

  if (!addOnBlur.value) return;

  const target = event.target as HTMLInputElement;
  const relatedTarget = event.relatedTarget as HTMLElement | null;
  const controlledId = target.getAttribute('aria-controls');
  if (controlledId && relatedTarget?.closest(`#${controlledId}`)) {
    return;
  }

  if (!target.value) return;

  const normalizedValue = target.value.trim();
  if (!normalizedValue) {
    target.value = '';
    return;
  }

  const isAdded = onAddValue(normalizedValue);
  if (isAdded) {
    target.value = '';
  }
};

const handleInput = (event: InputEvent) => {
  isInvalidInput.value = false;

  if (event.data === null) return;

  const delimiterValue = delimiter.value ?? ',';
  const matchesDelimiter =
    typeof delimiterValue === 'string' ? delimiterValue === event.data : new RegExp(delimiterValue).test(event.data);

  if (!matchesDelimiter) return;

  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(delimiterValue, '');

  const normalizedValue = target.value.trim();
  if (!normalizedValue) {
    target.value = '';
    return;
  }

  const isAdded = onAddValue(normalizedValue);
  if (isAdded) {
    target.value = '';
  }
};

const handlePaste = (event: ClipboardEvent) => {
  if (!addOnPaste.value) return;

  event.preventDefault();

  const clipboardData = event.clipboardData;
  if (!clipboardData) return;

  const value = clipboardData.getData('text');
  const delimiterValue = delimiter.value ?? ',';
  const values =
    typeof delimiterValue === 'string' ? value.split(delimiterValue) : value.split(new RegExp(delimiterValue));

  values.forEach(item => {
    const normalizedValue = item.trim();
    if (normalizedValue) {
      onAddValue(normalizedValue);
    }
  });
};

const handleCustomKeydown = async (event: KeyboardEvent) => {
  if (isComposing.value || event.defaultPrevented) return;

  await nextTick();

  const target = event.target as HTMLInputElement;
  if (!target.value) return;

  const normalizedValue = target.value.trim();
  if (!normalizedValue) {
    target.value = '';
    event.preventDefault();
    return;
  }

  const isAdded = onAddValue(normalizedValue);
  if (isAdded) {
    target.value = '';
  }

  event.preventDefault();
};

const handleTab = (event: KeyboardEvent) => {
  if (!addOnTab.value) return;

  void handleCustomKeydown(event);
};

const onCompositionStart = () => {
  isComposing.value = true;
};

const onCompositionEnd = () => {
  nextTick(() => {
    isComposing.value = false;
  });
};
</script>

<template>
  <Primitive
    :id="props.id || id"
    :as="props.as"
    :as-child="props.asChild"
    :class="cls"
    :type="isNativeInput ? 'text' : undefined"
    :autocomplete="isNativeInput ? 'off' : undefined"
    :autocorrect="isNativeInput ? 'off' : undefined"
    :autocapitalize="isNativeInput ? 'off' : undefined"
    :autofocus="isNativeInput ? props.autofocus : undefined"
    :placeholder="isNativeInput ? props.placeholder : undefined"
    :maxlength="isNativeInput ? props.maxlength : undefined"
    :aria-label="props['aria-label']"
    :aria-controls="props['aria-controls']"
    :disabled="disabled || props.disabled"
    :data-invalid="isInvalidInput ? '' : undefined"
    @input="handleInput"
    @keydown.enter="handleCustomKeydown"
    @keydown.tab="handleTab"
    @keydown="onInputKeydown"
    @blur="handleBlur"
    @paste="handlePaste"
    @compositionstart="onCompositionStart"
    @compositionend="onCompositionEnd"
  >
    <slot />
  </Primitive>
</template>
