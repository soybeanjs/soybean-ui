<script setup lang="ts" generic="T extends SingleOrMultipleValue, M extends boolean">
import { computed } from 'vue';
import { useControllableState, useSingleOrMultipleValue } from '../../composables';
import { isFormControl, isNullish, transformPropsToContext } from '../../shared';
import type { SingleOrMultipleValue } from '../../types';
import { PopperRoot } from '../popper';
import { provideCollectionContext, provideSelectRootContext } from './context';
import BubbleSelect from './bubble-select.vue';
import type { SelectRootEmits, SelectRootProps } from './types';

defineOptions({
  name: 'SelectRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectRootProps<T, M>>(), {
  modelValue: undefined,
  open: undefined
});

const emit = defineEmits<SelectRootEmits<T>>();

type Slots = {
  default: (props: { modelValue: T | undefined; open: boolean }) => any;
};

defineSlots<Slots>();

const { modelValue, isMultiple, onModelValueChange, isEmptyModelValue } = useSingleOrMultipleValue<
  SelectRootProps<T, M>
>(props, value => {
  emit('update:modelValue', value as NonNullable<T>);
});

const open = useControllableState(
  () => props.open,
  value => {
    if (isNullish(value)) return;
    emit('update:open', value);
  },
  props.defaultOpen
);

const { triggerElement, options, nativeSelectKey } = provideSelectRootContext({
  ...transformPropsToContext(props, ['dir', 'autocomplete', 'disabled', 'required']),
  open,
  modelValue,
  onModelValueChange,
  isMultiple,
  isEmptyModelValue
});

provideCollectionContext();

const formControl = computed(() => isFormControl(triggerElement.value));
</script>

<template>
  <PopperRoot>
    <slot :model-value="modelValue" :open="Boolean(open)" />

    <BubbleSelect
      v-if="formControl"
      :key="nativeSelectKey"
      aria-hidden="true"
      tabindex="-1"
      :multiple="multiple"
      :required="required"
      :name="name"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :value="modelValue"
    >
      <option v-if="isNullish(modelValue)" value="" />
      <option v-for="option in options" :key="option.value ?? ''" v-bind="option" />
    </BubbleSelect>
  </PopperRoot>
</template>
