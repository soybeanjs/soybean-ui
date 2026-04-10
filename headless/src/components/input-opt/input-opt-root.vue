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

const NAVIGATION_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
const SELECTION_SYNC_DELAY = 0;

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

const rootElement = shallowRef<HTMLElement>();

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
const pendingSelection = shallowRef<{ start: number; end: number } | null>(null);
const skipModelSelectionSync = shallowRef(false);

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

function setSelectionRange(start: number, end = start) {
  const input = inputElement.value as HTMLInputElement | undefined;

  if (!input) return;

  input.setSelectionRange(start, end);
  selectionStart.value = start;
  selectionEnd.value = end;
}

function hasSelectionRange(start: number | null, end: number | null) {
  return start !== null && end !== null && start !== end;
}

function restorePendingSelection() {
  if (!pendingSelection.value) return false;

  setSelectionRange(pendingSelection.value.start, pendingSelection.value.end);
  pendingSelection.value = null;

  return true;
}

function selectSlot(slotIndex: number) {
  const slotValue = currentValue.value[slotIndex];

  if (slotValue === undefined) {
    setSelectionRange(slotIndex);
    return;
  }

  setSelectionRange(slotIndex, slotIndex + 1);
}

function getSlotIndexFromPoint(clientX: number, clientY: number) {
  const slotElements = rootElement.value?.querySelectorAll<HTMLElement>('[data-slot="input-opt-slot"]');

  if (!slotElements?.length) return null;

  const index = Array.from(slotElements).findIndex(slotElement => {
    const rect = slotElement.getBoundingClientRect();

    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  });

  return index === -1 ? null : index;
}

function focusActiveRange() {
  const input = inputElement.value as HTMLInputElement | undefined;

  if (!input || props.disabled) return;

  const valueLength = currentValue.value.length;
  const start = Math.min(valueLength, Math.max(props.maxlength - 1, 0));

  setSelectionRange(start, valueLength);
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
  const previousValue = currentValue.value;
  const previousSelectionStart = selectionStart.value;
  const previousSelectionEnd = selectionEnd.value;
  let nextSelectionStart = input.selectionStart;
  let nextSelectionEnd = input.selectionEnd;

  if (hasSelectionRange(previousSelectionStart, previousSelectionEnd)) {
    const activeSelectionStart = previousSelectionStart ?? 0;
    const activeSelectionEnd = previousSelectionEnd ?? activeSelectionStart;
    const replacedLength = activeSelectionEnd - activeSelectionStart;
    const insertedLength = Math.max(input.value.length - (previousValue.length - replacedLength), 0);
    const nextCaret = Math.min(activeSelectionStart + insertedLength, props.maxlength);

    nextSelectionStart = nextCaret;
    nextSelectionEnd = nextCaret;
  }

  if (!setValue(input.value)) {
    input.value = currentValue.value;
    pendingSelection.value = null;
    skipModelSelectionSync.value = false;
    nextTick(updateSelectionMirror);
    return;
  }

  pendingSelection.value = nextSelectionStart !== null && nextSelectionEnd !== null
    ? {
        start: Math.min(nextSelectionStart, props.maxlength),
        end: Math.min(nextSelectionEnd, props.maxlength)
      }
    : null;
  selectionStart.value = pendingSelection.value?.start ?? null;
  selectionEnd.value = pendingSelection.value?.end ?? null;
  skipModelSelectionSync.value = true;

  nextTick(() => {
    setTimeout(() => {
      if (isFocused.value && !restorePendingSelection()) {
        updateSelectionMirror();
      }

      skipModelSelectionSync.value = false;
    }, SELECTION_SYNC_DELAY);
  });
}

function onBlur() {
  isFocused.value = false;
  selectionStart.value = null;
  selectionEnd.value = null;
  pendingSelection.value = null;
}

function onFocus() {
  isFocused.value = true;
  focusActiveRange();
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 || props.disabled || props.readonly) return;

  const slotIndex = getSlotIndexFromPoint(event.clientX, event.clientY);

  if (slotIndex === null) return;

  event.preventDefault();
  (inputElement.value as HTMLInputElement | undefined)?.focus();
  isFocused.value = true;
  selectSlot(slotIndex);
}

function onClick(event: MouseEvent) {
  const slotIndex = getSlotIndexFromPoint(event.clientX, event.clientY);

  if (slotIndex !== null) {
    selectSlot(slotIndex);
  }
}

function syncSelectionMirrorSoon() {
  setTimeout(() => {
    if (isFocused.value) {
      updateSelectionMirror();
    }
  }, SELECTION_SYNC_DELAY);
}

function onKeydown(event: KeyboardEvent) {
  const isSelectAll = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a';
  const shouldSyncSelection = isSelectAll || NAVIGATION_KEYS.includes(event.key);

  if (!shouldSyncSelection) return;

  syncSelectionMirrorSoon();
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
      if (skipModelSelectionSync.value) return;

      if (isFocused.value && !restorePendingSelection()) {
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
  <div ref="rootElement" :class="cls" data-slot="input-opt" :data-disabled="disabled ? '' : undefined">
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
      @click="onClick"
      @focus="onFocus"
      @input="onInput"
      @keydown="onKeydown"
      @mouseleave="onMouseLeave"
      @mouseover="onMouseOver"
      @paste="onPaste"
      @pointerdown="onPointerDown"
      @select="updateSelectionMirror"
    />
  </div>
</template>
