<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
  "
>
import { computed } from 'vue';
import { RadioGroupRoot, provideRadioGroupUi } from '@soybeanjs/headless';
import type { AcceptableBooleanValue, RadioGroupRootEmits } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { radioGroupVariants } from '@/variants/radio-group';
import type { RadioGroupOptionData, RadioGroupProps } from './types';
import Radio from './radio.vue';

defineOptions({
  name: 'SRadioGroup'
});

const props = defineProps<RadioGroupProps<T, S>>();

const emit = defineEmits<RadioGroupRootEmits<T>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'ui',
  'variant',
  'color',
  'size',
  'items',
  'itemProps',
  'controlProps',
  'indicatorProps',
  'labelProps'
]);

const ui = computed(() => {
  const variants = radioGroupVariants({
    variant: props.variant,
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideRadioGroupUi(ui);
</script>

<template>
  <RadioGroupRoot v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <Radio
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
