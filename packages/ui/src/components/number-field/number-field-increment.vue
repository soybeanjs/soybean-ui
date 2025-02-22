<script setup lang="ts">
import { computed } from 'vue';
import { NumberFieldIncrement, Slot } from '@soybean-ui/primitives';
import { cn, numberFieldVariants } from '@soybean-ui/variants';
import { Plus } from 'lucide-vue-next';
import type { NumberFieldIncrementProps } from './types';

defineOptions({
  name: 'SNumberFieldIncrement'
});

const { class: cls, size, center, iconClass, disabled } = defineProps<NumberFieldIncrementProps>();

const mergedCls = computed(() => {
  const { increment, incrementIcon } = numberFieldVariants({ size, center });

  return {
    cls: cn(increment(), cls),
    iconCls: cn(incrementIcon(), iconClass)
  };
});
</script>

<template>
  <NumberFieldIncrement :class="mergedCls.cls" data-slot="increment" :disabled="disabled">
    <Slot :class="mergedCls.iconCls">
      <slot>
        <Plus />
      </slot>
    </Slot>
  </NumberFieldIncrement>
</template>
