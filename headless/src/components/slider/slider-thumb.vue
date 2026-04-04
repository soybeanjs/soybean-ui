<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { useSliderRootContext, useSliderUi } from './context';
import type { SliderThumbProps } from './types';

defineOptions({
  name: 'SliderThumb'
});

const props = withDefaults(defineProps<SliderThumbProps>(), {
  as: 'div'
});

const attrs = useAttrs();

const cls = useSliderUi('thumb');

const {
  currentModelValue,
  disabled,
  orientation,
  min,
  max,
  startEdge,
  isHorizontal,
  activeThumbIndex,
  getPercentage,
  getThumbLabel,
  setThumbElement,
  beginThumbDrag,
  moveDrag,
  endDrag
} = useSliderRootContext('SliderThumb');

const forwardedProps = useOmitProps(props, ['index']);

const [_, setElementRef] = useForwardElement(node => {
  setThumbElement(props.index, node);
});

const value = computed(() => currentModelValue.value[props.index]);
const percent = computed(() => getPercentage(value.value ?? min.value));
const label = computed(() => getThumbLabel(props.index));
const ariaLabel = computed(() => {
  const attrValue = attrs['aria-label'];

  return typeof attrValue === 'string' ? attrValue : label.value;
});

const style = computed(() => {
  const translate = isHorizontal.value
    ? startEdge.value === 'left'
      ? 'translateX(-50%) translateY(-50%)'
      : 'translateX(50%) translateY(-50%)'
    : startEdge.value === 'bottom'
      ? 'translateX(-50%) translateY(50%)'
      : 'translateX(-50%) translateY(-50%)';

  return {
    position: 'absolute',
    ...(isHorizontal.value ? { top: '50%' } : { left: '50%' }),
    [startEdge.value]: `${percent.value}%`,
    transform: translate
  };
});

function onPointerDown(event: PointerEvent) {
  if (disabled.value) {
    return;
  }

  const target = event.currentTarget as HTMLElement;

  target.setPointerCapture(event.pointerId);
  event.preventDefault();
  event.stopPropagation();
  target.focus();
  beginThumbDrag(props.index, event);
}

function onPointerMove(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;

  if (target.hasPointerCapture(event.pointerId)) {
    event.stopPropagation();
    moveDrag(event);
  }
}

function onFocus() {
  activeThumbIndex.value = props.index;
}

function onPointerUp(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;

  if (!target.hasPointerCapture(event.pointerId)) {
    return;
  }

  event.stopPropagation();
  target.releasePointerCapture(event.pointerId);
  endDrag();
}
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :ref="setElementRef"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="orientation"
    :aria-disabled="disabled || undefined"
    :aria-label="ariaLabel"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="orientation"
    :tabindex="disabled ? undefined : 0"
    role="slider"
    :style="style"
    @focus="onFocus"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </Primitive>
</template>
