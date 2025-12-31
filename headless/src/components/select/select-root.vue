<script setup lang="ts" generic="T extends DefinedValue, M extends boolean = false">
import { computed } from 'vue';
import { useControllableState, useSelection } from '../../composables';
import { isFormControl, isNullish, transformPropsToContext } from '../../shared';
import type { DefinedValue } from '../../types';
import { PopperRoot } from '../popper';
import { provideCollectionContext, provideSelectRootContext } from './context';
import SelectBubbleSelect from './select-bubble-select.vue';
import type { SelectRootEmits, SelectRootProps } from './types';

defineOptions({
  name: 'SelectRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectRootProps<T, M>>(), {
  modelValue: undefined,
  open: undefined
});

const emit = defineEmits<SelectRootEmits<T, M>>();

const { modelValue, isMultiple, onModelValueChange, isEmptyModelValue } = useSelection<boolean, DefinedValue>(
  props,
  value => {
    // @ts-expect-error ignore type
    emit('update:modelValue', value);
  }
);

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value!);
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

    <SelectBubbleSelect
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
    </SelectBubbleSelect>
  </PopperRoot>
</template>
