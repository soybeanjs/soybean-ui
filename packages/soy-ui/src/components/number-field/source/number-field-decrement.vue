<script setup lang="ts">
import { computed } from 'vue';
import { NumberFieldDecrement } from '@soybean-ui/primitives';
import { cn, numberFieldVariants } from '@soybean-ui/variants';
import { Minus } from 'lucide-vue-next';
import type { NumberFieldDecrementProps } from '../types';

defineOptions({
  name: 'SNumberFieldDecrement'
});

const { class: cls, size, center, disabled } = defineProps<NumberFieldDecrementProps>();

const mergedCls = computed(() => {
  const { decrement } = numberFieldVariants({ size, center });

  return cn(decrement(), cls);
});
</script>

<template>
  <NumberFieldDecrement :class="mergedCls" data-slot="decrement" :disabled="disabled">
    <slot>
      <Minus />
    </slot>
  </NumberFieldDecrement>
</template>
