<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ComboboxRoot, useCombinedPropsEmits, useOmitForwardProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, comboboxVariants } from '@soybean-ui/variants';
import type { ComboboxRootEmits, ComboboxRootProps } from '../types';

defineOptions({
  name: 'SComboboxRoot'
});

const props = defineProps<ComboboxRootProps<T>>();

const emit = defineEmits<ComboboxRootEmits<T>>();

const forwardedProps = useOmitForwardProps(props, ['class', 'size']);

const forwarded = useCombinedPropsEmits(forwardedProps, emit);

const mergedCls = computed(() => {
  const { root } = comboboxVariants({ size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <ComboboxRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </ComboboxRoot>
</template>
