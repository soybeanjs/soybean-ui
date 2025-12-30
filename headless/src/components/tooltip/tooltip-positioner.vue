<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePresence } from '../../composables';
import { useTooltipRootContext } from './context';
import TooltipPositionerImpl from './tooltip-positioner-impl.vue';
import type { TooltipPositionerEmits, TooltipPositionerProps } from './types';

defineOptions({
  name: 'TooltipPositioner'
});

const props = defineProps<TooltipPositionerProps>();

const emit = defineEmits<TooltipPositionerEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const listeners = useForwardListeners(emit);

const { popupElement, open } = useTooltipRootContext('TooltipPositioner');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);
</script>

<template>
  <TooltipPositionerImpl v-if="isPresent" v-bind="forwardedProps" v-on="listeners">
    <slot />
  </TooltipPositionerImpl>
</template>
