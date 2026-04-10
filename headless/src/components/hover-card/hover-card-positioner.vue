<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePresence } from '../../composables';
import { useHoverCardRootContext } from './context';
import HoverCardPositionerImpl from './hover-card-positioner-impl.vue';
import type { HoverCardPositionerEmits, HoverCardPositionerProps } from './types';

defineOptions({
  name: 'HoverCardPositioner'
});

const props = withDefaults(defineProps<HoverCardPositionerProps>(), {
  avoidCollisions: true
});

const emit = defineEmits<HoverCardPositionerEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);
const listeners = useForwardListeners(emit);

const { open, popupElement } = useHoverCardRootContext('HoverCardPositioner');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);
</script>

<template>
  <HoverCardPositionerImpl v-if="isPresent" v-bind="forwardedProps" v-on="listeners">
    <slot />
  </HoverCardPositionerImpl>
</template>
