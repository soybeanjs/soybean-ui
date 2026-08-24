<script setup lang="ts">
import { computed, onBeforeUnmount, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { useEpPositionerContext, useEpRootContext, useEpUi } from './context';
import type { EpPopupProps } from './types';

defineOptions({
  name: 'EpPopup'
});

const props = defineProps<EpPopupProps>();

const forwardedProps = useOmitProps(props, ['id', 'class']);

const cls = useEpUi('popup');

const { dataState, isSub, nestingLevel, popupId, triggerElement, triggerId, dir, onPopupElementChange } =
  useEpRootContext('EpPopup');
const { placedSide, placedAlign, isPositioned } = useEpPositionerContext('EpPopup');
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
    data-soybean-ep-popup
    data-dismissable-layer
    :data-ep-sub-popup="isSub ? '' : undefined"
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
