<script setup lang="ts">
import { computed } from 'vue';
import { defu } from 'defu';
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardListeners } from '../../composables';
import { PopperV2Positioner } from '../popper-v2';
import type { HoverCardPositionerEmits, HoverCardPositionerProps } from './types';

defineOptions({
  name: 'HoverCardPositioner'
});

const props = withDefaults(defineProps<HoverCardPositionerProps>(), {
  avoidCollisions: true,
  prioritizePosition: true
});

const emit = defineEmits<HoverCardPositionerEmits>();

const listeners = useForwardListeners<keyof HoverCardPositionerEmits>(emit);

const { onOpenChange } = usePopperV2RootContext('HoverCardPositioner');

const resolvedProps = computed(() =>
  defu(props, {
    side: 'bottom',
    sideOffset: 4,
    align: 'center',
    avoidCollisions: true,
    onGracePointerExit: () => onOpenChange(false, 'trigger-hover')
  } satisfies HoverCardPositionerProps)
);
</script>

<template>
  <PopperV2Positioner v-bind="resolvedProps" data-soybean-hover-card-positioner v-on="listeners">
    <slot />
  </PopperV2Positioner>
</template>
