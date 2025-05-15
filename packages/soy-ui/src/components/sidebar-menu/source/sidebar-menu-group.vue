<script setup lang="ts">
import { computed } from 'vue';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import type { SidebarMenuGroupProps } from '../types';

defineOptions({
  name: 'SSidebarMenuGroup'
});

const { class: cls, size } = defineProps<SidebarMenuGroupProps>();

const mergedCls = computed(() => {
  const { group } = sidebarMenuVariants({ size });

  return cn(group(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
