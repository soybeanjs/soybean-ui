<script setup lang="ts">
import { computed } from 'vue';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import type { SidebarMenuCollapsibleIconProps } from '../types';

defineOptions({
  name: 'SSidebarMenuCollapsibleIcon'
});

const { class: cls } = defineProps<SidebarMenuCollapsibleIconProps>();

const { collapsibleIcon } = sidebarMenuVariants();

const mergedCls = computed(() => cn(collapsibleIcon(), cls));
</script>

<template>
  <ChevronRight :class="mergedCls" :data-open="open || undefined" />
</template>
