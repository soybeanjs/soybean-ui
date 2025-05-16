<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxInput, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxInputEmits, ComboboxInputProps } from '../types';

defineOptions({
  name: 'SComboboxInput'
});

const { class: cls, size, mode, wrapperClass, ...delegatedProps } = defineProps<ComboboxInputProps>();

const emit = defineEmits<ComboboxInputEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { input, inputWrapper } = comboboxVariants({ size, mode });

  return {
    cls: cn(input(), cls),
    wrapper: cn(inputWrapper(), wrapperClass)
  };
});
</script>

<template>
  <div :class="mergedCls.wrapper">
    <slot name="leading" />
    <ComboboxInput v-bind="forwarded" :class="mergedCls.cls">
      <slot />
    </ComboboxInput>
    <slot name="trailing" />
  </div>
</template>
