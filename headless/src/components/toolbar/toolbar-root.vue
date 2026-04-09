<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideToolbarRootContext } from './context';
import type { ToolbarRootProps } from './types';

defineOptions({
  name: 'ToolbarRoot'
});

const props = withDefaults(defineProps<ToolbarRootProps>(), {
  orientation: 'horizontal'
});

provideToolbarRootContext(transformPropsToContext(props, ['orientation', 'dir']));
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <Primitive :as="as" :as-child="asChild" role="toolbar" :aria-orientation="orientation" :dir="dir" :data-orientation="orientation">
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
