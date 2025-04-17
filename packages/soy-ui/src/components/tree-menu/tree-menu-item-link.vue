<script setup lang="ts">
import { computed } from 'vue';
import { cn, treeMenuVariants } from '@soybean-ui/variants';
import { ArrowUpRight } from 'lucide-vue-next';
import { SLink } from '../link';
import type { TreeMenuItemLinkProps } from './types';

defineOptions({
  name: 'SMenuItemLink'
});

const { class: cls, size, ui, label, icon, value, disabled, linkProps } = defineProps<TreeMenuItemLinkProps>();

const mergedCls = computed(() => {
  const { itemLink, itemIcon, itemLinkIcon } = treeMenuVariants({ size });

  return {
    cls: cn(itemLink(), cls || ui?.itemLink),
    icon: cn(itemIcon(), ui?.itemIcon),
    linkIcon: cn(itemLinkIcon(), ui?.itemLinkIcon)
  };
});

const showLinkIcon = computed(() => {
  return linkProps?.href || (linkProps?.to && linkProps.target === '_blank');
});
</script>

<template>
  <SLink
    :data-value="value"
    :class="mergedCls.cls"
    v-bind="linkProps"
    :disabled="disabled"
    :data-disabled="disabled || undefined"
  >
    <slot>
      <slot name="leading">
        <component :is="icon" :class="mergedCls.icon" />
      </slot>
      <span>{{ label }}</span>
      <ArrowUpRight v-if="showLinkIcon" :class="mergedCls.linkIcon" />
      <slot name="trailing" />
    </slot>
  </SLink>
</template>
