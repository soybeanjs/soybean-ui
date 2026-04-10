<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, useSlots, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  provideDialogUi
} from '@soybeanjs/headless';
import {
  useControllableState,
  useForwardListeners,
  useOmitProps
} from '@soybeanjs/headless/composables';
import { mergeSlotVariants, provideSizeContext } from '@/theme';
import { bottomSheetVariants } from './variants';
import type { BottomSheetEmits, BottomSheetProps } from './types';

defineOptions({
  name: 'SBottomSheet'
});

const DRAG_RESET_DURATION = 200;
const VELOCITY_CLOSE_THRESHOLD = 0.75;
const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'summary',
  'textarea',
  '[contenteditable=true]',
  '[data-bottom-sheet-no-drag]',
  '[role=button]',
  '[role=link]'
].join(',');

const props = withDefaults(defineProps<BottomSheetProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
  showHandle: true,
  handleOnly: false,
  closeThreshold: 0.35
});

const emit = defineEmits<BottomSheetEmits>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'title',
  'description',
  'showHandle',
  'handleOnly',
  'closeThreshold',
  'open',
  'defaultOpen',
  'modal',
  'triggerProps',
  'contentProps',
  'headerProps',
  'footerProps',
  'titleProps',
  'descriptionProps',
  'overlayProps',
  'portalProps'
]);

const slots = useSlots();

const listeners = useForwardListeners(emit);

const open = useControllableState(
  () => props.open,
  value => emit('update:open', value ?? false),
  props.defaultOpen
);

const ui = computed(() => {
  const variants = bottomSheetVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { content: props.class });
});

const hasHeader = computed(
  () => Boolean(slots.header || slots.title || slots.description || props.title || props.description)
);

const dragPointerId = shallowRef<number>();
const dragStartY = shallowRef(0);
const dragStartTime = shallowRef(0);
const dragOffset = shallowRef(0);
const dragContentElement = shallowRef<HTMLElement>();
const isDragging = shallowRef(false);
const isResetting = shallowRef(false);
const resetTimer = shallowRef<number>();

const contentStyle = computed<CSSProperties | undefined>(() => {
  if (!isDragging.value && !isResetting.value && dragOffset.value === 0) return undefined;

  return {
    transform: `translate3d(0, ${dragOffset.value}px, 0)`,
    userSelect: 'none',
    transition: isDragging.value
      ? 'none'
      : `transform ${DRAG_RESET_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1)`
  };
});

function clearResetTimer() {
  if (resetTimer.value === undefined) return;

  window.clearTimeout(resetTimer.value);
  resetTimer.value = undefined;
}

function removeDragListeners() {
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
  document.removeEventListener('pointercancel', onPointerCancel);
}

function resetDragState() {
  clearResetTimer();
  removeDragListeners();

  if (dragPointerId.value !== undefined) {
    dragContentElement.value?.releasePointerCapture?.(dragPointerId.value);
  }

  dragPointerId.value = undefined;
  dragStartY.value = 0;
  dragStartTime.value = 0;
  dragOffset.value = 0;
  dragContentElement.value = undefined;
  isDragging.value = false;
  isResetting.value = false;
}

function animateDragReset() {
  if (dragOffset.value === 0) {
    resetDragState();
    return;
  }

  clearResetTimer();
  isDragging.value = false;
  isResetting.value = true;

  window.requestAnimationFrame(() => {
    dragOffset.value = 0;
  });

  resetTimer.value = window.setTimeout(() => {
    isResetting.value = false;
    dragContentElement.value = undefined;
    dragPointerId.value = undefined;
    resetTimer.value = undefined;
  }, DRAG_RESET_DURATION);
}

function shouldStartDrag(target: HTMLElement | null, contentElement: HTMLElement) {
  if (!target) return false;

  const isHandleTarget = Boolean(target.closest('[data-bottom-sheet-handle]'));

  if (props.handleOnly) {
    return isHandleTarget;
  }

  if (target.closest(INTERACTIVE_SELECTOR) && !isHandleTarget) {
    return false;
  }

  const mainElement = contentElement.querySelector<HTMLElement>('[data-bottom-sheet-scroll]');

  if (!mainElement?.contains(target)) {
    return true;
  }

  return isHandleTarget || mainElement.scrollTop <= 0;
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) return;

  const target = event.target instanceof HTMLElement ? event.target : null;
  const contentElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;

  if (!target || !contentElement || !shouldStartDrag(target, contentElement)) {
    return;
  }

  clearResetTimer();
  removeDragListeners();

  dragPointerId.value = event.pointerId;
  dragStartY.value = event.clientY;
  dragStartTime.value = Date.now();
  dragOffset.value = 0;
  dragContentElement.value = contentElement;
  isDragging.value = true;
  isResetting.value = false;

  contentElement.setPointerCapture?.(event.pointerId);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerCancel);
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value || event.pointerId !== dragPointerId.value) return;

  dragOffset.value = Math.max(event.clientY - dragStartY.value, 0);

  if (dragOffset.value > 0) {
    event.preventDefault();
  }
}

function finishDrag(shouldClose: boolean) {
  removeDragListeners();

  if (shouldClose) {
    resetDragState();
    open.value = false;
    return;
  }

  animateDragReset();
}

function onPointerUp(event: PointerEvent) {
  if (!isDragging.value || event.pointerId !== dragPointerId.value) return;

  const contentElement = dragContentElement.value;
  const height = contentElement?.getBoundingClientRect().height ?? 0;
  const timeElapsed = Math.max(Date.now() - dragStartTime.value, 1);
  const velocity = dragOffset.value / timeElapsed;
  const shouldClose = height > 0
    && (dragOffset.value >= height * props.closeThreshold || velocity >= VELOCITY_CLOSE_THRESHOLD);

  finishDrag(shouldClose);
}

function onPointerCancel(event: PointerEvent) {
  if (!isDragging.value || event.pointerId !== dragPointerId.value) return;

  finishDrag(false);
}

provideDialogUi(ui);
provideSizeContext(() => props.size);

watch(
  () => open.value,
  () => {
    resetDragState();
  }
);

onBeforeUnmount(() => {
  resetDragState();
});
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="forwardedProps" :open="open" :modal="modal" @update:open="open = $event">
    <DialogTrigger v-bind="triggerProps" :size="size" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal v-bind="portalProps">
      <DialogOverlay v-bind="overlayProps" />
      <DialogContent
        v-bind="contentProps"
        :style="contentStyle"
        :data-dragging="isDragging || isResetting ? 'true' : undefined"
        v-on="listeners"
        @pointerdown="onPointerDown"
      >
        <div v-if="showHandle" :class="ui.handle" data-bottom-sheet-handle>
          <slot name="handle" v-bind="slotProps">
            <div :class="ui.handleIndicator" aria-hidden="true" />
          </slot>
        </div>
        <DialogHeader v-if="hasHeader" v-bind="headerProps">
          <slot v-if="$slots.header" name="header" v-bind="slotProps" />
          <template v-else>
            <DialogTitle v-if="$slots.title || title" v-bind="titleProps">
              <slot name="title" v-bind="slotProps">{{ title }}</slot>
            </DialogTitle>
            <DialogDescription v-if="$slots.description || description" v-bind="descriptionProps">
              <slot name="description" v-bind="slotProps">{{ description }}</slot>
            </DialogDescription>
          </template>
        </DialogHeader>
        <div :class="ui.main" data-bottom-sheet-scroll>
          <slot v-bind="slotProps" />
        </div>
        <DialogFooter v-if="$slots.footer" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps" />
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
