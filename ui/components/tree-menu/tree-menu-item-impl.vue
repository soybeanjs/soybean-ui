<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { CSSProperties } from 'vue';
import { TreeItem } from '@headless';
import { useForwardListeners, usePickProps } from '@headless/composables';
import Icon from '../icon/icon.vue';
import Link from '../link/link.vue';
import Badge from '../badge/badge.vue';
import Tag from '../tag/tag.vue';
import DropdownMenu from '../dropdown-menu/dropdown-menu.vue';
import ButtonIcon from '../button/button-icon.vue';
import { useTreeMenuContext, useTreeMenuThemeContext } from './context';
import { treeMenuCssVars } from './shared';
import type { TreeMenuItemImplEmits, TreeMenuItemImplProps } from './types';

defineOptions({
  name: 'STreeMenuItemImpl'
});

const props = defineProps<TreeMenuItemImplProps>();

const emit = defineEmits<TreeMenuItemImplEmits>();

const attrs = useAttrs();

const listeners = useForwardListeners(emit);

const { size } = useTreeMenuContext('TreeMenuItemImpl');

const { ui } = useTreeMenuThemeContext('TreeMenuItemImpl');

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

const contentProps = computed(() => (isLink.value ? linkProps.value : {}));

const forwardedProps = usePickProps(props, ['value', 'level', 'disabled', 'disabledSelect', 'disabledToggle'], attrs);

const as = computed(() => (isLink.value ? Link : 'button'));

const style = computed<CSSProperties>(() => {
  return {
    [treeMenuCssVars.indent]: props.level - 1
  };
});

const hasChildren = computed(() => Boolean(props.children?.length));

const tagProps = computed(() => ({
  color: 'accent' as const,
  variant: 'raw' as const,
  ...props.tagProps,
  content: props.tag
}));
</script>

<template>
  <TreeItem
    v-slot="{ isExpanded }"
    :class="ui.item"
    v-bind="forwardedProps"
    :data-level="level"
    :style="style"
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
        <Icon v-if="typeof icon === 'string'" :icon="icon" />
        <component :is="icon" v-else />
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
    <slot name="absolute" />
  </TreeItem>
</template>
