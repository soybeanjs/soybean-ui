<script setup lang="ts">
import { computed, shallowRef, useAttrs, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useForwardElement, useOmitProps, usePresence } from '../../composables';
import { useNavigationMenuRootContext, useNavigationMenuThemeContext } from './context';
import { navigationMenuIndicatorCssVars } from './shared';
import type { NavigationMenuIndicatorProps } from './types';

defineOptions({
  name: 'NavigationMenuIndicator',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuIndicatorProps>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['forceMount'], attrs);

const { activeTriggerElement, modelValue, indicatorTrackElement } =
  useNavigationMenuRootContext('NavigationMenuIndicator');
const [indicatorElement, setIndicatorElement] = useForwardElement();

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.indicator);

const isVisible = computed(() => Boolean(modelValue.value));
const isPresent = props.forceMount ? shallowRef(true) : usePresence(indicatorElement, () => isVisible.value);

interface SizePosition {
  size: number;
  position: number;
}

const sizePosition = shallowRef<SizePosition>();

const indicatorStyle = computed<CSSProperties>(() => {
  if (!sizePosition.value) return {};

  const { size, position } = sizePosition.value;

  return {
    [navigationMenuIndicatorCssVars.size]: `${size}px`,
    [navigationMenuIndicatorCssVars.position]: `${position}px`
  };
});

const onPositionChange = () => {
  if (!activeTriggerElement.value) return;

  const { offsetWidth, offsetLeft } = activeTriggerElement.value;

  sizePosition.value = {
    size: offsetWidth,
    position: offsetLeft
  };
};

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
  <Teleport v-if="indicatorTrackElement" :to="indicatorTrackElement">
    <div
      v-if="isPresent"
      v-bind="forwardedProps"
      :ref="setIndicatorElement"
      :class="cls"
      aria-hidden="true"
      :data-state="isVisible ? 'visible' : 'hidden'"
      :style="indicatorStyle"
    >
      <slot />
    </div>
  </Teleport>
</template>
