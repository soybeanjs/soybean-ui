<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, shallowRef, watch } from 'vue';
import { provideSonnerUi, sonnerToasts } from '@soybeanjs/headless';
import { cn, mergeSlotVariants } from '@/theme';
import { sonnerVariants, sonnerToastVariants } from './variants';
import type { SonnerProps } from './types';
import type { SonnerToastT } from '@soybeanjs/headless/sonner';

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

// ─── UI ──────────────────────────────────────────────────────────────────────

const ui = computed(() => {
  const variants = sonnerToastVariants({ type: 'default', richColors: props.richColors });

  return mergeSlotVariants(variants, props.ui, { toast: props.class });
});

provideSonnerUi(ui);

// ─── State ───────────────────────────────────────────────────────────────────

const expanded = shallowRef(props.expand);
const interacting = shallowRef(false);
const heights = ref<{ toastId: string | number; height: number }[]>([]);

// Track per-toast mounted state for enter animation
const mountedToastIds = shallowRef<Set<string | number>>(new Set());

// Track timer handles per toast
const timerMap = new Map<string | number, ReturnType<typeof setTimeout>>();

// Track toasts to remove after exit animation
const removingIds = shallowRef<Set<string | number>>(new Set());

const isBottom = computed(() => props.position.startsWith('bottom'));
const liftFactor = computed(() => (isBottom.value ? 1 : -1));

const containerClass = computed(() =>
  cn(
    sonnerVariants({ position: props.position }),
    isBottom.value ? 'pb-4' : 'pt-4',
    'px-4'
  )
);

// ─── Derived toast list ───────────────────────────────────────────────────────

/** Active (non-deleted) toasts to render */
const activeToasts = computed(() => sonnerToasts.value.filter(t => !t.delete));

// ─── Height tracking ──────────────────────────────────────────────────────────

function setHeight(id: string | number, height: number) {
  const existing = heights.value.find(h => h.toastId === id);

  if (existing) {
    if (existing.height === height) return; // Avoid triggering re-render if unchanged
    heights.value = heights.value.map(h => (h.toastId === id ? { ...h, height } : h));
  } else {
    heights.value = [{ toastId: id, height }, ...heights.value];
  }
}

function removeHeight(id: string | number) {
  heights.value = heights.value.filter(h => h.toastId !== id);
}

// ─── Timer management ─────────────────────────────────────────────────────────

function startTimer(toast: SonnerToastT) {
  const duration = toast.duration ?? props.duration;

  if (!duration || duration === Number.POSITIVE_INFINITY || toast.type === 'loading') return;

  clearTimer(toast.id);

  timerMap.set(
    toast.id,
    setTimeout(() => {
      toast.onAutoClose?.(toast);
      startDismissAnimation(toast.id);
    }, duration)
  );
}

function clearTimer(id: string | number) {
  const handle = timerMap.get(id);
  if (handle !== undefined) {
    clearTimeout(handle);
    timerMap.delete(id);
  }
}

function pauseAllTimers() {
  timerMap.forEach((_, id) => clearTimer(id));
}

function resumeAllTimers() {
  activeToasts.value.forEach(toast => {
    if (!removingIds.value.has(toast.id)) {
      startTimer(toast);
    }
  });
}

// ─── Toast lifecycle ──────────────────────────────────────────────────────────

function startDismissAnimation(id: string | number) {
  if (removingIds.value.has(id)) return;

  clearTimer(id);

  const removing = new Set(removingIds.value);
  removing.add(id);
  removingIds.value = removing;

  setTimeout(() => {
    sonnerToasts.value = sonnerToasts.value.filter(t => t.id !== id);
    removeHeight(id);

    const m = new Set(mountedToastIds.value);
    m.delete(id);
    mountedToastIds.value = m;

    const r = new Set(removingIds.value);
    r.delete(id);
    removingIds.value = r;
  }, 350);
}

function deleteToast(id: string | number) {
  startDismissAnimation(id);
}

// Watch for new toasts → mark as mounted after next tick (for enter animation)
watch(
  activeToasts,
  toasts => {
    toasts.forEach(toast => {
      if (!mountedToastIds.value.has(toast.id)) {
        nextTick(() => {
          const m = new Set(mountedToastIds.value);
          m.add(toast.id);
          mountedToastIds.value = m;
        });
      }

      if (!timerMap.has(toast.id) && !removingIds.value.has(toast.id) && !expanded.value && !interacting.value) {
        startTimer(toast);
      }
    });
  },
  { immediate: true }
);

