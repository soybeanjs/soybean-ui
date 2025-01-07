<script setup lang="ts">
import { computed, nextTick, watchEffect } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useFocusOutside, useForwardExpose, usePointerDownOutside } from '../../composables';
import { Primitive } from '../primitive';
import { useDismissableLayerState } from './state';
import type { DismissableLayerPrivateEmits, DismissableLayerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DismissableLayer'
});

const state = useDismissableLayerState();

const props = withDefaults(defineProps<DismissableLayerPropsWithPrimitive>(), {
  disableOutsidePointerEvents: false
});

const emit = defineEmits<DismissableLayerPrivateEmits>();

const { forwardRef, currentElement: layerElement } = useForwardExpose();

const ownerDocument = computed(() => layerElement.value?.ownerDocument ?? globalThis.document);

const layers = computed(() => state.layersRoot);

const index = computed(() => {
  return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
});

const isBodyPointerEventsDisabled = computed(() => {
  return state.layersWithOutsidePointerEventsDisabled.size > 0;
});

const isPointerEventsEnabled = computed(() => {
  const localLayers = Array.from(layers.value);
  const [highestLayerWithOutsidePointerEventsDisabled] = [...state.layersWithOutsidePointerEventsDisabled].slice(-1);
  const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(
    highestLayerWithOutsidePointerEventsDisabled
  );

  return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
});

const pointerDownOutside = usePointerDownOutside(async event => {
  const isPointerDownOnBranch = [...state.branches].some(branch => branch?.contains(event.target as HTMLElement));

  if (!isPointerEventsEnabled.value || isPointerDownOnBranch) return;
  emit('pointerDownOutside', event);
  emit('interactOutside', event);

  await nextTick();
  if (!event.defaultPrevented) {
    emit('dismiss');
  }
}, layerElement);

const focusOutside = useFocusOutside(event => {
  const isFocusInBranch = [...state.branches].some(branch => branch?.contains(event.target as HTMLElement));

  if (isFocusInBranch) return;
  emit('focusOutside', event);
  emit('interactOutside', event);

  if (!event.defaultPrevented) {
    emit('dismiss');
  }
}, layerElement);

onKeyStroke('Escape', event => {
  const isHighestLayer = index.value === layers.value.size - 1;
  if (!isHighestLayer) return;
  emit('escapeKeyDown', event);

  if (!event.defaultPrevented) {
    emit('dismiss');
  }
});

let originalBodyPointerEvents: string;

watchEffect(cleanupFn => {
  if (!layerElement.value) return;
  if (props.disableOutsidePointerEvents) {
    if (state.layersWithOutsidePointerEventsDisabled.size === 0) {
      originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
      ownerDocument.value.body.style.pointerEvents = 'none';
    }
    state.layersWithOutsidePointerEventsDisabled.add(layerElement.value);
  }
  layers.value.add(layerElement.value);

  cleanupFn(() => {
    if (props.disableOutsidePointerEvents && state.layersWithOutsidePointerEventsDisabled.size === 1) {
      ownerDocument.value.body.style.pointerEvents = originalBodyPointerEvents;
    }
  });
});

watchEffect(cleanupFn => {
  cleanupFn(() => {
    if (!layerElement.value) return;
    layers.value.delete(layerElement.value);
    state.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
  });
});
</script>

<template>
  <Primitive
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    data-dismissable-layer
    :style="{
      pointerEvents: isBodyPointerEventsDisabled ? (isPointerEventsEnabled ? 'auto' : 'none') : undefined
    }"
    @focus.capture="focusOutside.onFocusCapture"
    @blur.capture="focusOutside.onBlurCapture"
    @pointerdown.capture="pointerDownOutside.onPointerDownCapture"
  >
    <slot />
  </Primitive>
</template>
