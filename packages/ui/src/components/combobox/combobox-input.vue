<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxInput, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxInputEmits, ComboboxInputProps } from './types';

defineOptions({
  name: 'SComboboxInput'
});

const {
  class: cls,
  size,
  mode,
  wrapperClass,
  selectItem,
  displayValue,
  ...delegatedProps
} = defineProps<ComboboxInputProps>();

const emit = defineEmits<ComboboxInputEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { input, inputWrapper } = comboboxVariants({ size, mode });

  return {
    cls: cn(input(), cls),
    wrapper: cn(inputWrapper(), wrapperClass)
  };
});

const displayValueFn = computed(() => {
  if (displayValue) {
    return displayValue;
  }

  return () => selectItem?.label || '';
});
</script>

<template>
  <div :class="mergedCls.wrapper">
    <slot name="leading" />
    <ComboboxInput v-bind="forwarded" :class="mergedCls.cls" :display-value="displayValueFn">
      <slot />
    </ComboboxInput>
    <slot name="trailing" />
  </div>
</template>
