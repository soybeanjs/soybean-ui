<script setup lang="ts">
import { computed } from 'vue';
import { SelectTrigger } from '@soybean-ui/primitive';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectTriggerProps } from './types';

defineOptions({
  name: 'SSelectTrigger'
});

const { class: cls, size, disabled } = defineProps<SelectTriggerProps>();

const mergedCls = computed(() => {
  const { trigger } = selectVariants({ size });

  return cn(trigger(), cls);
});
</script>

<template>
  <SelectTrigger :class="mergedCls" :disabled>
    <slot />
  </SelectTrigger>
</template>
