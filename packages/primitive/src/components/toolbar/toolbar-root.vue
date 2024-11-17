<script lang="ts">
import type { Ref } from 'vue';
import { toRefs } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import type { DataOrientation, Direction } from '../../_shared/types';
import { createContext, useDirection, useForwardExpose } from '../../_shared';
</script>

<script setup lang="ts">
export interface ToolbarRootProps extends PrimitiveProps {
  /** The orientation of the toolbar */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
  loop?: boolean;
}

export interface ToolbarRootContext {
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
}

export const [injectToolbarRootContext, provideToolbarRootContext] = createContext<ToolbarRootContext>('ToolbarRoot');

const props = withDefaults(defineProps<ToolbarRootProps>(), {
  orientation: 'horizontal'
});
const { orientation, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef } = useForwardExpose();

provideToolbarRootContext({ orientation, dir });
</script>

<template>
  <RovingFocusGroup as-child :orientation="orientation" :dir="dir" :loop="loop">
    <Primitive :ref="forwardRef" role="toolbar" :aria-orientation="orientation" :as :as-child>
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
