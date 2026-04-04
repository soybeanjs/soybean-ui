<script setup lang="ts">
import { computed, nextTick, onUnmounted, shallowRef, watch } from 'vue';
import { provideSonnerUi, sonnerToasts } from '@soybeanjs/headless/sonner';
import { cn, mergeSlotVariants } from '@/theme';
import { sonnerToastVariants, sonnerVariants } from './variants';
import type { SonnerToastT } from '@soybeanjs/headless/sonner';
import type { SonnerProps } from './types';

defineOptions({ name: 'SSonner' });

const props = withDefaults(defineProps<SonnerProps>(), {
  position: 'bottom-right',
  duration: 4000,
  visibleToasts: 3,
  expand: false,
  gap: 14,
  closeButton: false,
  richColors: false
});

const ui = computed(() => {
  const variants = sonnerToastVariants({ type: 'default', richColors: props.richColors });

  return mergeSlotVariants(variants, props.ui, { toast: props.class });
});

provideSonnerUi(ui);

const DEFAULT_TOAST_HEIGHT = 76;

const hoverExpanded = shallowRef(false);
const mountedToastIds = shallowRef<Set<string | number>>(new Set());
const removingIds = shallowRef<Set<string | number>>(new Set());
const heights = shallowRef<Record<string, number>>({});
const removalOffsets = shallowRef<Record<string, number>>({});
const removalExpandedStates = shallowRef<Record<string, boolean>>({});
const timerMap = new Map<string | number, ReturnType<typeof setTimeout>>();
const resizeObservers = new Map<string | number, ResizeObserver>();
const observedElements = new Map<string | number, Element>();

const expanded = computed(() => props.expand || hoverExpanded.value);
const renderedToasts = computed(() => sonnerToasts.value);
const visibleCount = computed(() => Math.min(renderedToasts.value.length, props.visibleToasts));
const isBottom = computed(() => props.position.startsWith('bottom'));
const yDirection = computed(() => (isBottom.value ? 1 : -1));
const yPosition = computed(() => (isBottom.value ? 'bottom' : 'top'));

const containerClass = computed(() =>
  cn(
    sonnerVariants({ position: props.position }),
    isBottom.value ? 'pb-4' : 'pt-4',
    'px-4'
  )
);

const frontToastHeight = computed(() => {
  const frontToast = renderedToasts.value[0];
  if (!frontToast) return 0;

  return getToastHeight(frontToast.id);
});

const containerHeight = computed(() => {
  if (visibleCount.value === 0) return 0;

  const visibleToasts = renderedToasts.value.slice(0, visibleCount.value);

  if (expanded.value) {
    return visibleToasts.reduce((sum, toast, index) => {
      return sum + getToastHeight(toast.id) + (index === 0 ? 0 : props.gap);
    }, 0);
  }

  return frontToastHeight.value + Math.max(visibleCount.value - 1, 0) * props.gap;
});

watch(
  renderedToasts,
  toasts => {
    toasts.forEach(toast => {
      if (!mountedToastIds.value.has(toast.id)) {
        nextTick(() => {
          const mounted = new Set(mountedToastIds.value);
          mounted.add(toast.id);
          mountedToastIds.value = mounted;
        });
      }

      if (toast.delete) {
        startDismissAnimation(toast.id);
        return;
      }

      if (!expanded.value && !removingIds.value.has(toast.id) && !timerMap.has(toast.id)) {
        startTimer(toast);
      }
    });
  },
  { immediate: true }
);

watch(expanded, isExpanded => {
  if (isExpanded) {
    pauseAllTimers();
    return;
  }

  renderedToasts.value.forEach(toast => {
    if (!toast.delete && !removingIds.value.has(toast.id)) {
      startTimer(toast);
    }
  });
});

onUnmounted(() => {
  timerMap.forEach(timeout => clearTimeout(timeout));
  resizeObservers.forEach(observer => observer.disconnect());
});

function getToastKey(id: string | number) {
  return String(id);
}

function getToastHeight(id: string | number) {
  return heights.value[getToastKey(id)] ?? DEFAULT_TOAST_HEIGHT;
}

function getToastIndex(id: string | number) {
  return renderedToasts.value.findIndex(toast => toast.id === id);
}

function getExpandedOffset(index: number) {
  if (index <= 0) return 0;

  return renderedToasts.value.slice(0, index).reduce((sum, toast) => {
    return sum + getToastHeight(toast.id) + props.gap;
  }, 0);
}

function getCollapsedOffset(index: number) {
  return Math.max(index, 0) * props.gap;
}

function getCollapsedScale(index: number) {
  return 1 - Math.min(index, props.visibleToasts - 1) * 0.05;
}

function setToastHeight(id: string | number, height: number) {
  const key = getToastKey(id);
  if (heights.value[key] === height) return;

  heights.value = {
    ...heights.value,
    [key]: height
  };
}

