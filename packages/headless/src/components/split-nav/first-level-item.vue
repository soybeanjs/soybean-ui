<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../_icon/icon.vue';
import Button from '../button/button.vue';
import Link from '../link/link.vue';
import type { LinkProps } from '../link/types';
import { RovingFocusItem } from '../roving-focus';
import { findActivePath } from './shared';
import { useSplitNavRootContext, useSplitNavUi } from './context';
import type { FirstLevelItemProps } from './types';

defineOptions({
  name: 'SplitNavFirstLevelItem'
});

const props = defineProps<FirstLevelItemProps>();

const { items, modelValue, onItemActivate } = useSplitNavRootContext('SplitNavFirstLevelItem');

const ui = useSplitNavUi();

const isLink = computed(() => Boolean(props.item.to || props.item.href));

const isActive = computed(() => findActivePath(items.value, modelValue.value).includes(props.item.value));

const dataState = computed(() => (isActive.value ? 'active' : 'inactive'));

const ariaCurrent = computed(() => (isActive.value ? 'page' : undefined));

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

  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  if (!isLink.value || event.key === ' ') {
    event.preventDefault();
  }

  activate(event);
}
</script>

<template>
  <RovingFocusItem as-child :focusable="!item.disabled" :active="isActive" :tab-stop-id="item.value">
    <Button
      data-soybean-split-nav-first-level-item
      :class="ui.firstLevelItem"
      :as-child="isLink"
      :disabled="item.disabled"
      role="menuitem"
      :data-state="dataState"
      :data-disabled="item.disabled ? '' : undefined"
      :data-value="item.value"
      :aria-current="ariaCurrent"
      @click="handleClick"
      @keydown="handleKeyDown"
    >
      <Link v-if="isLink" v-bind="linkProps">
        <slot :item="item" :active="isActive">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.firstLevelItemIcon" :aria-hidden="true" />
          <span :class="ui.firstLevelItemLabel">{{ item.label }}</span>
        </slot>
      </Link>
      <template v-else>
        <slot :item="item" :active="isActive">
          <Icon v-if="item.icon" :icon="item.icon" :class="ui.firstLevelItemIcon" :aria-hidden="true" />
          <span :class="ui.firstLevelItemLabel">{{ item.label }}</span>
        </slot>
      </template>
    </Button>
  </RovingFocusItem>
</template>
