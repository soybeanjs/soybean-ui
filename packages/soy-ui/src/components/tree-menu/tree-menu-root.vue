<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import type { TreeMenuRootProps } from './types';

defineOptions({
  name: 'STreeMenuRoot'
});

const { class: cls, size } = defineProps<TreeMenuRootProps>();

const mergedCls = computed(() => {
  const { root } = treeMenuVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot></slot>
  </div>
</template>
