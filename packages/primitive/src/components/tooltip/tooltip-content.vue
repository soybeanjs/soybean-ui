<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { Presence } from '../presence';
import { injectTooltipRootContext } from './context';
import TooltipContentImpl from './tooltip-content-impl.vue';
import TooltipContentHoverable from './tooltip-content-hoverable.vue';
import type { TooltipContentEmits, TooltipContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'TooltipContent'
});

const props = withDefaults(defineProps<TooltipContentPropsWithPrimitive>(), {
  side: 'top'
});

const emit = defineEmits<TooltipContentEmits>();

const rootContext = injectTooltipRootContext();
const forwarded = useForwardPropsEmits(props, emit);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <component
      :is="rootContext.disableHoverableContent.value ? TooltipContentImpl : TooltipContentHoverable"
      :ref="forwardRef"
      v-bind="forwarded"
    >
      <slot />
    </component>
  </Presence>
</template>
