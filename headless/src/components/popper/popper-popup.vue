<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement } from '../../composables';
import { usePopperPositionerContext, usePopperRootContext, usePopperThemeContext } from './context';
import type { PopperPopupProps } from './types';

defineOptions({
  name: 'PopperPopup'
});

defineProps<PopperPopupProps>();

const themeContext = usePopperThemeContext();
const cls = computed(() => themeContext?.ui?.value?.popup);

const { onPopupElementChange } = usePopperRootContext('PopperPopup');
const { placedSide, placedAlign, isPositioned } = usePopperPositionerContext('PopperPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const style = computed<CSSProperties>(() => {
  return {
    animation: !isPositioned.value ? 'none' : undefined
  };
});
</script>

<template>
  <div
    :ref="setPopupElement"
    :class="cls"
    data-soybean-popper-popup
    :data-side="placedSide"
    :data-align="placedAlign"
    :style="style"
  >
    <slot />
  </div>
</template>
