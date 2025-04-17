<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import type { TreeMenuItemProps } from './types';

defineOptions({
  name: 'STreeMenuItem'
});

const { class: cls, size, ui, label, icon, value, disabled } = defineProps<TreeMenuItemProps>();

const mergedCls = computed(() => {
  const { item, itemIcon } = treeMenuVariants({ size });

  return {
    cls: cn(item(), cls || ui?.item),
    icon: cn(itemIcon(), ui?.itemIcon)
  };
});
</script>

<template>
  <button :data-value="value" :class="mergedCls.cls" :data-disabled="disabled || undefined">
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.icon" />
      </slot>
      <span>{{ label }}</span>
      <slot name="trailing" />
    </slot>
  </button>
</template>