function clearToastHeight(id: string | number) {
  const key = getToastKey(id);
  if (!(key in heights.value)) return;

  const { [key]: _removedHeight, ...nextHeights } = heights.value;
  heights.value = nextHeights;
}

function setRemovalState(id: string | number, offset: number) {
  const key = getToastKey(id);

  removalOffsets.value = {
    ...removalOffsets.value,
    [key]: offset
  };

  removalExpandedStates.value = {
    ...removalExpandedStates.value,
    [key]: expanded.value
  };
}

function clearRemovalState(id: string | number) {
  const key = getToastKey(id);
  const { [key]: _removedOffset, ...nextOffsets } = removalOffsets.value;
  removalOffsets.value = nextOffsets;

  const { [key]: _removedExpandedState, ...nextExpandedStates } = removalExpandedStates.value;
  removalExpandedStates.value = nextExpandedStates;
}

function clearTimer(id: string | number) {
  const timer = timerMap.get(id);
  if (!timer) return;

  clearTimeout(timer);
  timerMap.delete(id);
}

function pauseAllTimers() {
  timerMap.forEach(timeout => clearTimeout(timeout));
  timerMap.clear();
}

function startTimer(toast: SonnerToastT) {
  const duration = toast.duration ?? props.duration;

  if (!duration || duration === Number.POSITIVE_INFINITY || toast.type === 'loading' || expanded.value) return;

  clearTimer(toast.id);

  const timeout = setTimeout(() => {
    toast.onAutoClose?.(toast);
    startDismissAnimation(toast.id);
  }, duration);

  timerMap.set(toast.id, timeout);
}

function cleanupToast(id: string | number) {
  sonnerToasts.value = sonnerToasts.value.filter(toast => toast.id !== id);
  clearTimer(id);
  clearToastHeight(id);
  clearRemovalState(id);

  const mounted = new Set(mountedToastIds.value);
  mounted.delete(id);
  mountedToastIds.value = mounted;

  const removing = new Set(removingIds.value);
  removing.delete(id);
  removingIds.value = removing;

  resizeObservers.get(id)?.disconnect();
  resizeObservers.delete(id);
  observedElements.delete(id);
}

function startDismissAnimation(id: string | number) {
  if (removingIds.value.has(id)) return;

  const index = getToastIndex(id);
  const removing = new Set(removingIds.value);
  removing.add(id);
  removingIds.value = removing;

  setRemovalState(id, getExpandedOffset(index));
  clearTimer(id);

  setTimeout(() => {
    cleanupToast(id);
  }, 400);
}

function deleteToast(id: string | number) {
  startDismissAnimation(id);
}

function getToastUiClass(toast: SonnerToastT) {
  const slots = sonnerToastVariants({ type: toast.type, richColors: toast.richColors ?? props.richColors });

  return {
    toast: cn(slots.toast(), props.ui?.toast),
    title: cn(slots.title(), props.ui?.title),
    description: cn(slots.description(), props.ui?.description),
    icon: cn(slots.icon(), props.ui?.icon),
    close: cn(slots.close(), props.ui?.close),
    action: cn(slots.action(), props.ui?.action),
    cancel: cn(slots.cancel(), props.ui?.cancel)
  };
}

function getToastContentClass(index: number) {
  return cn('flex flex-1 flex-col gap-1 min-w-0 transition-opacity duration-300', index === 0 || expanded.value ? 'opacity-100' : 'opacity-0');
}

function getToastStyle(toast: SonnerToastT) {
  const index = getToastIndex(toast.id);
  const isFront = index === 0;
  const isVisible = index > -1 && index < props.visibleToasts;
  const isRemoving = removingIds.value.has(toast.id);
  const isMounted = mountedToastIds.value.has(toast.id);
  const height = getToastHeight(toast.id);
  const baseExpandedOffset = getExpandedOffset(index);
  const baseCollapsedOffset = getCollapsedOffset(index);
  const removalKey = getToastKey(toast.id);
  const removalOffset = removalOffsets.value[removalKey] ?? baseExpandedOffset;
  const removalExpanded = removalExpandedStates.value[removalKey] ?? expanded.value;
  const collapsedScale = getCollapsedScale(index);

  let translateY = expanded.value ? yDirection.value * baseExpandedOffset : yDirection.value * baseCollapsedOffset;
  let scale = expanded.value ? 1 : collapsedScale;
  let opacity = isVisible ? 1 : 0;
  let pointerEvents: 'auto' | 'none' = isVisible ? 'auto' : 'none';
  const styleHeight = expanded.value || isFront ? height : Math.max(frontToastHeight.value, height);

  if (!isMounted) {
    translateY = yDirection.value * (height + 24);
    scale = 0.96;
    opacity = 0;
  }

  if (isRemoving) {
    pointerEvents = 'none';
    opacity = 0;

    if (removalExpanded) {
      translateY = yDirection.value * (removalOffset + height + props.gap);
      scale = 1;
    } else if (isFront) {
      translateY = yDirection.value * (height + 24);
      scale = 1;
    } else {
      translateY = yDirection.value * (baseCollapsedOffset + 40);
      scale = collapsedScale;
    }
  }

  return {
    position: 'absolute' as const,
    width: '100%',
    [yPosition.value]: '0',
    zIndex: renderedToasts.value.length - index,
    height: `${styleHeight}px`,
    opacity,
    pointerEvents,
    transform: `translateY(${translateY}px) scale(${scale})`,
    transformOrigin: isBottom.value ? 'bottom center' : 'top center',
    transition: 'transform 400ms ease, opacity 400ms ease, height 400ms ease, box-shadow 200ms ease'
  };
}

