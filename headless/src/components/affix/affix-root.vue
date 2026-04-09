<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useAttrs, watch } from 'vue';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { createRafThrottle, getDefaultTarget, getFixedBottom, getFixedTop, getTargetRect, isZeroRect } from './shared';
import type { AffixRootEmits, AffixRootProps } from './types';

defineOptions({
  name: 'AffixRoot',
  inheritAttrs: false
});

const props = defineProps<AffixRootProps>();

const emit = defineEmits<AffixRootEmits>();

const attrs = useAttrs();

const placeholderElement = shallowRef<HTMLDivElement>();
const fixedElement = shallowRef<HTMLDivElement>();
const affixed = shallowRef(false);
const affixStyle = shallowRef<Record<string, string> | undefined>();
const placeholderStyle = shallowRef<Record<string, string> | undefined>();

const forwardedAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;

  return rest;
});
const cls = computed(() => attrs.class);
const dataState = computed(() => (affixed.value ? 'fixed' : 'static'));
const mergedStyle = computed(() => [attrs.style, affixStyle.value].filter(Boolean));
const resolvedTarget = computed(() => props.target?.() ?? getDefaultTarget());
const internalOffsetTop = computed(() => {
  if (props.offsetBottom === undefined && props.offsetTop === undefined) {
    return 0;
  }

  return props.offsetTop;
});

function resetPosition() {
  if (!affixed.value) {
    affixStyle.value = undefined;
    placeholderStyle.value = undefined;

    return;
  }

  affixed.value = false;
  affixStyle.value = undefined;
  placeholderStyle.value = undefined;
  emit('change', false);
}

function measurePosition() {
  if (typeof window === 'undefined') {
    return;
  }

  const placeholder = placeholderElement.value;
  const target = resolvedTarget.value;

  if (!placeholder || !target) {
    resetPosition();

    return;
  }

  const placeholderRect = placeholder.getBoundingClientRect();

  if (isZeroRect(placeholderRect)) {
    resetPosition();

    return;
  }

  const targetRect = getTargetRect(target);
  const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop.value);
  const fixedBottom = getFixedBottom(placeholderRect, targetRect, props.offsetBottom);

  let nextAffixStyle: Record<string, string> | undefined;
  let nextPlaceholderStyle: Record<string, string> | undefined;

  if (fixedTop !== undefined || fixedBottom !== undefined) {
    nextAffixStyle = {
      height: `${placeholderRect.height}px`,
      left: `${placeholderRect.left}px`,
      position: 'fixed',
      width: `${placeholderRect.width}px`
    };

    if (fixedTop !== undefined) {
      nextAffixStyle.top = `${fixedTop}px`;
    }

    if (fixedBottom !== undefined) {
      nextAffixStyle.bottom = `${fixedBottom}px`;
    }

    nextPlaceholderStyle = {
      height: `${placeholderRect.height}px`,
      width: `${placeholderRect.width}px`
    };
  }

  const nextAffixed = Boolean(nextAffixStyle);

  if (affixed.value !== nextAffixed) {
    emit('change', nextAffixed);
  }

  affixed.value = nextAffixed;
  affixStyle.value = nextAffixStyle;
  placeholderStyle.value = nextPlaceholderStyle;
}

const updatePosition = createRafThrottle(measurePosition);

watch(
  [resolvedTarget, () => props.offsetTop, () => props.offsetBottom],
  async () => {
    await nextTick();
    updatePosition();
  },
  { immediate: true }
);

useEventListener(resolvedTarget, 'scroll', updatePosition);
useEventListener(resolvedTarget, 'touchstart', updatePosition);
useEventListener(resolvedTarget, 'touchmove', updatePosition);
useEventListener(resolvedTarget, 'touchend', updatePosition);
useEventListener(getDefaultTarget, 'load', updatePosition);
useEventListener(getDefaultTarget, 'pageshow', updatePosition);
useEventListener(getDefaultTarget, 'resize', updatePosition);
useResizeObserver(placeholderElement, updatePosition);
useResizeObserver(fixedElement, updatePosition);

onMounted(() => {
  updatePosition();
});

onBeforeUnmount(() => {
  updatePosition.cancel();
});

defineExpose({
  affixed,
  updatePosition
});
</script>

<template>
  <div ref="placeholderElement">
    <div v-if="affixed" aria-hidden="true" :style="placeholderStyle" />
    <div
      ref="fixedElement"
      v-bind="forwardedAttrs"
      :class="cls"
      :style="mergedStyle"
      :data-state="dataState"
    >
      <slot :affixed="affixed" />
    </div>
  </div>
</template>
