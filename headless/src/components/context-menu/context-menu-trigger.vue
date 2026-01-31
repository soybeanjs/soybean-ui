<script setup lang="ts">
import { computed, nextTick, ref, watchEffect, onWatcherCleanup, useAttrs } from 'vue';
import { useForwardElement } from '../../composables';
import type { Point } from '../../types';
import { Primitive } from '../primitive';
import { MenuAnchor } from '../menu';
import { useContextMenuRootContext } from './context';
import type { ContextMenuTriggerProps } from './types';

defineOptions({
  name: 'ContextMenuTrigger',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: 'span'
});

const { dataState, pressOpenDelay, onOpenChange, triggerElement, onTriggerElementChange } =
  useContextMenuRootContext('ContextMenuTrigger');

const [_, setTriggerElement] = useForwardElement(el => {
  onTriggerElementChange(el);
});

const attrs = useAttrs();

const dataDisabled = computed(() => (props.disabled ? '' : undefined));

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

let longPressTimer: number | null = null;

const clearLongPressTimer = () => {
  if (longPressTimer) {
    window.clearTimeout(longPressTimer);
    longPressTimer = null;
  }
};

const onOpen = (event: MouseEvent | PointerEvent) => {
  const { clientX: x, clientY: y } = event;
  point.value = { x, y };

  onOpenChange(true);
};

const isTouchOrPen = (event: PointerEvent) => event.pointerType !== 'mouse';

const onContextMenu = async (event: MouseEvent) => {
  if (props.disabled) return;
  await nextTick();
  if (event.defaultPrevented) return;

  clearLongPressTimer();
  onOpen(event);
  event.preventDefault();
};

const onPointerDown = async (event: PointerEvent) => {
  if (props.disabled) return;
  await nextTick();
  if (event.defaultPrevented) return;
  if (!isTouchOrPen(event)) return;

  clearLongPressTimer();
  longPressTimer = window.setTimeout(() => {
    onOpen(event);
  }, pressOpenDelay.value);
};

const onPointerEvent = async (event: PointerEvent) => {
  if (props.disabled) return;
  await nextTick();
  if (event.defaultPrevented) return;

  if (!isTouchOrPen(event)) return;

  clearLongPressTimer();
};

watchEffect(() => {
  if (!props.reference) return;
  onTriggerElementChange(props.reference);

  props.reference.addEventListener('contextmenu', onContextMenu);
  props.reference.addEventListener('pointerdown', onPointerDown);
  props.reference.addEventListener('pointermove', onPointerEvent);
  props.reference.addEventListener('pointercancel', onPointerEvent);
  props.reference.addEventListener('pointerup', onPointerEvent);

  onWatcherCleanup(() => {
    props.reference?.removeEventListener('contextmenu', onContextMenu);
    props.reference?.removeEventListener('pointerdown', onPointerDown);
    props.reference?.removeEventListener('pointermove', onPointerEvent);
    props.reference?.removeEventListener('pointercancel', onPointerEvent);
    props.reference?.removeEventListener('pointerup', onPointerEvent);
  });
});
</script>

<template>
  <MenuAnchor as="template" :reference="virtualEl" />
  <Primitive
    v-if="!reference"
    :ref="setTriggerElement"
    v-bind="{ ...props, ...attrs }"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :style="{
      WebkitTouchCallout: 'none',
      pointerEvents: 'auto'
    }"
    @contextmenu="onContextMenu"
    @pointerdown="onPointerDown"
    @pointermove="onPointerEvent"
    @pointercancel="onPointerEvent"
    @pointerup="onPointerEvent"
  >
    <slot />
  </Primitive>
</template>
