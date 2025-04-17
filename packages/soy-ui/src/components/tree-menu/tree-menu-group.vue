<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import type { TreeMenuGroupProps } from './types';

defineOptions({
  name: 'STreeMenuGroup'
});

const { class: cls, size } = defineProps<TreeMenuGroupProps>();

const mergedCls = computed(() => {
  const { group } = treeMenuVariants({ size });

  return cn(group(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot></slot>
  </div>
</template>
