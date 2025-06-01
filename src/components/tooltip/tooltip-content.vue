<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardEmits, usePresence } from '../../composables';
import { useTooltipRootContext } from './context';
import TooltipContentImpl from './tooltip-content-impl.vue';
import type { TooltipContentEmits, TooltipContentProps } from './types';

defineOptions({
  name: 'TooltipContent'
});

const props = defineProps<TooltipContentProps>();

const emit = defineEmits<TooltipContentEmits>();

const events = useForwardEmits(emit);

const { contentElement, open } = useTooltipRootContext('TooltipContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);
</script>

<template>
  <TooltipContentImpl v-if="isPresent" v-bind="props" v-on="events">
    <slot />
  </TooltipContentImpl>
</template>
