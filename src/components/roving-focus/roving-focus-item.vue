<script setup lang="ts">
import { useOmitProps } from '../../composables';
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
  transformPropsToContext(props, ['tabStopId', 'focusable', 'active', 'allowShiftKey'])
);

const forwardedProps = useOmitProps(props, ['tabStopId', 'focusable', 'active', 'allowShiftKey'], rovingFocusItemProps);
</script>

<template>
  <Primitive v-bind="forwardedProps" :ref="setItemElement" v-on="rovingFocusItemListeners">
    <slot />
  </Primitive>
</template>
