<script setup lang="ts">
import { computed } from 'vue';
import { SelectItemIndicator } from 'reka-ui';
import { Check } from 'lucide-vue-next';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectItemIndicatorProps } from './types';

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

<style scoped></style>
