<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import {
  useDirection,
  useFocusOutside,
  useFormControl,
  usePointerDownOutside,
  usePrimitiveElement
} from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import type { EditableRootEmits, EditableRootPropsWithPrimitive } from './types';
import { provideEditableRootContext } from './context';

defineOptions({
  name: 'EditableRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<EditableRootPropsWithPrimitive>(), {
  as: 'div',
  modelValue: undefined,
  disabled: false,
  submitMode: 'blur',
  activationMode: 'focus',
  selectOnFocus: false,
  placeholder: 'Enter text...',
  autoResize: false,
  required: false
});

const emit = defineEmits<EditableRootEmits>();

const {
  id,
  name,
  defaultValue,
  startWithEditMode,
  placeholder: propPlaceholder,
  maxLength,
  disabled,
  dir: propDir,
  submitMode,
  activationMode,
  selectOnFocus,
  readonly,
  autoResize,
  required
} = toRefs(props);

const inputRef = ref<HTMLInputElement | undefined>();
const dir = useDirection(propDir);
const isEditing = ref(startWithEditMode.value ?? false);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: defaultValue.value ?? '',
  passive: (props.modelValue === undefined) as false
});

const { primitiveElement, currentElement } = usePrimitiveElement();

const isFormControl = useFormControl(currentElement);

const placeholder = computed(() => {
  return typeof propPlaceholder.value === 'string'
    ? { edit: propPlaceholder.value, preview: propPlaceholder.value }
    : propPlaceholder.value;
});

const previousValue = ref(modelValue.value);

function cancel() {
  modelValue.value = previousValue.value;
  isEditing.value = false;
  emit('update:state', 'cancel');
}

function edit() {
  isEditing.value = true;
  emit('update:state', 'edit');
}

function submit() {
  previousValue.value = modelValue.value;
  isEditing.value = false;

  emit('update:state', 'submit');
  emit('submit', modelValue.value);
}

function handleDismiss() {
  if (isEditing.value) {
    if (submitMode.value === 'blur' || submitMode.value === 'both') submit();
    else cancel();
  }
}

const pointerDownOutside = usePointerDownOutside(() => handleDismiss(), currentElement);
const focusOutside = useFocusOutside(() => handleDismiss(), currentElement);
const isEmpty = computed(() => modelValue.value === '');

defineExpose({
  /** Function to submit the value of the editable */
  submit,
  /** Function to cancel the value of the editable */
  cancel,
  /** Function to set the editable in edit mode */
  edit
});

provideEditableRootContext({
  id,
  name,
  disabled,
  isEditing,
  maxLength,
  modelValue,
  placeholder,
  edit,
  cancel,
  submit,
  activationMode,
  submitMode,
  selectOnFocus,
  inputRef,
  startWithEditMode,
  isEmpty,
  readonly,
  autoResize
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    ref="primitiveElement"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :dir="dir"
    @focus.capture="focusOutside.onFocusCapture"
    @blur.capture="focusOutside.onBlurCapture"
    @pointerdown.capture="pointerDownOutside.onPointerDownCapture"
  >
    <slot
      :model-value="modelValue"
      :is-editing="isEditing"
      :is-empty="isEmpty"
      :submit="submit"
      :cancel="cancel"
      :edit="edit"
    />

    <VisuallyHiddenInput
      v-if="isFormControl && name"
      type="text"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
