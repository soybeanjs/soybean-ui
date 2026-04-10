<script setup lang="ts" generic="T extends TagsInputAcceptableValue = string">
import { computed, shallowRef } from 'vue';
import { isEqual } from 'ohash';
import { useArrowNavigation, useControllableState, useForwardElement } from '../../composables';
import { isFormControl, removeAt, transformPropsToContext } from '../../shared';
import { useDirection } from '../config-provider/context';
import { VisuallyHiddenInput } from '../visually-hidden';
import {
  provideCollectionContext,
  provideTagsInputRootContext,
  useTagsInputUi
} from './context';
import type { TagsInputAcceptableValue, TagsInputRootEmits, TagsInputRootProps } from './types';

defineOptions({
  name: 'TagsInputRoot'
});

const props = withDefaults(defineProps<TagsInputRootProps<T>>(), {
  modelValue: undefined,
  defaultValue: () => [],
  addOnPaste: false,
  addOnTab: false,
  addOnBlur: false,
  duplicate: false,
  disabled: false,
  delimiter: ',',
  max: 0
});

const emit = defineEmits<TagsInputRootEmits<T>>();

const cls = useTagsInputUi('root');

const { getOrderedItems, getOrderedElements, onContainerElementChange } = provideCollectionContext();

const [rootElement, setRootElement] = useForwardElement(onContainerElementChange);

const dir = useDirection(() => props.dir);

const modelValue = useControllableState(
  () => props.modelValue as TagsInputAcceptableValue[] | undefined,
  value => {
    emit('update:modelValue', value as T[]);
  },
  (props.defaultValue ?? []) as TagsInputAcceptableValue[]
);

const selectedElement = shallowRef<HTMLElement>();
const isInvalidInput = shallowRef(false);

const displayValue = (value: TagsInputAcceptableValue) => {
  if (props.displayValue) {
    return props.displayValue(value as T);
  }

  return String(value);
};

const currentModelValue = computed(() => {
  return Array.isArray(modelValue.value) ? [...modelValue.value] : [];
});

const formControl = computed(() => isFormControl(rootElement.value));

const getItems = () => getOrderedItems(false);

const getEnabledElements = () => getOrderedElements(false).filter(element => element.dataset.disabled === undefined);

const onClear = () => {
  if (props.disabled) return;

  modelValue.value = [];
  selectedElement.value = undefined;
  isInvalidInput.value = false;
};

const onRemoveValue = (index: number) => {
  if (props.disabled || index < 0) return;

  const items = getItems();
  const item = items[index];
  if (!item) return;

  modelValue.value = removeAt(currentModelValue.value, index);
  emit('removeTag', item.data.value as T);
};

const onAddValue = (rawValue: string) => {
  const normalizedValue = rawValue.trim();
  const values = currentModelValue.value;
  const hasObjectValue = values.some(value => typeof value === 'object' && value !== null);
  const hasDefaultObjectValue = (props.defaultValue ?? []).some(value => typeof value === 'object' && value !== null);

  if (props.disabled) {
    return false;
  }

  if (!normalizedValue) {
    return false;
  }

  if ((hasObjectValue || hasDefaultObjectValue) && typeof props.convertValue !== 'function') {
    throw new Error('You must provide a `convertValue` function when using object values.');
  }

  const value = (props.convertValue ? props.convertValue(normalizedValue) : normalizedValue) as T;

  if (props.max > 0 && values.length >= props.max) {
    isInvalidInput.value = true;
    emit('invalid', value);
    return false;
  }

  const isDuplicate = values.some(item => isEqual(item, value));
  if (!props.duplicate && isDuplicate) {
    isInvalidInput.value = true;
    emit('invalid', value);
    return false;
  }

  isInvalidInput.value = false;
  modelValue.value = [...values, value];
  emit('addTag', value);
  return true;
};

const onInputKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  const target = event.target as HTMLInputElement | null;
  if (!target) return;

  const elements = getEnabledElements();
  if (!elements.length) {
    selectedElement.value = undefined;
    return;
  }

  const lastElement = elements.at(-1);
  const cursorAtStart = target.selectionStart === 0 && target.selectionEnd === 0;
  const isArrowRight = (event.key === 'ArrowRight' && dir.value === 'ltr') || (event.key === 'ArrowLeft' && dir.value === 'rtl');
  const isArrowLeft = (event.key === 'ArrowLeft' && dir.value === 'ltr') || (event.key === 'ArrowRight' && dir.value === 'rtl');

  switch (event.key) {
    case 'Delete':
    case 'Backspace': {
      if (!cursorAtStart) {
        selectedElement.value = undefined;
        break;
      }

      if (selectedElement.value) {
        const items = getItems();
        const index = items.findIndex(item => item.element === selectedElement.value);
        const nextElement = selectedElement.value === lastElement ? elements.at(elements.indexOf(selectedElement.value) - 1) : elements.at(elements.indexOf(selectedElement.value) + 1);
        onRemoveValue(index);
        selectedElement.value = nextElement;
        event.preventDefault();
      } else if (event.key === 'Backspace') {
        selectedElement.value = lastElement;
        event.preventDefault();
      }
      break;
    }
    case 'Home':
    case 'End':
    case 'ArrowLeft':
    case 'ArrowRight': {
      if (!cursorAtStart) {
        selectedElement.value = undefined;
        break;
      }

      if (isArrowLeft && !selectedElement.value) {
        selectedElement.value = lastElement;
        event.preventDefault();
      } else if (isArrowRight && selectedElement.value === lastElement) {
        selectedElement.value = undefined;
        event.preventDefault();
      } else if (selectedElement.value) {
        const nextElement = useArrowNavigation(event, selectedElement.value, undefined, {
          itemsArray: elements,
          loop: false,
          dir: dir.value
        });

        if (nextElement) {
          selectedElement.value = nextElement;
        }
      }
      break;
    }
    case 'ArrowUp':
    case 'ArrowDown': {
      if (selectedElement.value) {
        event.preventDefault();
      }
      break;
    }
    default: {
      selectedElement.value = undefined;
      break;
    }
  }
};

provideTagsInputRootContext({
  ...transformPropsToContext(props, ['id', 'addOnPaste', 'addOnTab', 'addOnBlur', 'disabled', 'delimiter', 'max']),
  modelValue: modelValue as typeof modelValue & { value: TagsInputAcceptableValue[] },
  selectedElement,
  isInvalidInput,
  dir,
  displayValue,
  onAddValue,
  onRemoveValue,
  onInputKeydown,
  onClear,
  getItems
});
</script>

<template>
  <div
    :ref="setRootElement"
    :class="cls"
    role="group"
    :dir="dir"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalidInput ? '' : undefined"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput v-if="formControl && name" :name="name" :value="modelValue" :required="required" :disabled="disabled" />
  </div>
</template>
