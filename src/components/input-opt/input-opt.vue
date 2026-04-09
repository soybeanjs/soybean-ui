<script setup lang="ts">
import { computed } from 'vue';
import { InputOptRoot, provideInputOptUi } from '@soybeanjs/headless';
import { useForwardListeners } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { inputOptVariants } from './variants';
import type { InputHTMLAttributes, PropType } from 'vue';
import type { ClassValue, InputOptTextAlign, InputOptUi } from '@soybeanjs/headless';
import type { InputOptEmits } from './types';

defineOptions({
  name: 'SInputOpt'
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
  class: {
    type: [String, Array, Object] as PropType<ClassValue>,
    default: undefined
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
  },
  ui: {
    type: Object as PropType<Partial<InputOptUi>>,
    default: undefined
  }
});

const emit = defineEmits<InputOptEmits>();

const listeners = useForwardListeners(emit);

const forwardedProps = computed(() => ({
  id: props.id,
  autofocus: props.autofocus,
  autocomplete: props.autocomplete,
  defaultValue: props.defaultValue,
  disabled: props.disabled,
  inputmode: props.inputmode,
  maxlength: props.maxlength,
  modelValue: props.modelValue,
  name: props.name,
  pattern: props.pattern,
  placeholder: props.placeholder,
  pasteTransformer: props.pasteTransformer,
  readonly: props.readonly,
  required: props.required,
  textAlign: props.textAlign
}));

const ui = computed(() => mergeSlotVariants(inputOptVariants(), props.ui, { root: props.class }));

provideInputOptUi(ui);
</script>

<template>
  <InputOptRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-bind="slotProps" />
  </InputOptRoot>
</template>