function onToastRef(toast: SonnerToastT, el: unknown) {
  const id = toast.id;
  const element = el instanceof Element ? el : null;
  const previous = observedElements.get(id);

  if (!element) {
    resizeObservers.get(id)?.disconnect();
    resizeObservers.delete(id);
    observedElements.delete(id);
    return;
  }

  if (previous === element) return;

  resizeObservers.get(id)?.disconnect();
  observedElements.set(id, element);
  setToastHeight(id, element.getBoundingClientRect().height);

  if (typeof ResizeObserver === 'undefined') return;

  const observer = new ResizeObserver(entries => {
    const entry = entries[0];
    if (!entry) return;

    setToastHeight(id, entry.contentRect.height);
  });

  observer.observe(element);
  resizeObservers.set(id, observer);
}

const iconMap: Partial<Record<NonNullable<SonnerToastT['type']>, string>> = {
  success: 'lucide:circle-check',
  error: 'lucide:circle-x',
  info: 'lucide:info',
  warning: 'lucide:circle-alert',
  loading: 'lucide:loader-circle'
};

function getIcon(toast: SonnerToastT) {
  if (!toast.type || toast.type === 'default') return null;

  return iconMap[toast.type] ?? null;
}

function onMouseEnter() {
  hoverExpanded.value = true;
}

function onMouseLeave() {
  hoverExpanded.value = false;
}
</script>

<template>
  <Teleport to="body">
    <section
      :class="containerClass"
      :style="{ height: containerHeight ? `${containerHeight}px` : undefined }"
      aria-label="Notifications"
      aria-live="polite"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <template v-for="toast in renderedToasts" :key="toast.id">
        <div
          :ref="el => onToastRef(toast, el as unknown)"
          role="status"
          :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
          :aria-atomic="true"
          :aria-label="typeof toast.title === 'string' ? toast.title : undefined"
          :data-mounted="mountedToastIds.has(toast.id)"
          :data-visible="getToastIndex(toast.id) < visibleToasts"
          :data-expanded="expanded"
          :data-front="getToastIndex(toast.id) === 0"
          :data-removed="removingIds.has(toast.id)"
          :data-y-position="yPosition"
          :data-type="toast.type ?? 'default'"
          :class="getToastUiClass(toast).toast"
          :style="getToastStyle(toast)"
          tabindex="0"
        >
          <div class="flex gap-3 p-4">
            <slot v-if="toast.icon" name="icon" :toast="toast">
              <component :is="toast.icon" :class="getToastUiClass(toast).icon" />
            </slot>
            <span v-else-if="getIcon(toast)" :class="getToastUiClass(toast).icon">
              <span :class="cn(`i-${getIcon(toast)} size-4 block`, toast.type === 'loading' ? 'animate-spin' : undefined)" />
            </span>

            <div :class="getToastContentClass(getToastIndex(toast.id))">
              <div v-if="toast.title" :class="getToastUiClass(toast).title">
                <template v-if="typeof toast.title === 'string'">{{ toast.title }}</template>
                <component :is="toast.title" v-else />
              </div>

              <div v-if="toast.description" :class="getToastUiClass(toast).description">
                <template v-if="typeof toast.description === 'string'">{{ toast.description }}</template>
                <component :is="toast.description" v-else />
              </div>

              <div v-if="toast.action || toast.cancel" class="mt-2 flex gap-2">
                <button
                  v-if="toast.action"
                  type="button"
                  :class="getToastUiClass(toast).action"
                  @click="toast.action.onClick($event as MouseEvent)"
                >
                  {{ toast.action.label }}
                </button>
                <button
                  v-if="toast.cancel"
                  type="button"
                  :class="getToastUiClass(toast).cancel"
                  @click="toast.cancel.onClick($event as MouseEvent)"
                >
                  {{ toast.cancel.label }}
                </button>
              </div>
            </div>
          </div>

          <button
            v-if="closeButton || toast.dismissible !== false"
            type="button"
            :class="getToastUiClass(toast).close"
            aria-label="Close toast"
            @click="deleteToast(toast.id)"
          >
            <span class="i-lucide:x size-3 block" />
          </button>
        </div>
      </template>
    </section>
  </Teleport>
</template>
