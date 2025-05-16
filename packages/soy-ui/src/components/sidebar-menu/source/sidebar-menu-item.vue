<script setup lang="ts">
import { computed } from 'vue';
import { cn, sidebarMenuVariants } from '@soybean-ui/variants';
import { Ellipsis } from 'lucide-vue-next';
import STooltip from '../../tooltip/source/tooltip.vue';
import SChip from '../../chip/source/chip.vue';
import SDropdownMenu from '../../dropdown-menu/source/dropdown-menu.vue';
import SBadge from '../../badge/source/badge.vue';
import type { SidebarMenuBadgeProps, SidebarMenuChipProps, SidebarMenuItemProps } from '../types';

defineOptions({
  name: 'SSidebarMenuItem',
  inheritAttrs: false
});

const {
  class: cls,
  size,
  ui,
  label,
  icon,
  value,
  disabled,
  checked,
  tooltip,
  actions,
  badge,
  chip,
  onActionSelect
} = defineProps<SidebarMenuItemProps>();

const mergedCls = computed(() => {
  const { item, itemIcon, label: _label, actionIcon, badge: _badge, chip: _chip } = sidebarMenuVariants({ size });

  return {
    cls: cn(item(), cls || ui?.item),
    icon: cn(itemIcon(), ui?.itemIcon),
    label: cn(_label(), ui?.label),
    actionIcon: cn(actionIcon(), ui?.actionIcon),
    badge: cn(_badge(), ui?.badge),
    chip: cn(_chip(), ui?.chip)
  };
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
          <SChip :open="Boolean(chipProps)" v-bind="chipProps" :class="mergedCls.chip" :size="size">
            <span :class="mergedCls.label">{{ label }}</span>
          </SChip>
          <SBadge v-if="badgeProps" v-bind="badgeProps" :class="mergedCls.badge" :size="size" />
          <SDropdownMenu v-if="actions" :items="actions" :size="size" @select="onActionSelect">
            <template #trigger>
              <span :class="mergedCls.actionIcon" @click.stop>
                <Ellipsis />
              </span>
            </template>
          </SDropdownMenu>
          <slot name="trailing" />
        </slot>
      </button>
    </template>
  </STooltip>
</template>
