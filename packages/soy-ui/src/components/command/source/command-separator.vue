<script setup lang="ts">
import { computed } from 'vue';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandSeparatorProps } from '../types';

defineOptions({
  name: 'SCommandSeparator'
});

const { class: cls, size } = defineProps<CommandSeparatorProps>();

const mergedCls = computed(() => {
  const { separator } = commandVariants({ size });

  return cn(separator(), cls);
});
</script>

<template>
  <div :class="mergedCls"></div>
</template>
