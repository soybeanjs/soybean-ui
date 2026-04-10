<script setup lang="ts">
import { computed } from 'vue';
import {
  HoverCardArrow,
  HoverCardPopup,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
  provideHoverCardUi
} from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { hoverCardVariants } from './variants';
import type { HoverCardEmits, HoverCardProps } from './types';

defineOptions({
  name: 'SHoverCard'
});

const props = withDefaults(defineProps<HoverCardProps>(), {
  open: undefined,
  defaultOpen: false,
  showArrow: true
});

const emit = defineEmits<HoverCardEmits>();

const forwardedRootProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'placement',
  'showArrow',
  'positionerProps',
  'popupProps',
  'triggerProps',
  'portalProps',
  'arrowProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = hoverCardVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

const positionerProps = computed(() => {
  return {
    ...props.positionerProps,
    placement: props.placement ?? props.positionerProps?.placement
  };
});

provideHoverCardUi(ui);
</script>

<template>
  <HoverCardRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <HoverCardTrigger v-bind="triggerProps" as-child>
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal v-bind="portalProps">
      <HoverCardPositioner v-bind="positionerProps" v-on="listeners">
        <HoverCardPopup v-bind="popupProps">
          <slot />
          <HoverCardArrow v-if="showArrow" v-bind="arrowProps" />
        </HoverCardPopup>
      </HoverCardPositioner>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
