<script setup lang="ts">
import { computed, nextTick, shallowRef, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { usePresence } from '../../composables';
import { getDisclosureState, isMouseEvent } from '../../shared';
import type { Size } from '../../types';
import { useNavigationMenuRootContext, useNavigationMenuThemeContext } from './context';
import { getNavigationMenuViewportPosition, navigationMenuViewportCssVars } from './shared';
import type { NavigationMenuViewportPosition, NavigationMenuViewportProps } from './types';

defineOptions({
  name: 'NavigationMenuViewport'
});

const props = withDefaults(defineProps<NavigationMenuViewportProps>(), {
  align: 'start'
});

const {
  isRoot,
  open,
  unmountOnHide,
  rootElement,
  activeTriggerElement,
  modelValue,
  viewportElement,
  setViewportElement,
  onContentEnter,
  onContentLeave
} = useNavigationMenuRootContext('NavigationMenuViewport');

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.viewport);

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
    [navigationMenuViewportCssVars.width]: width && `${width}px`,
    [navigationMenuViewportCssVars.height]: height && `${height}px`,
    [navigationMenuViewportCssVars.left]: left && `${left}px`,
    [navigationMenuViewportCssVars.top]: top && `${top}px`
  };
});

function updatePosition() {
  if (!rootElement.value || !viewportElement.value || !activeTriggerElement.value) {
    return;
  }

  position.value = getNavigationMenuViewportPosition({
    rootElement: rootElement.value,
    contentElement: viewportElement.value,
    activeTriggerElement: activeTriggerElement.value,
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

useResizeObserver([() => globalThis?.document?.body, rootElement], () => {
  updatePosition();
});
</script>

<template>
  <div
    v-if="isPresent"
    :ref="setViewportElement"
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
