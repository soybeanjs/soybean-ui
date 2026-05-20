<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import Link from '../link/link.vue';
import { RovingFocusItem } from '../roving-focus';
import { useToolbarUi } from './context';
import type { ToolbarLinkProps } from './types';

defineOptions({
  name: 'ToolbarLink'
});

const props = withDefaults(defineProps<ToolbarLinkProps>(), {
  showIcon: true
});

const ui = useToolbarUi();

const forwardedProps = useOmitProps(props, ['class']);

const focusable = computed(() => !props.disabled && props.tabindex !== '-1' && props.tabindex !== -1);

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key !== ' ' || props.disabled) {
    return;
  }

  event.preventDefault();
  (event.currentTarget as HTMLElement | null)?.click();
};
</script>

<template>
  <RovingFocusItem as-child :focusable="focusable">
    <Link v-slot="slotProps" v-bind="forwardedProps" data-soybean-toolbar-link :class="ui.link" @keydown="onKeyDown">
      <slot />
      <Icon v-if="props.showIcon && slotProps.isHref" icon="lucide:arrow-up-right" :class="ui.linkIcon" />
    </Link>
  </RovingFocusItem>
</template>
