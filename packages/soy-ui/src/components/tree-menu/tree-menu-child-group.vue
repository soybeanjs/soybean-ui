<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import type { TreeMenuChildGroupProps } from './types';

defineOptions({
  name: 'STreeMenuChildGroup'
});

const { class: cls, size } = defineProps<TreeMenuChildGroupProps>();

const mergedCls = computed(() => {
  const { childGroup } = treeMenuVariants({ size });

  return cn(childGroup(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot></slot>
  </div>
</template>
