<script setup lang="ts">
import { computed } from 'vue';
import { NumberFieldDecrement, Slot } from '@soybean-ui/primitives';
import { cn, numberFieldVariants } from '@soybean-ui/variants';
import { Minus } from 'lucide-vue-next';
import type { NumberFieldDecrementProps } from './types';

defineOptions({
  name: 'SNumberFieldDecrement'
});

const { class: cls, size, center, iconClass, disabled } = defineProps<NumberFieldDecrementProps>();

const mergedCls = computed(() => {
  const { decrement, decrementIcon } = numberFieldVariants({ size, center });
  return {
    cls: cn(decrement(), cls),
    iconCls: cn(decrementIcon(), iconClass)
  };
});
</script>

<template>
  <NumberFieldDecrement :class="mergedCls.cls" data-slot="decrement" :disabled="disabled">
    <Slot :class="mergedCls.iconCls">
      <slot>
        <Minus />
      </slot>
    </Slot>
  </NumberFieldDecrement>
</template>
