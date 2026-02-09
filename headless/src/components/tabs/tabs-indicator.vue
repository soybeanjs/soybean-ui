<script setup lang="ts">
import { computed, nextTick, ref, watch, watchPostEffect } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useTabsRootContext, useTabsUi } from './context';
import { tabsCssVars } from './shared';
import type { TabsIndicatorProps } from './types';

defineOptions({
  name: 'TabsIndicator'
});

defineProps<TabsIndicatorProps>();

const { listElement, modelValue, dir, orientation } = useTabsRootContext('TabsIndicator');

const cls = useTabsUi('indicator');

interface IndicatorStyle {
  size: number | null;
  position: number | null;
}

const indicatorStyle = ref<IndicatorStyle>({
  size: null,
  position: null
});

const style = computed(() => {
  return {
    [tabsCssVars.indicatorSize]: `${indicatorStyle.value.size}px`,
    [tabsCssVars.indicatorPosition]: `${indicatorStyle.value.position}px`
  };
});

const tabs = ref<Array<HTMLElement>>([]);

function updateIndicatorStyle() {
  const activeTab = listElement.value?.querySelector<HTMLButtonElement>('[role="tab"][data-state="active"]');

  if (!activeTab) return;

  if (orientation.value === 'horizontal') {
    indicatorStyle.value = {
      size: activeTab.offsetWidth,
      position: activeTab.offsetLeft
    };
  } else {
    indicatorStyle.value = {
      size: activeTab.offsetHeight,
      position: activeTab.offsetTop
    };
  }
}

useResizeObserver(
  computed(() => [listElement.value, ...tabs.value]),
  updateIndicatorStyle
);

watchPostEffect(() => {
  tabs.value = Array.from(listElement.value?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []);
});

watch(
  () => [modelValue.value, dir.value],
  () => {
    updateIndicatorStyle();
  },
  { immediate: true, flush: 'post' }
);
</script>

<template>
  <Primitive v-if="typeof indicatorStyle.size === 'number'" :as="as" :as-child="asChild" :class="cls" :style="style">
    <slot />
  </Primitive>
</template>
