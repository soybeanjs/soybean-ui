<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePresence } from '../../composables';
import { useTooltipRootContext } from './context';
import TooltipContentImpl from './tooltip-content-impl.vue';
import type { TooltipContentEmits, TooltipContentProps } from './types';

defineOptions({
  name: 'TooltipContent'
});

const props = defineProps<TooltipContentProps>();

const emit = defineEmits<TooltipContentEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const listeners = useForwardListeners(emit);

const { contentElement, open } = useTooltipRootContext('TooltipContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);
</script>

<template>
  <TooltipContentImpl v-if="isPresent" v-bind="forwardedProps" v-on="listeners">
    <slot />
  </TooltipContentImpl>
</template>
