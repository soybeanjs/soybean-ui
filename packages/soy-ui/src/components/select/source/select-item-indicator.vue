<script setup lang="ts">
import { computed } from 'vue';
import { SelectItemIndicator } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import { Check } from 'lucide-vue-next';
import type { SelectItemIndicatorProps } from '../types';

defineOptions({
  name: 'SSelectItemIndicator'
});

const { class: cls, size } = defineProps<SelectItemIndicatorProps>();

const mergedCls = computed(() => {
  const { itemIndicator } = selectVariants({ size });

  return cn(itemIndicator(), cls);
});
</script>

<template>
  <SelectItemIndicator :class="mergedCls">
    <slot>
      <Check />
    </slot>
  </SelectItemIndicator>
</template>
