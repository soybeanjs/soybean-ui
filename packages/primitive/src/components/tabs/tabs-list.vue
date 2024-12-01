<script setup lang="ts">
import { toRefs } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { injectTabsRootContext } from './context';
import type { TabsListPropsWithPrimitive } from './types';

defineOptions({
  name: 'TabsList'
});

const props = withDefaults(defineProps<TabsListPropsWithPrimitive>(), {
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
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-orientation="context.orientation.value"
      role="tablist"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
