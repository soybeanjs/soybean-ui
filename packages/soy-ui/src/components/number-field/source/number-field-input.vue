<script setup lang="ts">
import { computed } from 'vue';
import { NumberFieldInput } from '@soybean-ui/primitives';
import { cn, numberFieldVariants } from '@soybean-ui/variants';
import type { NumberFieldInputProps } from '../types';

defineOptions({
  name: 'SNumberFieldInput'
});

const { class: cls, size, center } = defineProps<NumberFieldInputProps>();

const mergedCls = computed(() => {
  const { input } = numberFieldVariants({ size, center });

  return cn(input(), cls);
});
</script>

<template>
  <NumberFieldInput :class="mergedCls" data-slot="input" />
</template>
