<script setup lang="ts">
import { computed } from 'vue';
import { NumberFieldIncrement } from '@soybean-ui/primitives';
import { cn, numberFieldVariants } from '@soybean-ui/variants';
import { Plus } from 'lucide-vue-next';
import type { NumberFieldIncrementProps } from '../types';

defineOptions({
  name: 'SNumberFieldIncrement'
});

const { class: cls, size, center, disabled } = defineProps<NumberFieldIncrementProps>();

const mergedCls = computed(() => {
  const { increment } = numberFieldVariants({ size, center });

  return cn(increment(), cls);
});
</script>

<template>
  <NumberFieldIncrement :class="mergedCls" data-slot="increment" :disabled="disabled">
    <slot>
      <Plus />
    </slot>
  </NumberFieldIncrement>
</template>
