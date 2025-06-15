<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useTabsRootContext, useTabsThemeContext } from './context';
import { tabsCssVars } from './shared';
import type { IndicatorStyle, TabsIndicatorProps } from './types';

defineOptions({
  name: 'TabsIndicator'
});

const props = defineProps<TabsIndicatorProps>();

const { listElement, modelValue, dir, orientation } = useTabsRootContext('TabsIndicator');

const themeContext = useTabsThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.indicator, props.class]);

const activeTab = ref<HTMLElement | null>();

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

function updateIndicatorStyle() {
  activeTab.value = listElement.value?.querySelector<HTMLButtonElement>('[role="tab"][data-state="active"]');

  if (!activeTab.value) return;

  if (orientation.value === 'horizontal') {
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

useResizeObserver([listElement, activeTab], updateIndicatorStyle);

watch(
  () => [modelValue.value, dir.value],
  async () => {
    await nextTick();
    updateIndicatorStyle();
  },
  { immediate: true }
);
</script>

<template>
  <Primitive v-if="typeof indicatorStyle.size === 'number'" v-bind="props" :class="cls" :style="style">
    <slot />
  </Primitive>
</template>
