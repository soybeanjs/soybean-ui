<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import type { ToolbarButtonPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToolbarButton'
});

const props = withDefaults(defineProps<ToolbarButtonPropsWithPrimitive>(), {
  as: 'button'
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const { forwardRef } = useForwardExpose();
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled">
    <Primitive :ref="forwardRef" v-bind="props" :type="tag">
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
