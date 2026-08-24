<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { usePopperV2PositionerContext, usePopperV2RootContext, usePopperV2Ui } from './context';
import type { PopperV2PopupProps } from './types';

defineOptions({
  name: 'PopperV2Popup'
});

const props = defineProps<PopperV2PopupProps>();

const forwardedProps = useOmitProps(props, ['id', 'class']);

const cls = usePopperV2Ui('popup');

const { dataState, isSub, nestingLevel, popupId, triggerElement, triggerId, dir, onPopupElementChange } =
  usePopperV2RootContext('PopperV2Popup');
const { placedSide, placedAlign, isPositioned } = usePopperV2PositionerContext('PopperV2Popup');
const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const resolvedId = computed(() => props.id ?? popupId.value);
const ariaLabelledby = computed(() => props['aria-labelledby'] ?? (triggerElement.value ? triggerId.value : undefined));

const popupStyle = computed<CSSProperties>(() => {
  return {
    animation: !isPositioned.value ? 'none' : undefined
  };
});

watchEffect(() => {
  if (props.id) {
    popupId.value = props.id;
  }
});

onBeforeUnmount(() => {
  onPopupElementChange(undefined);
});
</script>

<template>
  <div
    v-bind="forwardedProps"
    :id="resolvedId"
    :ref="setPopupElement"
    :class="cls"
    data-soybean-popper-v2-popup
    data-dismissable-layer
    :data-popper-v2-sub-popup="isSub ? '' : undefined"
    :data-nesting-level="nestingLevel"
    :data-state="dataState"
    :data-side="placedSide"
    :data-align="placedAlign"
    :aria-labelledby="ariaLabelledby"
    :dir="dir"
    :style="popupStyle"
    tabindex="-1"
  >
    <slot />
  </div>
</template>
