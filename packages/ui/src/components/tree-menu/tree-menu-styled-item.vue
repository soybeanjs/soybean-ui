<script setup lang="ts">
import { computed } from 'vue';
import { treeMenuVariants } from '@/styles/tree-menu';
import type { TreeMenuStyledItemProps } from './types';

defineOptions({
  name: 'STreeMenuStyledItem'
});

const props = defineProps<TreeMenuStyledItemProps>();

const ui = computed(() => treeMenuVariants({ size: props.size }, props.ui, { item: props.class }));
</script>

<template>
  <div :class="ui.item">
    <button :class="ui.button">
      <slot />
    </button>
  </div>
</template>
