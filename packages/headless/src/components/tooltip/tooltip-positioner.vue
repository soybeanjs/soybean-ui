<script setup lang="ts">
import { computed, onWatcherCleanup, watchPostEffect } from 'vue';
import { defu } from 'defu';
import { usePopperRootContext } from '../popper/context';
import { useForwardListeners } from '../../composables';
import type { PointerDownOutsideEvent } from '../../types';
import { PopperPositioner } from '../popper';
import { useTooltipRootContext } from './context';
import type { TooltipPositionerEmits, TooltipPositionerProps } from './types';

defineOptions({
  name: 'TooltipPositioner'
});

const props = withDefaults(defineProps<TooltipPositionerProps>(), {
  avoidCollisions: true,
  prioritizePosition: true
});

const emit = defineEmits<TooltipPositionerEmits>();

const listeners = useForwardListeners<keyof TooltipPositionerEmits>(emit);

const {
  positionerProps: contextPositionerProps,
  disableHoverableContent,
  disableClosingTrigger
} = useTooltipRootContext('TooltipPositioner');

const { open, triggerElement, onOpenChange } = usePopperRootContext('TooltipPositioner');

function close() {
  onOpenChange(false, 'trigger-hover');
}

// With `disableClosingTrigger`, a pointer down landing on the trigger must not dismiss.
function onPointerDownOutside(event: PointerDownOutsideEvent) {
  if (disableClosingTrigger.value && triggerElement.value?.contains(event.target as Node)) {
    event.preventDefault();
  }

  emit('pointerDownOutside', event);
}

listeners.pointerDownOutside = onPointerDownOutside;

const resolvedProps = computed(() =>
  defu(props, contextPositionerProps.value ?? {}, {
    side: 'top',
    sideOffset: 0,
    align: 'center',
    avoidCollisions: true,
    disableHoverableContent: disableHoverableContent.value,
    onGracePointerExit: close
  } satisfies TooltipPositionerProps)
);

// Close on scroll of any ancestor scroll container of the trigger. Observed only while open.
watchPostEffect(() => {
  if (!open.value) return;

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target?.contains(triggerElement.value!)) {
      close();
    }
  };

  window.addEventListener('scroll', handleScroll);
  onWatcherCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <PopperPositioner v-bind="resolvedProps" data-soybean-tooltip-positioner v-on="listeners">
    <slot />
  </PopperPositioner>
</template>
