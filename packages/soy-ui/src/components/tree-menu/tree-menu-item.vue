<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import STooltip from '../tooltip/tooltip.vue';
import type { TreeMenuItemProps } from './types';

defineOptions({
  name: 'STreeMenuItem',
  inheritAttrs: false
});

const { class: cls, size, ui, label, icon, value, disabled, checked, tooltip } = defineProps<TreeMenuItemProps>();

const mergedCls = computed(() => {
  const { item, itemIcon, label: _label } = treeMenuVariants({ size });

  return {
    cls: cn(item(), cls || ui?.item),
    icon: cn(itemIcon(), ui?.itemIcon),
    label: cn(_label(), ui?.label)
  };
});
</script>

<template>
  <STooltip :size="size" side="right" :content="tooltip" :disabled="!tooltip">
    <template #trigger>
      <button
        v-bind="$attrs"
        :data-value="value"
        :class="mergedCls.cls"
        :data-disabled="disabled || undefined"
        :data-checked="Boolean(checked)"
      >
        <slot>
          <slot name="leading">
            <component :is="icon" :class="mergedCls.icon" />
          </slot>
          <span :class="mergedCls.label">{{ label }}</span>
          <slot name="trailing" />
        </slot>
      </button>
    </template>
  </STooltip>
</template>
