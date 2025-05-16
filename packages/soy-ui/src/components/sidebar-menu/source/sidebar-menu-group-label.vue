<script setup lang="ts">
import { computed } from 'vue';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import type { SidebarMenuGroupLabelProps } from '../types';

defineOptions({
  name: 'SSidebarMenuGroupLabel'
});

const { class: cls, size, ui } = defineProps<SidebarMenuGroupLabelProps>();

const mergedCls = computed(() => {
  const { groupLabel, itemIcon } = sidebarMenuVariants({ size });

  return {
    cls: cn(groupLabel(), cls || ui?.groupLabel),
    icon: cn(itemIcon(), ui?.itemIcon)
  };
});
</script>

<template>
  <div :class="mergedCls.cls">
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.icon" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
    </slot>
  </div>
</template>
