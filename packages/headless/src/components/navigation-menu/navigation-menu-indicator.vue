<script setup lang="ts">
import { computed, shallowRef, useAttrs, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useForwardElement, usePresence } from '../../composables';
import { getNavigationMenuIndicatorPosition, navigationMenuIndicatorCssVars } from './shared';
import { useNavigationMenuRootContext, useNavigationMenuUi } from './context';
import type { NavigationMenuIndicatorProps } from './types';

defineOptions({
  name: 'NavigationMenuIndicator',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuIndicatorProps>();

const attrs = useAttrs();

const { dir, rootElement, orientation, activeTriggerElement, modelValue, indicatorTrackElement } =
  useNavigationMenuRootContext('NavigationMenuIndicator');
const [indicatorElement, setIndicatorElement] = useForwardElement();

const cls = useNavigationMenuUi('indicator');

const isVisible = computed(() => Boolean(modelValue.value));
const isPresent = props.forceMount ? shallowRef(true) : usePresence(indicatorElement, () => isVisible.value);

interface SizePosition {
  size: number;
  left: number;
  top: number;
}

const sizePosition = shallowRef<SizePosition>();

const indicatorStyle = computed<CSSProperties>(() => {
  if (!sizePosition.value) return {};

  const { size, left, top } = sizePosition.value;

  return {
    [navigationMenuIndicatorCssVars.size]: `${size}px`,
    [navigationMenuIndicatorCssVars.left]: `${left}px`,
    [navigationMenuIndicatorCssVars.top]: `${top}px`
  };
});

const onPositionChange = () => {
  if (!activeTriggerElement.value || !indicatorTrackElement.value) return;

  sizePosition.value = getNavigationMenuIndicatorPosition({
    indicatorTrackElement: indicatorTrackElement.value,
    activeTriggerElement: activeTriggerElement.value,
    orientation: orientation.value,
    dir: dir.value
  });
};

const teleportTarget = computed(
  () => indicatorTrackElement.value?.ownerDocument?.body ?? rootElement.value?.ownerDocument?.body
);

watchEffect(() => {
  if (!modelValue.value) {
    sizePosition.value = undefined;
    return;
  }
  onPositionChange();
});

useResizeObserver(activeTriggerElement, onPositionChange);
useResizeObserver(indicatorTrackElement, onPositionChange);
</script>

<template>
  <Teleport v-if="teleportTarget" :to="teleportTarget">
    <div
      v-if="isPresent"
      v-bind="attrs"
      :ref="setIndicatorElement"
      data-soybean-navigation-menu-indicator
      :class="cls"
      aria-hidden="true"
      :dir="dir"
      :data-orientation="orientation"
      :data-state="isVisible ? 'visible' : 'hidden'"
      :style="indicatorStyle"
    >
      <slot />
    </div>
  </Teleport>
</template>
