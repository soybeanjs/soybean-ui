<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { usePopperPositionerContext, usePopperRootContext, usePopperUi } from './context';
import type { PopperPopupProps } from './types';

defineOptions({
  name: 'PopperPopup'
});

const props = defineProps<PopperPopupProps>();

const cls = usePopperUi('popup');

const { dir, onPopupElementChange } = usePopperRootContext('PopperPopup');
const { placedSide, placedAlign, isPositioned } = usePopperPositionerContext('PopperPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const style = computed<CSSProperties>(() => {
  return {
    animation: !isPositioned.value ? 'none' : undefined
  };
});

const popupAttrs = useOmitProps(props, [
  'class',
  'style',
  'dir',
  'data-side',
  'data-align',
  'data-soybean-popper-popup'
]);
</script>

<template>
  <div
    v-bind="popupAttrs"
    :ref="setPopupElement"
    :class="cls"
    data-soybean-popper-popup
    :data-side="placedSide"
    :data-align="placedAlign"
    :dir="dir"
    :style="style"
  >
    <slot />
  </div>
</template>
