<script setup lang="ts">
import { useOmitProps } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideToolbarRootContext, useToolbarUi } from './context';
import type { ToolbarRootProps } from './types';

defineOptions({
  name: 'ToolbarRoot'
});

const props = withDefaults(defineProps<ToolbarRootProps>(), {
  orientation: 'horizontal'
});

const cls = useToolbarUi('root');

const forwardedProps = useOmitProps(props, ['class']);

provideToolbarRootContext(transformPropsToContext(props, ['orientation', 'dir']));
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <Primitive
      v-bind="forwardedProps"
      :as="as"
      :as-child="asChild"
      :class="[cls, props.class]"
      role="toolbar"
      :aria-orientation="orientation"
      :dir="dir"
      :data-orientation="orientation"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
