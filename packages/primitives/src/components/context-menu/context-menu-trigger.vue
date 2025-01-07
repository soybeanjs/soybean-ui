<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { useForwardExpose } from '../../composables';
import type { Point } from '../../types';
import MenuAnchor from '../popper/popper-anchor.vue';
import { getOpenState } from '../menu/shared';
import { Primitive } from '../primitive';
import { injectContextMenuRootContext } from './context';
import { isTouchOrPen } from './shared';
import type { ContextMenuTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuTrigger',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ContextMenuTriggerPropsWithPrimitive>(), {
  as: 'span',
  disabled: false
});

const { forwardRef } = useForwardExpose();
const { open, onOpenChange } = injectContextMenuRootContext();

const dataDisabled = computed(() => (props.disabled ? '' : undefined));
const dataState = computed(() => getOpenState(open.value));

const point = ref<Point>({ x: 0, y: 0 });

const virtualEl = computed(() => ({
  getBoundingClientRect: () => {
    const domRect = {
      width: 0,
      height: 0,
      left: point.value.x,
      right: point.value.x,
      top: point.value.y,
      bottom: point.value.y,
      ...point.value
    } as DOMRect;

    return domRect;
  }
}));

const longPressTimer = ref(0);

function clearLongPress() {
  window.clearTimeout(longPressTimer.value);
}

function handleOpen(event: MouseEvent | PointerEvent) {
  const { clientX: x, clientY: y } = event;

  point.value = { x, y };
  onOpenChange(true);
}

async function handleContextMenu(event: PointerEvent) {
  if (props.disabled) return;
  await nextTick();
  if (event.defaultPrevented) return;

  clearLongPress();
  handleOpen(event);
  event.preventDefault();
}

async function handlePointerDown(event: PointerEvent) {
  if (props.disabled) return;

  await nextTick();

  if (isTouchOrPen(event) && !event.defaultPrevented) {
    // clear the long press here in case there's multiple touch points
    clearLongPress();
    longPressTimer.value = window.setTimeout(() => handleOpen(event), 700);
  }
}

async function handlePointerEvent(event: PointerEvent) {
  if (props.disabled) return;

  await nextTick();

  if (isTouchOrPen(event) && !event.defaultPrevented) {
    clearLongPress();
  }
}
</script>

<template>
  <MenuAnchor as="template" :reference="virtualEl" />
  <Primitive
    v-bind="$attrs"
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :style="{
      WebkitTouchCallout: 'none'
    }"
    @contextmenu="handleContextMenu"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerEvent"
    @pointercancel="handlePointerEvent"
    @pointerup="handlePointerEvent"
  >
    <slot />
  </Primitive>
</template>
