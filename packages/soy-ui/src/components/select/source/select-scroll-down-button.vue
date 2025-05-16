<script setup lang="ts">
import { computed } from 'vue';
import { SelectScrollDownButton } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import { ChevronDown } from 'lucide-vue-next';
import type { SelectScrollDownButtonProps } from '../types';

defineOptions({
  name: 'SSelectScrollDownButton'
});

const { class: cls, size } = defineProps<SelectScrollDownButtonProps>();

const mergedCls = computed(() => {
  const { scrollDownButton } = selectVariants({ size });

  return cn(scrollDownButton(), cls);
});
</script>

<template>
  <SelectScrollDownButton :class="mergedCls">
    <slot>
      <ChevronDown />
    </slot>
  </SelectScrollDownButton>
</template>
