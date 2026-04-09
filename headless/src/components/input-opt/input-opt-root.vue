<script setup lang="ts">
import { computed, nextTick, shallowRef, useAttrs, watch } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import { provideInputOptRootContext, useInputOptUi } from './context';
import type { InputHTMLAttributes, PropType } from 'vue';
import type { InputOptRootEmits, InputOptSlotData, InputOptTextAlign } from './types';

defineOptions({
  name: 'InputOptRoot',
  inheritAttrs: false
});

// eslint-disable-next-line vue/define-props-declaration
const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  autofocus: Boolean,
  autocomplete: {
    type: String as PropType<InputHTMLAttributes['autocomplete']>,
    default: 'one-time-code'
  },
  defaultValue: {
    type: String,
    default: ''
  },
  disabled: Boolean,
  inputmode: {
    type: String as PropType<InputHTMLAttributes['inputmode']>,
    default: 'numeric'
  },
  maxlength: {
    type: Number,
    required: true
  },
  modelValue: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  pattern: {
    type: [String, RegExp] as PropType<string | RegExp>,
    default: undefined
  },
  placeholder: {
    type: String,
    default: undefined
  },
  pasteTransformer: {
    type: Function as PropType<(value: string | undefined) => string>,
    default: undefined
  },
  readonly: Boolean,
  required: Boolean,
  textAlign: {
    type: String as PropType<InputOptTextAlign>,
    default: 'left'
  }
});

const emit = defineEmits<InputOptRootEmits>();

const attrs = useAttrs();

const [inputElement, setInputElement] = useForwardElement();

const cls = useInputOptUi('root');
const inputCls = useInputOptUi('input');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue ?? ''
);

const isFocused = shallowRef(false);
const isHovering = shallowRef(false);
const selectionStart = shallowRef<number | null>(null);
const selectionEnd = shallowRef<number | null>(null);

const autocomplete = computed(() => props.autocomplete ?? 'one-time-code');
const inputmode = computed(() => props.inputmode ?? 'numeric');
const textAlign = computed(() => props.textAlign ?? 'left');
const currentValue = computed(() => modelValue.value ?? '');

const regexp = computed(() => {
  if (!props.pattern) return null;

  return typeof props.pattern === 'string' ? new RegExp(props.pattern) : props.pattern;
});

const slots = computed<InputOptSlotData[]>(() => {
  const value = currentValue.value;
  const maxLength = Math.max(props.maxlength, 0);
  const caretIndex = Math.min(selectionStart.value ?? value.length, Math.max(maxLength - 1, 0));

  return Array.from({ length: maxLength }, (_, index) => {
    const char = value[index] ?? null;
    const placeholderChar = char === null ? props.placeholder?.[index] ?? null : null;
    const isRangeSelection = selectionStart.value !== null && selectionEnd.value !== null && selectionStart.value !== selectionEnd.value;
    const isActive = isFocused.value
      && selectionStart.value !== null
      && selectionEnd.value !== null
      && (isRangeSelection
        ? index >= selectionStart.value && index < selectionEnd.value
        : index === caretIndex);

    return {
      char,
      placeholderChar,
      hasFakeCaret: isActive && char === null,
      isActive
    };
  });
});

function updateSelectionMirror() {
  const input = inputElement.value as HTMLInputElement | undefined;

  if (!input) return;

  selectionStart.value = input.selectionStart;
  selectionEnd.value = input.selectionEnd;
}

function focusActiveRange() {
  const input = inputElement.value as HTMLInputElement | undefined;

  if (!input || props.disabled) return;

  const valueLength = currentValue.value.length;
  const start = Math.min(valueLength, Math.max(props.maxlength - 1, 0));

  input.setSelectionRange(start, valueLength);
  selectionStart.value = start;
  selectionEnd.value = valueLength;
}

function isValidValue(value: string) {
  if (!value || !regexp.value) return true;

  return regexp.value.test(value);
}

function setValue(value: string) {
  const nextValue = value.slice(0, props.maxlength);

  if (!isValidValue(nextValue)) return false;

  modelValue.value = nextValue;
  return true;
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!setValue(input.value)) {
    input.value = currentValue.value;
  }

  nextTick(updateSelectionMirror);
}

function onBlur() {
  isFocused.value = false;
  selectionStart.value = null;
  selectionEnd.value = null;
}

function onFocus() {
  isFocused.value = true;
  focusActiveRange();
}

function onMouseLeave() {
  isHovering.value = false;
}

function onMouseOver() {
  isHovering.value = !props.disabled;
}

function onPaste(event: ClipboardEvent) {
  if (!props.pasteTransformer) return;

  const input = inputElement.value as HTMLInputElement | undefined;

  if (!input) return;

  event.preventDefault();

  const pastedValue = props.pasteTransformer(event.clipboardData?.getData('text/plain'));
  const start = input.selectionStart ?? currentValue.value.length;
  const end = input.selectionEnd ?? currentValue.value.length;
  const nextValue = `${currentValue.value.slice(0, start)}${pastedValue}${currentValue.value.slice(end)}`;

  if (!setValue(nextValue)) return;

  nextTick(() => {
    const selection = Math.min(nextValue.length, props.maxlength);

    input.setSelectionRange(selection, selection);
    updateSelectionMirror();
  });
}

watch(
  modelValue,
  (value, previousValue) => {
    const nextValue = value ?? '';
    const previous = previousValue ?? '';

    if (nextValue !== previous && previous.length < props.maxlength && nextValue.length === props.maxlength) {
      emit('complete', nextValue);
    }

    nextTick(() => {
      if (isFocused.value) {
        updateSelectionMirror();
      }
    });
  }
);

provideInputOptRootContext({
  disabled: computed(() => props.disabled),
  maxlength: computed(() => props.maxlength),
  placeholder: computed(() => props.placeholder),
  modelValue,
  isFocused,
  isHovering,
  slots
});
</script>

<template>
  <div :class="cls" data-slot="input-opt" :data-disabled="disabled ? '' : undefined">
    <slot :slots="slots" :is-focused="isFocused" :is-hovering="isHovering" />
    <input
      v-bind="attrs"
      :id="id"
      :ref="setInputElement"
      :class="inputCls"
      data-slot="input-opt-input"
      :aria-placeholder="placeholder"
      autocapitalize="none"
      autocorrect="off"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :data-text-align="textAlign"
      :disabled="disabled"
      :inputmode="inputmode"
      :maxlength="maxlength"
      :name="name"
      :pattern="typeof pattern === 'string' ? pattern : pattern?.source"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      spellcheck="false"
      type="text"
      :value="currentValue"
      @blur="onBlur"
      @click="focusActiveRange"
      @focus="onFocus"
      @input="onInput"
      @mouseleave="onMouseLeave"
      @mouseover="onMouseOver"
      @paste="onPaste"
      @select="updateSelectionMirror"
    />
  </div>
</template>
