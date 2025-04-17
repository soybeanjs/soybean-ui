<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import { ArrowUpRight } from 'lucide-vue-next';
import { SLink } from '../link';
import STooltip from '../tooltip/tooltip.vue';
import type { TreeMenuItemLinkProps } from './types';

defineOptions({
  name: 'SMenuItemLink'
});

const {
  class: cls,
  size,
  ui,
  label,
  icon,
  value,
  disabled,
  linkProps,
  checked,
  tooltip
} = defineProps<TreeMenuItemLinkProps>();

const mergedCls = computed(() => {
  const { itemLink, itemIcon, itemLinkIcon, label: _label } = treeMenuVariants({ size });

  return {
    cls: cn(itemLink(), cls || ui?.itemLink),
    icon: cn(itemIcon(), ui?.itemIcon),
    linkIcon: cn(itemLinkIcon(), ui?.itemLinkIcon),
    label: cn(_label(), ui?.label)
  };
});

const showLinkIcon = computed(() => {
  return linkProps?.href || (linkProps?.to && linkProps.target === '_blank');
});
</script>

<template>
  <STooltip :size="size" side="right" :content="tooltip" :disabled="!tooltip">
    <template #trigger>
      <SLink
        :data-value="value"
        :class="mergedCls.cls"
        v-bind="linkProps"
        :disabled="disabled"
        :data-disabled="disabled || undefined"
        :data-checked="Boolean(checked)"
      >
        <slot>
          <slot name="leading">
            <component :is="icon" :class="mergedCls.icon" />
          </slot>
          <span :class="mergedCls.label">{{ label }}</span>
          <ArrowUpRight v-if="showLinkIcon" :class="mergedCls.linkIcon" />
          <slot name="trailing" />
        </slot>
      </SLink>
    </template>
  </STooltip>
</template>
