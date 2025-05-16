<script setup lang="ts">
import { computed } from 'vue';
import { SelectScrollUpButton } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import { ChevronUp } from 'lucide-vue-next';
import type { SelectScrollUpButtonProps } from '../types';

defineOptions({
  name: 'SSelectScrollUpButton'
});

const { class: cls, size } = defineProps<SelectScrollUpButtonProps>();

const mergedCls = computed(() => {
  const { scrollUpButton } = selectVariants({ size });

  return cn(scrollUpButton(), cls);
});
</script>

<template>
  <SelectScrollUpButton :class="mergedCls">
    <slot>
      <ChevronUp />
    </slot>
  </SelectScrollUpButton>
</template>
