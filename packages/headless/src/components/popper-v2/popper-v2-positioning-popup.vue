<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement } from '../../composables';
import { usePopperV2PositionerContext, usePopperV2PositioningRootContext, usePopperV2Ui } from './context';
import type { PopperV2PositioningPopupProps } from './types';

defineOptions({
  name: 'PopperV2PositioningPopup'
});

defineProps<PopperV2PositioningPopupProps>();

const cls = usePopperV2Ui('popup');

const { dir, onPopupElementChange } = usePopperV2PositioningRootContext('PopperV2PositioningPopup');
const { placedSide, placedAlign, isPositioned } = usePopperV2PositionerContext('PopperV2PositioningPopup');
const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const popupStyle = computed<CSSProperties>(() => {
  return {
    animation: !isPositioned.value ? 'none' : undefined
  };
});

onBeforeUnmount(() => {
  onPopupElementChange(undefined);
});
</script>

<template>
  <div
    :ref="setPopupElement"
    :class="cls"
    data-soybean-popper-v2-positioning-popup
    :data-side="placedSide"
    :data-align="placedAlign"
    :dir="dir"
    :style="popupStyle"
  >
    <slot />
  </div>
</template>
