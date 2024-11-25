<script setup lang="ts">
import { toRefs } from 'vue';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { useDirection, useForwardExpose } from '../../composables';
import { provideToolbarRootContext } from './context';
import type { ToolbarRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToolbarRoot'
});

const props = withDefaults(defineProps<ToolbarRootPropsWithPrimitive>(), {
  orientation: 'horizontal'
});

const { orientation, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef } = useForwardExpose();

provideToolbarRootContext({ orientation, dir });
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <Primitive
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-orientation="orientation"
      role="toolbar"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
