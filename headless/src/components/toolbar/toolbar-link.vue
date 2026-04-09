<script setup lang="ts">
import { RovingFocusItem } from '../roving-focus';
import { Link } from '../link';
import type { ToolbarLinkProps } from './types';

defineOptions({
  name: 'ToolbarLink'
});

const props = withDefaults(defineProps<ToolbarLinkProps>(), {
  as: 'a'
});

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key !== ' ') {
    return;
  }

  event.preventDefault();
  (event.currentTarget as HTMLElement | null)?.click();
};
</script>

<template>
  <RovingFocusItem as-child focusable>
    <Link v-bind="props" @keydown="onKeyDown">
      <slot />
    </Link>
  </RovingFocusItem>
</template>
