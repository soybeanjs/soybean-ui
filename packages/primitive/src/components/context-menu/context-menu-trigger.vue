<script setup lang="ts">
import { computed, nextTick, ref, toRefs } from 'vue';
import { useForwardExpose } from '../../composables';
import type { Point } from '../../types';
import { MenuAnchor } from '../menu';
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
const { disabled } = toRefs(props);

const { forwardRef } = useForwardExpose();
const rootContext = injectContextMenuRootContext();
const point = ref<Point>({ x: 0, y: 0 });
const virtualEl = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: point.value.x,
      right: point.value.x,
      top: point.value.y,
      bottom: point.value.y,
      ...point.value
    }) as DOMRect
}));

const longPressTimer = ref(0);
function clearLongPress() {
  window.clearTimeout(longPressTimer.value);
}

function handleOpen(event: MouseEvent | PointerEvent) {
  point.value = { x: event.clientX, y: event.clientY };
  rootContext.onOpenChange(true);
}

async function handleContextMenu(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick();
    if (!event.defaultPrevented) {
      clearLongPress();
      handleOpen(event);
      event.preventDefault();
    }
  }
}

async function handlePointerDown(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick();

    if (isTouchOrPen(event) && !event.defaultPrevented) {
      // clear the long press here in case there's multiple touch points
      clearLongPress();
      longPressTimer.value = window.setTimeout(() => handleOpen(event), 700);
    }
  }
}

async function handlePointerEvent(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick();
    if (isTouchOrPen(event) && !event.defaultPrevented) clearLongPress();
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
    :data-disabled="disabled ? '' : undefined"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
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
