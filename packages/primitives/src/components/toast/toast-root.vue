<script setup lang="ts">
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import type { SwipeEvent } from '../../types';
import { Presence } from '../presence';
import ToastRootImpl from './toast-root-impl.vue';
import type { ToastRootEmits, ToastRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastRootPropsWithPrimitive>(), {
  type: 'foreground',
  open: undefined,
  defaultOpen: true,
  as: 'li'
});

const emit = defineEmits<ToastRootEmits>();

const { forwardRef } = useForwardExpose();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

function onSwipeStart(event: SwipeEvent) {
  emit('swipeStart', event);
  (event.currentTarget as HTMLElement).setAttribute('data-swipe', 'start');
}

function onSwipeMove(event: SwipeEvent) {
  emit('swipeMove', event);
  const { x, y } = event.detail.delta;
  const target = event.currentTarget as HTMLElement;
  target.setAttribute('data-swipe', 'move');
  target.style.setProperty('--soybean-toast-swipe-move-x', `${x}px`);
  target.style.setProperty('--soybean-toast-swipe-move-y', `${y}px`);
}

function onSwipeCancel(event: SwipeEvent) {
  emit('swipeCancel', event);
  const target = event.currentTarget as HTMLElement;
  target.setAttribute('data-swipe', 'cancel');
  target.style.removeProperty('--soybean-toast-swipe-move-x');
  target.style.removeProperty('--soybean-toast-swipe-move-y');
  target.style.removeProperty('--soybean-toast-swipe-end-x');
  target.style.removeProperty('--soybean-toast-swipe-end-y');
}

function onSwipeEnd(event: SwipeEvent) {
  emit('swipeEnd', event);
  const { x, y } = event.detail.delta;
  const target = event.currentTarget as HTMLElement;
  target.setAttribute('data-swipe', 'end');
  target.style.removeProperty('--soybean-toast-swipe-move-x');
  target.style.removeProperty('--soybean-toast-swipe-move-y');
  target.style.setProperty('--soybean-toast-swipe-end-x', `${x}px`);
  target.style.setProperty('--soybean-toast-swipe-end-y', `${y}px`);
  open.value = false;
}
</script>

<template>
  <Presence :present="forceMount || open">
    <ToastRootImpl
      :ref="forwardRef"
      v-bind="$attrs"
      v-slot="{ remaining, duration: _duration }"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :duration="duration"
      :open="open"
      :type="type"
      @close="open = false"
      @pause="emit('pause')"
      @resume="emit('resume')"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @swipe-start="onSwipeStart"
      @swipe-move="onSwipeMove"
      @swipe-cancel="onSwipeCancel"
      @swipe-end="onSwipeEnd"
    >
      <slot :remaining="remaining" :duration="_duration" :open="open" />
    </ToastRootImpl>
  </Presence>
</template>
