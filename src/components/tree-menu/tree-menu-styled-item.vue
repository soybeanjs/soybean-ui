<script setup lang="ts">
import { computed } from 'vue';
import { mergeSlotVariants } from '@/theme';
import { treeMenuVariants } from '@/variants/tree-menu';
import type { TreeMenuStyledItemProps } from './types';

defineOptions({
  name: 'STreeMenuStyledItem'
});

const props = defineProps<TreeMenuStyledItemProps>();

const ui = computed(() => {
  const variants = treeMenuVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { item: props.class });
});
</script>

<template>
  <div :class="ui.item">
    <button :class="ui.button">
      <slot />
    </button>
  </div>
</template>
