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

const forwardedProps = useOmitProps(props, ['disabledSelect']);

const cls = useTreeMenuUi('button');

const { isSelected, onSelect, value } = useTreeMenuItemContext('TreeMenuButton');

// Stable collection data: a fresh template object would re-register the item
// on every render.
const itemData = { value };

const onClick = () => {
  if (props.disabledSelect) return;

  onSelect();
};
</script>

<template>
  <RovingFocusItem
    as-child
    :tab-stop-id="value"
    :focusable="!props.disabled"
    :active="isSelected"
    :item-data="itemData"
  >
    <Button
      v-bind="forwardedProps"
      data-soybean-tree-menu-button
      :class="cls"
      :data-selected="isSelected"
      :data-value="value"
      @click="onClick"
    >
      <slot />
    </Button>
  </RovingFocusItem>
</template>
