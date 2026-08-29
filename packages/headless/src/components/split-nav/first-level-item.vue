<script setup lang="ts">
import { computed } from 'vue';
import { getDisclosureState } from '../../shared';
import Icon from '../_icon/icon.vue';
import Button from '../button/button.vue';
import Link from '../link/link.vue';
import type { LinkProps } from '../link/types';
import { RovingFocusItem } from '../roving-focus';
import { findActivePath, hasVisibleChildren, isFirstLevelExpandKey } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import type { FirstLevelItemProps } from './types';

defineOptions({
  name: 'SplitNavFirstLevelItem'
});

const props = defineProps<FirstLevelItemProps>();

const { items, modelValue, openPath, onItemActivate } = useSplitNavRootContext('SplitNavFirstLevelItem');

const ui = useSplitNavUi();

const isLink = computed(() => Boolean(props.item.to || props.item.href));

const isBranch = computed(() => hasVisibleChildren(props.item));

const isSelected = computed(() => !isBranch.value && modelValue.value === props.item.value);

const isOpen = computed(() => isBranch.value && openPath.value.includes(props.item.value));

const hasChildSelected = computed(() => {
  if (!isBranch.value || modelValue.value === props.item.value) {
    return false;
  }

  return findActivePath(items.value, modelValue.value).includes(props.item.value);
});

const dataState = computed(() => getDisclosureState(isOpen.value));

const ariaCurrent = computed(() => (isSelected.value ? 'page' : undefined));

const ariaExpanded = computed(() => (isBranch.value ? isOpen.value : undefined));

const linkProps = computed<LinkProps>(() => {
  if (!isLink.value) {
    return {};
  }

  const { disabled, to, href, target, external } = props.item;

  return {
    disabled,
    to,
    href,
    target,
    external
  };
});

function activate(event?: Event) {
  if (props.item.disabled) {
    return;
  }

  onItemActivate(props.item.value, event);
}

function handleClick(event: Event) {
  activate(event);
}

function handleKeyDown(event: KeyboardEvent) {
  if (props.item.disabled) {
    return;
  }

  const isActivateKey = event.key === 'Enter' || event.key === ' ';
  const isExpandKey = isBranch.value && isFirstLevelExpandKey(event.key, props.orientation);

  if (!isActivateKey && !isExpandKey) {
    return;
  }

  if (!isLink.value || event.key === ' ' || isExpandKey) {
    event.preventDefault();
  }

  activate(event);
}
</script>

<template>
  <RovingFocusItem as-child :focusable="!item.disabled" :active="isSelected || isOpen" :tab-stop-id="item.value">
    <Button
      data-soybean-split-nav-first-level-item
      :class="ui.firstLevelItem"
      :as-child="isLink"
      :disabled="item.disabled"
      role="menuitem"
      :data-state="dataState"
      :data-selected="isSelected"
      :data-orientation="orientation"
      :data-disabled="item.disabled ? '' : undefined"
      :data-value="item.value"
      :data-child-selected="hasChildSelected ? '' : undefined"
      :aria-current="ariaCurrent"
      :aria-expanded="ariaExpanded"
      @click="handleClick"
      @keydown="handleKeyDown"
    >
      <Link v-if="isLink" v-bind="linkProps">
        <slot :item="item" :selected="isSelected" :open="isOpen">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.firstLevelItemIcon" :aria-hidden="true" />
          <span :class="ui.firstLevelItemLabel">{{ item.label }}</span>
        </slot>
      </Link>
      <template v-else>
        <slot :item="item" :selected="isSelected" :open="isOpen">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.firstLevelItemIcon" :aria-hidden="true" />
          <span :class="ui.firstLevelItemLabel">{{ item.label }}</span>
        </slot>
      </template>
    </Button>
  </RovingFocusItem>
</template>
