<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import { TreeItem } from '@soybeanjs/headless';
import { useForwardListeners, usePickProps } from '@soybeanjs/headless/composables';
import Icon from '../icon/icon.vue';
import Link from '../link/link.vue';
import Badge from '../badge/badge.vue';
import Tag from '../tag/tag.vue';
import Tooltip from '../tooltip/tooltip.vue';
import DropdownMenu from '../dropdown-menu/dropdown-menu.vue';
import ButtonIcon from '../button/button-icon.vue';
import { useTreeMenuContext, useTreeMenuThemeContext } from './context';
import { treeMenuCssVars } from './shared';
import type { TreeMenuBaseOptionData, TreeMenuItemEmits, TreeMenuItemProps } from './types';

defineOptions({
  name: 'STreeMenuItem'
});

const props = defineProps<TreeMenuItemProps>();

const emit = defineEmits<TreeMenuItemEmits>();

const attrs = useAttrs();

const listeners = useForwardListeners(emit);

const { size, collapsed } = useTreeMenuContext('TreeMenuItem');

const { ui } = useTreeMenuThemeContext('TreeMenuItem');

const isLink = computed(() => Boolean(props.to || props.href || props.linkProps));

const linkProps = computed(() => {
  const p = { disabled: props.disabled, ...props.linkProps };

  if (props.to) {
    p.to = props.to;
  }
  if (props.href) {
    p.href = props.href;
  }
  return p;
});

const forwardedProps = usePickProps(props, ['value', 'level', 'disabled', 'disabledSelect', 'disabledToggle'], attrs);

const as = computed(() => (isLink.value ? Link : 'button'));

const contentProps = computed(() => (isLink.value ? linkProps.value : {}));

const itemStyle = computed<CSSProperties>(() => {
  return {
    [treeMenuCssVars.indent]: props.level - 1
  };
});

const hasChildren = computed(() => Boolean(props.children?.length));

const showDropdown = computed(() => collapsed.value && hasChildren.value);

const tooltip = computed(() => (collapsed.value && !showDropdown.value ? props.label : undefined));

const showAbsolute = computed(() => showDropdown.value || tooltip.value);

const tooltipProps = computed(() => ({
  placement: 'right' as const,
  ...props.tooltipProps
}));

const dropdownMenuProps = computed(() => ({
  trigger: 'hover' as const,
  contentProps: {
    placement: 'right' as const
  },
  ...props.dropdownMenuProps
}));

const tagProps = computed(() => ({
  color: 'accent' as const,
  variant: 'raw' as const,
  ...props.tagProps,
  content: props.tag
}));

const onDropdownMenuSelect = (item: TreeMenuBaseOptionData) => {
  emit('selectDropdown', item.value);
};
</script>

<template>
  <TreeItem
    v-slot="{ isExpanded }"
    :class="ui.item"
    v-bind="forwardedProps"
    :data-level="level"
    :style="itemStyle"
    v-on="listeners"
  >
    <component
      :is="as"
      v-bind="contentProps"
      :class="ui.itemContent"
      :data-link="isLink ? '' : undefined"
      tabindex="-1"
    >
      <slot name="leading">
        <Icon v-if="icon" :icon="icon" />
      </slot>
      <slot>
        <Badge v-if="badge" v-bind="badgeProps" :size="size" :content="badge" :class="ui.itemBadge">
          <span :class="ui.itemLabel">{{ label }}</span>
        </Badge>
        <span v-else :class="ui.itemLabel">{{ label }}</span>
      </slot>
      <Icon v-if="isLink" icon="lucide:arrow-up-right" :class="ui.itemLinkIcon" />
      <Tag v-if="tag" v-bind="tagProps" :size="size" :content="tag" :class="ui.itemTag" />
      <DropdownMenu
        v-if="actions?.length"
        v-bind="actionMenuProps"
        :size="size"
        :items="actions"
        @select="onActionSelect"
      >
        <template #trigger>
          <ButtonIcon icon="lucide:ellipsis" :size="size" :class="ui.itemAction" @click.stop />
        </template>
      </DropdownMenu>
      <slot name="trailing" />
      <Icon
        v-if="hasChildren"
        icon="lucide:chevron-right"
        :data-expanded="isExpanded ? '' : undefined"
        :class="ui.collapsibleIcon"
      />
    </component>

    <template v-if="showAbsolute">
      <Tooltip v-if="tooltip" v-bind="tooltipProps" :size="size" :content="tooltip">
        <template #trigger>
          <div :class="ui.itemAbsolute"></div>
        </template>
      </Tooltip>
      <DropdownMenu
        v-if="showDropdown"
        v-bind="dropdownMenuProps"
        :items="children ?? []"
        :disabled="disabled"
        :size="size"
        @select="onDropdownMenuSelect"
      >
        <template #trigger>
          <div :class="ui.itemAbsolute"></div>
        </template>
      </DropdownMenu>
    </template>
  </TreeItem>
</template>
