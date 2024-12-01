<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { Presence } from '../presence';
import { Primitive } from '../primitive';
import { injectNavigationMenuRootContext } from './context';
import type { NavigationMenuIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'NavigationMenuIndicator',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuIndicatorPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();
const menuContext = injectNavigationMenuRootContext();

const position = ref<{ size: number; offset: number }>();
const isHorizontal = computed(() => menuContext.orientation === 'horizontal');
const isVisible = computed(() => Boolean(menuContext.modelValue.value));
const { activeTrigger } = menuContext;

function handlePositionChange() {
  if (activeTrigger.value) {
    position.value = {
      size: isHorizontal.value ? activeTrigger.value.offsetWidth : activeTrigger.value.offsetHeight,
      offset: isHorizontal.value ? activeTrigger.value.offsetLeft : activeTrigger.value.offsetTop
    };
  }
}

watchEffect(() => {
  if (!menuContext.modelValue.value) {
    position.value = undefined;
    return;
  }
  handlePositionChange();
});

useResizeObserver(activeTrigger, handlePositionChange);
useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
</script>

<template>
  <Teleport v-if="menuContext.indicatorTrack.value" :to="menuContext.indicatorTrack.value">
    <Presence :present="(forceMount || isVisible) && !!position?.size">
      <Primitive
        :ref="forwardRef"
        :class="props.class"
        :as="as"
        :as-child="asChild"
        aria-hidden="true"
        :data-state="isVisible ? 'visible' : 'hidden'"
        :data-orientation="menuContext.orientation"
        :style="{
          position: 'absolute',
          ...(isHorizontal
            ? {
                left: 0,
                width: `${position?.size}px`,
                transform: `translateX(${position?.offset}px)`
              }
            : {
                top: 0,
                height: `${position?.size}px`,
                transform: `translateY(${position?.offset}px)`
              })
        }"
        v-bind="$attrs"
      >
        <slot />
      </Primitive>
    </Presence>
  </Teleport>
</template>
