<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import BadgeCompact from '../badge/badge-compact.vue';
import DropdownMenuCompact from '../dropdown-menu/dropdown-menu-compact.vue';
import Icon from '../_icon/icon.vue';
import { useTreeMenuRootContext, useTreeMenuUi } from './context';
import type { TreeMenuOptionSlotCompactProps } from './types';

defineOptions({
  name: 'TreeMenuSlotCompact'
});

const props = defineProps<TreeMenuOptionSlotCompactProps>();

const { collapsed } = useTreeMenuRootContext('TreeMenuCompactSlot');

const ui = useTreeMenuUi();

const hasChildren = computed(() => Boolean(props.item.children?.some(child => !child.hidden)));

const actionAriaLabel = computed(() => `Open ${props.item.label} actions`);
</script>

<template>
  <slot name="item-leading" :item="item">
    <Icon v-if="item.icon" :icon="item.icon" :aria-hidden="true" />
  </slot>

  <slot name="item" :item="item">
    <BadgeCompact data-soybean-badge-compact v-if="item.badge" v-bind="item.badgeProps" :content="item.badge" :class="ui.itemBadge">
      <span :class="ui.itemLabel">{{ item.label }}</span>
    </BadgeCompact>
    <span v-else :class="ui.itemLabel">{{ item.label }}</span>
  </slot>

  <Icon v-if="showLinkIcon" icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" :aria-hidden="true" />

  <span v-if="item.tag" v-bind="item.tagProps" :class="ui.itemTag">{{ item.tag }}</span>

  <DropdownMenuCompact data-soybean-dropdown-menu-compact
    v-if="!collapsed && item.actions?.length"
    v-bind="item.actionMenuProps"
    :items="item.actions"
    @select="item.onActionSelect"
  >
    <template #trigger>
      <Button :aria-label="actionAriaLabel" :class="ui.itemAction" :disabled="item.disabled" @click.stop>
        <Icon icon="lucide:ellipsis" :aria-hidden="true" />
      </Button>
    </template>
  </DropdownMenuCompact>

  <slot name="item-trailing" :item="item" />

  <Icon v-if="hasChildren" icon="lucide:chevron-right" :class="ui.collapsibleIcon" :aria-hidden="true" />
</template>
