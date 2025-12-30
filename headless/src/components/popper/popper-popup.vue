<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { usePopperPositionerContext, usePopperThemeContext } from './context';
import type { PopperPopupProps } from './types';

defineOptions({
  name: 'PopperPopup'
});

defineProps<PopperPopupProps>();

const themeContext = usePopperThemeContext();
const cls = computed(() => themeContext?.ui?.value?.popup);

const { placedSide, placedAlign, isPositioned } = usePopperPositionerContext('PopperPopup');

const style = computed<CSSProperties>(() => {
  return {
    animation: !isPositioned.value ? 'none' : undefined
  };
});
</script>

<template>
  <div :class="cls" data-soybean-popper-popup :data-side="placedSide" :data-align="placedAlign" :style="style">
    <slot />
  </div>
</template>
