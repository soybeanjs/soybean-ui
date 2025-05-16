<script setup lang="ts">
import { computed } from 'vue';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import type { SidebarMenuChildGroupProps } from '../types';

defineOptions({
  name: 'SSidebarMenuChildGroup'
});

const { class: cls, size } = defineProps<SidebarMenuChildGroupProps>();

const mergedCls = computed(() => {
  const { childGroup } = sidebarMenuVariants({ size });

  return cn(childGroup(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
