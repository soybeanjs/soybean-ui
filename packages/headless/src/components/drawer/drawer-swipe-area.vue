<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import type { SwipeDirection } from '../../types';
import { DRAWER_CSS_VARS, SWIPE_TO_OPEN } from './shared';
import { useDrawerRootContext, useDrawerUi } from './context';
import type { DrawerSwipeAreaProps } from './types';
import { useSwipeDismiss } from './use-swipe-dismiss';

defineOptions({
  name: 'DrawerSwipeArea'
});

const props = withDefaults(defineProps<DrawerSwipeAreaProps>(), {
  swipeDirection: undefined,
  disabled: false
});

const cls = useDrawerUi('swipeArea');

const { side, isOpen, emitOpenChange, onSwipingChange } = useDrawerRootContext('DrawerSwipeArea');

const [elementRef, setElementRef] = useForwardElement();

/** The gesture that opens the drawer runs opposite to the direction the panel enters from. */
const openDirection = computed<SwipeDirection>(() => props.swipeDirection ?? SWIPE_TO_OPEN[side.value]);

const enabled = computed(() => !props.disabled && !isOpen.value);

const directions = computed<SwipeDirection[]>(() => [openDirection.value]);

useSwipeDismiss({
  enabled,
  elementRef,
  directions,
  movementCssVars: {
    x: DRAWER_CSS_VARS.swipeMovementX,
    y: DRAWER_CSS_VARS.swipeMovementY
  },
  onDismiss() {
    emitOpenChange(true);
  },
  onSwipingChange
});
</script>

<template>
  <div
    :ref="setElementRef"
    :class="cls"
    data-soybean-drawer-swipe-area
    :data-state="isOpen ? 'open' : 'closed'"
    :data-soybean-drawer-swipe-direction="openDirection"
  >
    <slot />
  </div>
</template>
