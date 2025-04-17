<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import type { TreeMenuCollapsibleIconProps } from './types';

defineOptions({
  name: 'STreeMenuCollapsibleIcon'
});

const { class: cls } = defineProps<TreeMenuCollapsibleIconProps>();

const { collapsibleIcon } = treeMenuVariants();

const mergedCls = computed(() => cn(collapsibleIcon(), cls));
</script>

<template>
  <ChevronRight :class="mergedCls" :data-open="open || undefined" />
</template>
