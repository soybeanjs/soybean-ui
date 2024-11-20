<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, ref, toRefs } from 'vue';
import { useCollection, useDirection, useFormControl } from '../../composables';
import { PopperRoot } from '../popper';
import type { AcceptableValue } from '../../types';
import { isNullish } from '../../shared';
import { compare } from './shared';
import BubbleSelect from './bubble-select.vue';
import type { SelectOption, SelectRootContext, SelectRootProps } from './types';
import { provideSelectRootContext } from './context';

defineOptions({
  name: 'SelectRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectRootProps<T>>(), {
  modelValue: undefined,
  open: undefined
});

const modelValue = defineModel<T | T[] | undefined>({
  default: props.defaultValue ?? (props.multiple ? [] : undefined)
});

const open = defineModel<boolean>('open', {
  default: props.defaultOpen
});

const { required, disabled, multiple, dir: propDir } = toRefs(props);

const triggerElement = ref<HTMLElement>();
const valueElement = ref<HTMLElement>();
const triggerPointerDownPosRef = ref({
  x: 0,
  y: 0
});

const isEmptyModelValue = computed(() => {
  if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value.length === 0;
  return isNullish(modelValue.value);
});

useCollection({ isProvider: true });
const dir = useDirection(propDir);

const isFormControl = useFormControl(triggerElement);
const optionsSet = ref<Set<SelectOption>>(new Set());

// The native `select` only associates the correct default value if the corresponding
// `option` is rendered as a child **at the same time** as itself.
// Because it might take a few renders for our items to gather the information to build
// the native `option`(s), we generate a key on the `select` to make sure Vue re-builds it
// each time the options change.
const nativeSelectKey = computed(() => {
  return Array.from(optionsSet.value)
    .map(option => option.value)
    .join(';');
});

function handleValueChange(value: T) {
  if (multiple.value && Array.isArray(modelValue.value)) {
    const index = modelValue.value.findIndex(i => compare(i, value, props.by));
    if (index === -1) {
      modelValue.value.push(value);
    } else {
      modelValue.value.splice(index, 1);
    }
  } else {
    modelValue.value = value;
  }
}

provideSelectRootContext({
  triggerElement,
  onTriggerChange: node => {
    triggerElement.value = node;
  },
  valueElement,
  onValueElementChange: node => {
    valueElement.value = node;
  },
  contentId: '',
  modelValue,
  onValueChange: handleValueChange,
  by: props.by,
  open,
  multiple,
  required,
  onOpenChange: value => {
    open.value = value;
  },
  dir,
  triggerPointerDownPosRef,
  disabled,
  isEmptyModelValue,
  optionsSet,
  onOptionAdd: option => optionsSet.value.add(option),
  onOptionRemove: option => optionsSet.value.delete(option)
} as SelectRootContext<AcceptableValue>);
</script>

<template>
  <PopperRoot>
    <slot :model-value="modelValue" :open="open" />

    <BubbleSelect
      v-if="isFormControl"
      :key="nativeSelectKey"
      aria-hidden="true"
      tabindex="-1"
      :multiple="multiple"
      :required="required"
      :name="name"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :value="modelValue"
      @change="handleValueChange($event.target.value)"
    >
      <option v-if="modelValue === undefined" value="" />
      <option v-for="option in Array.from(optionsSet)" :key="option.value ?? ''" v-bind="option" />
    </BubbleSelect>
  </PopperRoot>
</template>
