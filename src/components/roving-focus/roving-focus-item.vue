<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
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
  transformPropsToContext(props, ['tabStopId', 'focusable', 'active', 'allowShiftKey', 'itemData'])
);
</script>

<template>
  <Primitive
    v-bind="rovingFocusItemProps"
    :ref="setItemElement"
    :as="as"
    :as-child="asChild"
    v-on="rovingFocusItemListeners"
  >
    <slot />
  </Primitive>
</template>
