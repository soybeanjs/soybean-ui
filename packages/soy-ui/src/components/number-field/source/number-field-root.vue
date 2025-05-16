<script setup lang="ts">
import { computed } from 'vue';
import { NumberFieldRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, numberFieldVariants } from '@soybean-ui/variants';
import type { NumberFieldRootEmits, NumberFieldRootProps } from '../types';

defineOptions({
  name: 'SNumberFieldRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<NumberFieldRootProps>();

const emit = defineEmits<NumberFieldRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = numberFieldVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </NumberFieldRoot>
</template>
