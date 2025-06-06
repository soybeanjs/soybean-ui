<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectTabsRootContext } from './context';
import type { TabsIndicatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'TabsIndicator'
});

const props = defineProps<TabsIndicatorPropsWithPrimitive>();

const context = injectTabsRootContext();
useForwardExpose();

interface IndicatorStyle {
  size: number | null;
  position: number | null;
}
const activeTab = ref<HTMLElement | null>();
const indicatorStyle = ref<IndicatorStyle>({
  size: null,
  position: null
});

watch(
  () => [context.modelValue.value, context?.dir.value],
  async () => {
    await nextTick();
    updateIndicatorStyle();
  },
  { immediate: true }
);

useResizeObserver([context.tabsList, activeTab], updateIndicatorStyle);

function updateIndicatorStyle() {
  activeTab.value = context.tabsList.value?.querySelector<HTMLButtonElement>('[role="tab"][data-state="active"]');

  if (!activeTab.value) return;

  if (context.orientation.value === 'horizontal') {
    indicatorStyle.value = {
      size: activeTab.value.offsetWidth,
      position: activeTab.value.offsetLeft
    };
  } else {
    indicatorStyle.value = {
      size: activeTab.value.offsetHeight,
      position: activeTab.value.offsetTop
    };
  }
}
</script>

<template>
  <Primitive
    v-if="typeof indicatorStyle.size === 'number'"
    v-bind="props"
    :style="{
      '--soybean-tabs-indicator-size': `${indicatorStyle.size}px`,
      '--soybean-tabs-indicator-position': `${indicatorStyle.position}px`
    }"
  >
    <slot />
  </Primitive>
</template>
