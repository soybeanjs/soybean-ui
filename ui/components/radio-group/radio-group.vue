<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
  "
>
import { computed } from 'vue';
import { RadioGroupRoot, provideRadioGroupThemeContext } from '@headless';
import type { AcceptableBooleanValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { radioGroupVariants } from '@variants/radio-group';
import type { RadioGroupOptionData, RadioGroupProps, RadioGroupRootEmits } from './types';
import RadioGroupItem from './radio-group-item.vue';

defineOptions({
  name: 'SRadioGroup'
});

const props = defineProps<RadioGroupProps<T, S>>();

const emit = defineEmits<RadioGroupRootEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'color',
  'size',
  'ui',
  'items',
  'itemProps',
  'controlProps',
  'indicatorProps',
  'labelProps'
]);

const ui = computed(() => {
  const variants = radioGroupVariants();

  return mergeSlotVariants(variants, props.ui);
});

provideRadioGroupThemeContext({
  ui
});
</script>

<template>
  <RadioGroupRoot v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <RadioGroupItem
      v-for="item in items"
      :key="String(item.value)"
      v-bind="itemProps"
      :color="color"
      :size="size"
      :value="item.value"
      :label="item.label"
      :disabled="disabled || item.disabled"
      :control-props="controlProps"
      :indicator-props="indicatorProps"
      :label-props="labelProps"
    />
  </RadioGroupRoot>
</template>
