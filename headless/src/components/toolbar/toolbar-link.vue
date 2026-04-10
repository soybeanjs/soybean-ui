<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { RovingFocusItem } from '../roving-focus';
import { Link } from '../link';
import { useToolbarUi } from './context';
import type { ToolbarLinkProps } from './types';

defineOptions({
  name: 'ToolbarLink'
});

const props = withDefaults(defineProps<ToolbarLinkProps>(), {
  as: 'a'
});

const cls = useToolbarUi('link');

const forwardedProps = useOmitProps(props, ['class']);

const mergedClass = computed(() => [cls.value, props.class]);

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
    <Link v-bind="forwardedProps" :class="mergedClass" @keydown="onKeyDown">
      <slot />
    </Link>
  </RovingFocusItem>
</template>
