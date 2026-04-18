<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, watch, onWatcherCleanup } from 'vue';
import { useEventListener, useRafFn } from '@vueuse/core';
import { useOmitProps } from '../../composables';
import { Button } from '../button';
import { easeInOutCubic, getScrollTop, prefersReducedMotion, resolveBacktopTarget, setScrollTop } from './shared';
import type { BacktopProps, BacktopEmits, BacktopExposed, BacktopState } from './types';

defineOptions({
  name: 'Backtop'
});

const props = withDefaults(defineProps<BacktopProps>(), {
  as: 'button',
  type: 'button',
  duration: 300,
  visibilityHeight: 400
});

const emit = defineEmits<BacktopEmits>();

const forwardedProps = useOmitProps(props, ['disabled', 'duration', 'target', 'visibilityHeight']);

const visible = shallowRef(false);
const resolvedTarget = shallowRef<Window | HTMLElement | null>(null);

let scrollAnimationFrameId: number | null = null;

const dataState = computed<BacktopState>(() => (visible.value ? 'visible' : 'hidden'));
const ariaLabel = computed(() => props['aria-label'] ?? 'Back to top');

function updateVisible(nextVisible: boolean) {
  if (visible.value === nextVisible) {
    return;
  }

  visible.value = nextVisible;
  emit('change', nextVisible);
}

function syncResolvedTarget() {
  resolvedTarget.value = resolveBacktopTarget(props.target);
}

function measureVisibility() {
  const target = resolvedTarget.value;

  if (!target) {
    updateVisible(false);

    return;
  }

  updateVisible(getScrollTop(target) >= props.visibilityHeight);
}

const { pause: cancelVisibilityUpdate, resume: updateVisibility } = useRafFn(measureVisibility, {
  immediate: false,
  once: true
});

function cancelScrollToTop() {
  if (scrollAnimationFrameId === null) {
    return;
  }

  cancelAnimationFrame(scrollAnimationFrameId);
  scrollAnimationFrameId = null;
}

function scrollToTop() {
  const target = resolvedTarget.value ?? resolveBacktopTarget(props.target);

  if (!target) {
    return;
  }

  const startTop = getScrollTop(target);

  if (startTop <= 0) {
    updateVisibility();

    return;
  }

  cancelScrollToTop();

  if (props.duration <= 0 || prefersReducedMotion()) {
    setScrollTop(target, 0);
    updateVisibility();

    return;
  }

  const startTime = performance.now();

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - startTime) / props.duration, 1);
    const nextTop = Math.round(startTop * (1 - easeInOutCubic(progress)));

    setScrollTop(target, nextTop);

    if (progress < 1 && nextTop > 0) {
      scrollAnimationFrameId = requestAnimationFrame(step);

      return;
    }

    setScrollTop(target, 0);
    scrollAnimationFrameId = null;
    updateVisibility();
  };

  scrollAnimationFrameId = requestAnimationFrame(step);
}

function onClick(event: MouseEvent) {
  emit('click', event);
  scrollToTop();
}

watch(
  [() => props.target, () => props.visibilityHeight],
  async () => {
    syncResolvedTarget();
    await nextTick();
    updateVisibility();
  },
  { immediate: true }
);

watch(
  resolvedTarget,
  target => {
    if (!target) {
      return;
    }

    const stopScrollListener = useEventListener(target, 'scroll', updateVisibility);

    onWatcherCleanup(() => {
      stopScrollListener();
    });
  },
  { immediate: true }
);

useEventListener(() => (typeof window === 'undefined' ? null : window), 'resize', updateVisibility);

onMounted(async () => {
  await nextTick();
  syncResolvedTarget();
  updateVisibility();
});

onBeforeUnmount(() => {
  cancelVisibilityUpdate();
  cancelScrollToTop();
});

defineExpose<BacktopExposed>({
  visible,
  scrollToTop,
  updateVisibility
});
</script>

<template>
  <Button
    v-bind="forwardedProps"
    :aria-hidden="visible ? undefined : true"
    :aria-label="ariaLabel"
    data-slot="root"
    :data-state="dataState"
    :hidden="!visible"
    @click="onClick"
  >
    <slot :visible="visible" />
  </Button>
</template>
