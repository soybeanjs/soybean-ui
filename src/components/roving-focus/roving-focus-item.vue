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

const { rovingFocusItemProps, rovingFocusItemListeners } = useRovingFocusItem(
  transformPropsToContext(props, ['tabStopId', 'focusable', 'active', 'allowShiftKey'])
);
</script>

<template>
  <Primitive v-bind="{ ...props, ...rovingFocusItemProps }" v-on="rovingFocusItemListeners">
    <slot />
  </Primitive>
</template>
