<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends RadioCardGroupOptionData<T> = RadioCardGroupOptionData<T>
  "
>
import { computed } from 'vue';
import { RadioGroupRoot, provideRadioGroupUi } from '@soybeanjs/headless';
import type { AcceptableBooleanValue, RadioGroupRootEmits } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { radioCardGroupVariants } from './variants';
import RadioCard from './radio-card.vue';
import type { RadioCardGroupOptionData, RadioCardGroupProps } from './types';

defineOptions({
  name: 'SRadioCardGroup'
});

const props = defineProps<RadioCardGroupProps<T, S>>();

const emit = defineEmits<RadioGroupRootEmits>();

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
  const variants = radioCardGroupVariants({
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
    <RadioCard
      v-for="item in items"
      :key="String(item.value)"
      v-bind="itemProps"
      :ui="ui"
      :variant="variant"
      :size="size"
      :value="item.value"
      :label="item.label"
      :disabled="disabled || item.disabled"
      :icon="item.icon"
      :description="item.description"
      :control-props="controlProps"
      :indicator-props="indicatorProps"
      :label-props="labelProps"
    />
  </RadioGroupRoot>
</template>
