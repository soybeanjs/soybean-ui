<script setup lang="ts">
import { computed } from 'vue';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import { ArrowUpRight, Ellipsis } from 'lucide-vue-next';
import { SLink } from '../../link';
import STooltip from '../../tooltip/source/tooltip.vue';
import SChip from '../../chip/source/chip.vue';
import SDropdownMenu from '../../dropdown-menu/source/dropdown-menu.vue';
import SBadge from '../../badge/source/badge.vue';
import type { SidebarMenuBadgeProps, SidebarMenuChipProps, SidebarMenuItemLinkProps } from '../types';

defineOptions({
  name: 'SSidebarMenuItemLink'
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
  tooltip,
  actions,
  onActionSelect,
  badge,
  chip
} = defineProps<SidebarMenuItemLinkProps>();

const mergedCls = computed(() => {
  const {
    itemLink,
    itemIcon,
    itemLinkIcon,
    label: _label,
    actionIcon,
    badge: _badge,
    chip: _chip
  } = sidebarMenuVariants({ size });

  return {
    cls: cn(itemLink(), cls || ui?.itemLink),
    icon: cn(itemIcon(), ui?.itemIcon),
    linkIcon: cn(itemLinkIcon(), ui?.itemLinkIcon),
    label: cn(_label(), ui?.label),
    actionIcon: cn(actionIcon(), ui?.actionIcon),
    badge: cn(_badge(), ui?.badge),
    chip: cn(_chip(), ui?.chip)
  };
});

const showLinkIcon = computed(() => {
  return linkProps?.href || (linkProps?.to && linkProps.target === '_blank');
});

const badgeProps = computed<SidebarMenuBadgeProps | null>(() => {
  if (!badge) return null;

  if (typeof badge === 'string') {
    return { content: badge, color: 'accent', variant: 'raw' };
  }

  return badge;
});

const chipProps = computed<SidebarMenuChipProps | null>(() => {
  if (!chip) return null;

  if (typeof chip === 'string') {
    return { content: chip };
  }

  return chip;
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
          <SChip :open="Boolean(chipProps)" v-bind="chipProps" :class="mergedCls.chip" :size="size">
            <span :class="mergedCls.label">{{ label }}</span>
          </SChip>
          <ArrowUpRight v-if="showLinkIcon" :class="mergedCls.linkIcon" />
          <SBadge v-if="badgeProps" v-bind="badgeProps" :class="mergedCls.badge" :size="size" />
          <SDropdownMenu v-if="actions" :actions="actions" :size="size" @select="onActionSelect">
            <template #trigger>
              <span :class="mergedCls.actionIcon" @click.stop>
                <Ellipsis />
              </span>
            </template>
          </SDropdownMenu>
          <slot name="trailing" />
        </slot>
      </SLink>
    </template>
  </STooltip>
</template>
