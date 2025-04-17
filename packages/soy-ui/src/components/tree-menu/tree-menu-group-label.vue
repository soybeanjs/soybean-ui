<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import type { TreeMenuGroupLabelProps } from './types';

defineOptions({
  name: 'STreeMenuGroupLabel'
});

const { class: cls, size, ui } = defineProps<TreeMenuGroupLabelProps>();

const mergedCls = computed(() => {
  const { groupLabel, itemIcon } = treeMenuVariants({ size });

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
