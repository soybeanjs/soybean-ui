<script setup lang="ts">
import { useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import { RovingFocusItem } from '../roving-focus';
import { useTreeMenuItemContext, useTreeMenuUi } from './context';
import type { TreeMenuButtonProps } from './types';

defineOptions({
  name: 'TreeMenuButton'
});

const props = defineProps<TreeMenuButtonProps>();

const forwardedProps = useOmitProps(props, ['disabledActive']);

const cls = useTreeMenuUi('button');

const { isActive, onActive, value } = useTreeMenuItemContext('TreeMenuButton');

// Stable collection data: a fresh template object would re-register the item
// on every render.
const itemData = { value };

const onClick = () => {
  if (props.disabledActive) return;

  onActive();
};
</script>

<template>
  <RovingFocusItem as-child :tab-stop-id="value" :focusable="!props.disabled" :item-data="itemData">
    <!--
      The button is the roving tab stop and carries its value both as tab stop id
      and `data-value` so the root can resolve keyboard navigation targets. The
      `treeitem` role lives on the item wrapper.
    -->
    <Button
      v-bind="forwardedProps"
      data-soybean-tree-menu-button
      :class="cls"
      :data-active="isActive"
      :data-value="value"
      @click="onClick"
    >
      <slot />
    </Button>
  </RovingFocusItem>
</template>
