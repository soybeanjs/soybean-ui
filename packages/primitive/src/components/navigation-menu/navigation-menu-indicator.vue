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

const indicatorStyle = ref<{ size: number; position: number }>();
const isHorizontal = computed(() => menuContext.orientation === 'horizontal');
const isVisible = computed(() => Boolean(menuContext.modelValue.value));
const { activeTrigger } = menuContext;

function handlePositionChange() {
  if (!activeTrigger.value) {
    return;
  }

  indicatorStyle.value = {
    size: isHorizontal.value ? activeTrigger.value.offsetWidth : activeTrigger.value.offsetHeight,
    position: isHorizontal.value ? activeTrigger.value.offsetLeft : activeTrigger.value.offsetTop
  };
}

watchEffect(() => {
  if (!menuContext.modelValue.value) {
    indicatorStyle.value = undefined;
    return;
  }
  handlePositionChange();
});

useResizeObserver(activeTrigger, handlePositionChange);
useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
</script>

<template>
  <Teleport v-if="menuContext.indicatorTrack.value" :to="menuContext.indicatorTrack.value">
    <Presence :present="(forceMount || isVisible) && !!indicatorStyle?.size">
      <Primitive
        v-bind="$attrs"
        :ref="forwardRef"
        :class="props.class"
        :as="as"
        :as-child="asChild"
        aria-hidden="true"
        :data-state="isVisible ? 'visible' : 'hidden'"
        :data-orientation="menuContext.orientation"
        :style="{
          ...(indicatorStyle
            ? {
                '--reka-navigation-menu-indicator-size': `${indicatorStyle.size}px`,
                '--reka-navigation-menu-indicator-position': `${indicatorStyle.position}px`
              }
            : {})
        }"
      >
        <slot />
      </Primitive>
    </Presence>
  </Teleport>
</template>
