<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue';
import { Primitive } from '../primitive';
import { useEditableRootContext, useEditableUi } from './context';
import type { EditableInputProps } from './types';

defineOptions({
  name: 'EditableInput'
});

const props = defineProps<EditableInputProps>();

const {
  dataDisabled,
  dataReadonly,
  dataState,
  inputElement,
  inputValue,
  isEditing,
  maxLength,
  placeholder,
  readonly,
  selectOnFocus,
  setInputElement,
  submitMode,
  disabled,
  cancel,
  submit
} = useEditableRootContext('EditableInput');

const cls = useEditableUi('input');

function focusInput() {
  inputElement.value?.focus({ preventScroll: true });

  if (selectOnFocus.value) {
    inputElement.value?.select();
  }
}

function onInput(event: Event) {
  inputValue.value = (event.target as HTMLInputElement).value;
}

function onKeydown(event: KeyboardEvent) {
  if (event.isComposing) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    cancel();
    return;
  }

  const submitOnEnter = submitMode.value === 'enter' || submitMode.value === 'both';

  if (submitOnEnter && event.key === 'Enter' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    submit();
  }
}

watch(isEditing, async value => {
  if (!value) return;

  await nextTick();
  focusInput();
});

onMounted(() => {
  if (!isEditing.value) return;

  focusInput();
});
</script>

<template>
  <Primitive
    v-bind="props"
    :ref="setInputElement"
    :as="props.as || 'input'"
    :as-child="props.asChild"
    :class="cls"
    aria-label="Editable input"
    :data-disabled="dataDisabled"
    :data-readonly="dataReadonly"
    :data-state="dataState"
    :disabled="disabled"
    :hidden="!isEditing"
    :maxlength="maxLength"
    :placeholder="placeholder.edit"
    :readonly="readonly"
    :value="inputValue"
    @input="onInput"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
