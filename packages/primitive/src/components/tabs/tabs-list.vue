<script lang="ts">
import { toRefs } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectTabsRootContext } from './tabs-root.vue';

export interface TabsListProps extends PrimitiveProps {
  /** When `true`, keyboard navigation will loop from last tab to first, and vice versa. */
  loop?: boolean;
}

const props = withDefaults(defineProps<TabsListProps>(), {
  loop: true
});
const { loop } = toRefs(props);

const { forwardRef, currentElement } = useForwardExpose();
const context = injectTabsRootContext();

context.tabsList = currentElement;
</script>

<template>
  <RovingFocusGroup as-child :orientation="context.orientation.value" :dir="context.dir.value" :loop="loop">
    <Primitive
      :ref="forwardRef"
      role="tablist"
      :as-child
      :as
      :aria-orientation="context.orientation.value"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
