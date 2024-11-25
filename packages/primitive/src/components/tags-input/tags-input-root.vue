<script setup lang="ts" generic="T extends AcceptableInputValue = string">
import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useFocusWithin, useVModel } from '@vueuse/core';
import { useArrowNavigation, useCollection, useDirection, useFormControl, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideTagsInputRootContext } from './context';
import type { AcceptableInputValue, TagsInputRootEmits, TagsInputRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'TagsInputRoot'
});

const props = withDefaults(defineProps<TagsInputRootPropsWithPrimitive<T>>(), {
  defaultValue: () => [],
  delimiter: ',',
  max: 0,
  displayValue: (value: T) => value.toString()
});

const emit = defineEmits<TagsInputRootEmits<T>>();

const { addOnPaste, disabled, delimiter, max, id, dir: propDir, addOnBlur, addOnTab } = toRefs(props);
const dir = useDirection(propDir);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: true,
  deep: true
}) as Ref<AcceptableInputValue[]>;

const { forwardRef, currentElement } = useForwardExpose();
const { focused } = useFocusWithin(currentElement);
const isFormControl = useFormControl(currentElement);

const { getItems, CollectionSlot } = useCollection({ isProvider: true });

const selectedElement = ref<HTMLElement>();
const isInvalidInput = ref(false);

function handleRemoveTag(index: number) {
  if (index !== -1) {
    const collection = getItems().filter(i => i.ref.dataset.disabled !== '');
    modelValue.value.splice(index, 1);
    emit('removeTag', collection[index].value);
  }
}

provideTagsInputRootContext({
  modelValue,
  onAddValue: _payload => {
    const modelValueIsObject = modelValue.value.length > 0 && typeof modelValue.value[0] === 'object';
    const defaultValueIsObject = modelValue.value.length > 0 && typeof props.defaultValue[0] === 'object';

    // Check if the value is an object and if the convertValue function is provided. We don't check this a type level because the use
    // of `TagsInputInput` is optional.
    if ((modelValueIsObject || defaultValueIsObject) && typeof props.convertValue !== 'function')
      throw new Error('You must provide a `convertValue` function when using objects as values.');
    const payload = props.convertValue ? props.convertValue(_payload) : (_payload as T);

    if (modelValue.value.length >= max.value && Boolean(max.value)) {
      emit('invalid', payload);
      return false;
    }

    if (props.duplicate) {
      modelValue.value.push(payload);
      emit('addTag', payload);
      return true;
    }
    const exist = modelValue.value.includes(payload);
    if (!exist) {
      modelValue.value.push(payload);
      emit('addTag', payload);
      return true;
    }
    isInvalidInput.value = true;

    emit('invalid', payload);
    return false;
  },
  onRemoveValue: handleRemoveTag,
  // eslint-disable-next-line complexity
  onInputKeydown: event => {
    const target = event.target as HTMLInputElement;
    const collection = getItems()
      .map(i => i.ref)
      .filter(i => i.dataset.disabled !== '');
    if (!collection.length) return;
    const lastTag = collection.at(-1);
    switch (event.key) {
      case 'Delete':
      case 'Backspace': {
        if (target.selectionStart !== 0 || target.selectionEnd !== 0) break;

        if (selectedElement.value) {
          const index = collection.findIndex(i => i === selectedElement.value);
          handleRemoveTag(index);
          selectedElement.value =
            selectedElement.value === lastTag ? collection.at(index - 1) : collection.at(index + 1);
          event.preventDefault();
        } else if (event.key === 'Backspace') {
          selectedElement.value = lastTag;
          event.preventDefault();
        }
        break;
      }
      case 'Home':
      case 'End':
      case 'ArrowRight':
      case 'ArrowLeft': {
        const isArrowRight =
          (event.key === 'ArrowRight' && dir.value === 'ltr') || (event.key === 'ArrowLeft' && dir.value === 'rtl');
        const isArrowLeft = !isArrowRight;
        // only focus on tags when cursor is at the first position
        if (target.selectionStart !== 0 || target.selectionEnd !== 0) break;

        // if you press ArrowLeft, then we last tag
        if (isArrowLeft && !selectedElement.value) {
          selectedElement.value = lastTag;
          event.preventDefault();
        }
        // if you press ArrowRight on last tag, you deselect
        else if (isArrowRight && lastTag && selectedElement.value === lastTag) {
          selectedElement.value = undefined;
          event.preventDefault();
        } else if (selectedElement.value) {
          const el = useArrowNavigation(event, selectedElement.value, undefined, {
            itemsArray: collection,
            loop: false,
            dir: dir.value
          });
          if (el) selectedElement.value = el;
          event.preventDefault();
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown': {
        if (selectedElement.value) event.preventDefault();
        break;
      }
      default: {
        selectedElement.value = undefined;
      }
    }
  },
  selectedElement,
  isInvalidInput,
  addOnPaste,
  addOnBlur,
  addOnTab,
  dir,
  disabled,
  delimiter,
  max,
  id,
  displayValue: props.displayValue as (value: AcceptableInputValue) => string
});
</script>

<template>
  <CollectionSlot>
    <Primitive
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-disabled="disabled ? '' : undefined"
      :data-focused="focused ? '' : undefined"
      :data-invalid="isInvalidInput ? '' : undefined"
      :dir="dir"
    >
      <slot :model-value="modelValue" />

      <VisuallyHiddenInput
        v-if="isFormControl && name"
        :name="name"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
      />
    </Primitive>
  </CollectionSlot>
</template>
