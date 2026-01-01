<script setup lang="ts">
import { computed } from 'vue';
import { useTreeMenuRootContext } from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';
import Badge from '../badge/badge.vue';
import Tag from '../tag/tag.vue';
import DropdownMenu from '../dropdown-menu/dropdown-menu.vue';
import ButtonIcon from '../button/button-icon.vue';
import { useTreeMenuContext, useTreeMenuExtraThemeContext } from './context';
import type { TreeMenuOptionSlotProps } from './types';

defineOptions({
  name: 'STreeMenuOptionSlot'
});

const props = defineProps<TreeMenuOptionSlotProps>();

const { collapsed } = useTreeMenuRootContext('TreeMenuOptionSlot');
const { size } = useTreeMenuContext('TreeMenuOptionSlot');
const ui = useTreeMenuExtraThemeContext('TreeMenuOptionSlot');

const hasChildren = computed(() => Boolean(props.item.children?.length));

const tagProps = computed(() => ({
  color: 'accent' as const,
  variant: 'raw' as const,
  ...props.item.tagProps,
  content: props.item.tag
}));
</script>

<template>
  <slot name="leading" :item="item">
    <Icon v-if="item.icon" :icon="item.icon" />
  </slot>
  <slot :item="item">
    <Badge v-if="item.badge" v-bind="item.badgeProps" :size="size" :content="item.badge" :class="ui.itemBadge">
      <span :class="ui.itemLabel">{{ item.label }}</span>
    </Badge>
    <span v-else :class="ui.itemLabel">{{ item.label }}</span>
  </slot>
  <Icon v-if="showLinkIcon" icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" />
  <Tag v-if="item.tag" v-bind="tagProps" :size="size" :content="item.tag" :class="ui.itemTag" />
  <DropdownMenu
    v-if="!collapsed && item.actions?.length"
    v-bind="item.actionMenuProps"
    :size="size"
    :items="item.actions"
    @select="item.onActionSelect"
  >
    <template #trigger>
      <ButtonIcon icon="lucide:ellipsis" :size="size" :class="ui.itemAction" @click.stop />
    </template>
  </DropdownMenu>
  <slot name="trailing" :item="item" />
  <Icon v-if="hasChildren" icon="lucide:chevron-right" :class="ui.collapsibleIcon" />
</template>
