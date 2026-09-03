<script setup lang="ts">
import { toContext } from '../../shared';
import { Primitive } from '../primitive';
import { useRovingFocusItem } from './context';
import type { RovingFocusItemProps } from './types';

defineOptions({
  name: 'RovingFocusItem'
});

const props = withDefaults(defineProps<RovingFocusItemProps>(), {
  focusable: true
});

const { setItemElement, rovingFocusItemProps, rovingFocusItemListeners } = useRovingFocusItem(
  toContext(props, ['tabStopId', 'focusable', 'active', 'allowShiftKey', 'itemData'])
);
</script>

<template>
  <Primitive
    v-bind="rovingFocusItemProps"
    :ref="setItemElement"
    :as="as"
    :as-child="asChild"
    data-soybean-roving-focus-item
    v-on="rovingFocusItemListeners"
  >
    <slot />
  </Primitive>
</template>
