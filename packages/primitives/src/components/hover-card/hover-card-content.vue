<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { Presence } from '../presence';
import { injectHoverCardRootContext } from './context';
import { excludeTouch } from './shared';
import HoverCardContentImpl from './hover-card-content-impl.vue';
import type { HoverCardContentEmits, HoverCardContentProps } from './types';

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
