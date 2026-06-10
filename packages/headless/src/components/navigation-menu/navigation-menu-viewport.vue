<script setup lang="ts">
import { computed, nextTick, shallowRef, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { getDisclosureState, isMouseEvent } from '../../shared';
import { usePresence } from '../../composables';
import type { Size } from '../../types';
import { getNavigationMenuViewportPosition, navigationMenuViewportCssVars } from './shared';
import { useNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuViewportPosition, NavigationMenuViewportProps } from './types';

defineOptions({
  name: 'NavigationMenuViewport'
});

const props = withDefaults(defineProps<NavigationMenuViewportProps>(), {
  align: 'start'
});

const {
  dir,
  isRoot,
  open,
  orientation,
  unmountOnHide,
  rootElement,
  modelValue,
  activeTriggerElement,
  viewportElement,
  setViewportElement,
  onContentEnter,
  onContentLeave
} = useNavigationMenuRootContext('NavigationMenuViewport');

const cls = useNavigationMenuUi('viewport');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(viewportElement, open);

const dataState = computed(() => getDisclosureState(open.value));

const size = shallowRef<Size>();

const position = shallowRef<NavigationMenuViewportPosition>();

const style = computed<CSSProperties>(() => {
  const { width, height } = size.value || {};
  const { left, top } = position.value || {};

  return {
    // Prevent interaction when animating out
    pointerEvents: !open.value && isRoot ? 'none' : undefined,
    [navigationMenuViewportCssVars.width]: width !== undefined ? `${width}px` : undefined,
    [navigationMenuViewportCssVars.height]: height !== undefined ? `${height}px` : undefined,
    [navigationMenuViewportCssVars.left]: left !== undefined ? `${left}px` : undefined,
    [navigationMenuViewportCssVars.top]: top !== undefined ? `${top}px` : undefined
  };
});

function updatePosition() {
  if (!rootElement.value || !viewportElement.value) {
    return;
  }

  const contentSize = size.value || {
    width: viewportElement.value.offsetWidth,
    height: viewportElement.value.offsetHeight
  };

  position.value = getNavigationMenuViewportPosition({
    rootElement: rootElement.value,
    activeTriggerElement: activeTriggerElement.value,
    contentSize,
    orientation: orientation.value,
    dir: dir.value,
    align: props.align
  });
}

const contentElement = shallowRef<HTMLElement | null>(null);

function getContentElement() {
  if (!viewportElement.value) return;

  requestAnimationFrame(() => {
    const el = viewportElement.value?.querySelector('[data-state=open]');
    contentElement.value = el as HTMLElement | null;
  });
}

const onPointerEnter = () => {
  if (!modelValue.value) return;
  onContentEnter(modelValue.value);
};

const onPointerLeave = (event: PointerEvent) => {
  if (!isMouseEvent(event)) return;
  onContentLeave();
};

useResizeObserver(contentElement, () => {
  if (!contentElement.value) return;
  const { offsetWidth: width, offsetHeight: height } = contentElement.value;

  size.value = {
    width,
    height
  };

  updatePosition();
});

watch(
  [viewportElement, modelValue, open],
  () => {
    nextTick(() => {
      getContentElement();
    });
  },
  { immediate: true }
);

useResizeObserver([() => globalThis?.document?.body, rootElement, activeTriggerElement], () => {
  updatePosition();
});
</script>

<template>
  <div
    v-if="isPresent"
    :ref="setViewportElement"
    data-soybean-navigation-menu-viewport
    :class="cls"
    :data-state="dataState"
    :hidden="!isPresent"
    :style="style"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <slot v-if="!unmountOnHide || isPresent" />
  </div>
</template>
