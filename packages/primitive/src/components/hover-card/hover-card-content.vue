<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { HoverCardContentEmits, HoverCardContentProps } from './types';
import { injectHoverCardRootContext } from './context';
import { excludeTouch } from './shared';
import HoverCardContentImpl from './hover-card-content-impl.vue';

defineOptions({
  name: 'HoverCardContent'
});

const props = defineProps<HoverCardContentProps>();

const emit = defineEmits<HoverCardContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);
const { forwardRef } = useForwardExpose();

const rootContext = injectHoverCardRootContext();
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <HoverCardContentImpl v-bind="forwarded" :ref="forwardRef" @pointerenter="excludeTouch(rootContext.onOpen)($event)">
      <slot />
    </HoverCardContentImpl>
  </Presence>
</template>