// Watch for externally dismissed toasts (e.g., via useSonner().dismiss())
watch(sonnerToasts, toasts => {
  toasts.forEach(toast => {
    if (toast.delete) {
      startDismissAnimation(toast.id);
    }
  });
});

watch(expanded, val => {
  if (val) {
    pauseAllTimers();
  } else {
    resumeAllTimers();
  }
});

onUnmounted(() => {
  timerMap.forEach((_, id) => clearTimer(id));
});

// ─── Per-toast computed helpers ───────────────────────────────────────────────

function getToastIndex(id: string | number) {
  return activeToasts.value.findIndex(t => t.id === id);
}

function getOffset(index: number): number {
  if (expanded.value) {
    return heights.value.slice(0, index).reduce((sum, h) => sum + h.height + props.gap, 0);
  }

  return index * 14;
}

function getToastStyle(toast: SonnerToastT) {
  const index = getToastIndex(toast.id);
  const clampedIndex = Math.min(index, props.visibleToasts - 1);
  const offset = getOffset(index);
  const isVisible = index < props.visibleToasts;

  const scale = expanded.value ? 1 : 1 - clampedIndex * 0.05;
  const translateY = liftFactor.value * offset;

  return {
    '--index': index,
    '--z-index': activeToasts.value.length - index,
    position: 'absolute' as const,
    bottom: isBottom.value ? '0' : undefined,
    top: !isBottom.value ? '0' : undefined,
    width: '100%',
    zIndex: activeToasts.value.length - index,
    transform: `translateY(${translateY}px) scale(${scale})`,
    transformOrigin: isBottom.value ? 'bottom center' : 'top center',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 0.3s ease, opacity 0.3s ease, scale 0.3s ease'
  };
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

function onToastRef(toast: SonnerToastT, el: unknown) {
  if (!el || typeof el !== 'object') return;
  const element = el as { getBoundingClientRect?: () => DOMRect };

  if (typeof element.getBoundingClientRect === 'function') {
    setHeight(toast.id, element.getBoundingClientRect().height);
  }
}

const iconMap: Record<string, string> = {
  success: 'lucide:circle-check',
  error: 'lucide:circle-x',
  info: 'lucide:info',
  warning: 'lucide:circle-alert',
  loading: 'lucide:loader-circle'
};

function getIcon(toast: SonnerToastT): string | null {
  if (!toast.type || toast.type === 'default') return null;
  return iconMap[toast.type] ?? null;
}

// ─── Interaction handlers ─────────────────────────────────────────────────────

function onMouseEnter() {
  expanded.value = true;
  interacting.value = true;
  pauseAllTimers();
}

function onMouseLeave() {
  interacting.value = false;
  if (!props.expand) {
    expanded.value = false;
  }
  resumeAllTimers();
}
</script>

<template>
  <Teleport to="body">
    <section
      :class="containerClass"
      :style="{ height: expanded ? `${heights.reduce((s, h) => s + h.height + gap, 0)}px` : '96px' }"
      aria-label="Notifications"
      aria-live="polite"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <template v-for="toast in activeToasts" :key="toast.id">
        <div
          :ref="(el) => onToastRef(toast, el)"
          role="status"
          :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
          :aria-atomic="true"
          :aria-label="typeof toast.title === 'string' ? toast.title : undefined"
          :data-mounted="mountedToastIds.has(toast.id)"
          :data-type="toast.type ?? 'default'"
          :data-removing="removingIds.has(toast.id)"
          :class="getToastUiClass(toast).toast"
          :style="getToastStyle(toast)"
          tabindex="0"
        >
          <div class="flex gap-3 p-4">
            <slot v-if="toast.icon" name="icon" :toast="toast">
              <component :is="toast.icon" :class="getToastUiClass(toast).icon" />
            </slot>
            <span v-else-if="getIcon(toast)" :class="getToastUiClass(toast).icon">
              <span :class="`i-${getIcon(toast)} size-4 block`" />
            </span>

            <div class="flex flex-1 flex-col gap-1 min-w-0">
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
