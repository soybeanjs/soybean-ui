<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose } from '../../composables';
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

const open = defineModel<boolean>('open', { default: props.defaultOpen });
</script>

<template>
  <Presence :present="forceMount || open">
    <ToastRootImpl
      :ref="forwardRef"
      v-slot="{ remaining, duration: _duration }"
      :open="open"
      :type="type"
      :as
      :as-child
      :duration="duration"
      v-bind="$attrs"
      @close="open = false"
      @pause="emit('pause')"
      @resume="emit('resume')"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @swipe-start="
        event => {
          emit('swipeStart', event);
          (event.currentTarget as HTMLElement).setAttribute('data-swipe', 'start');
        }
      "
      @swipe-move="
        event => {
          const { x, y } = event.detail.delta;
          const target = event.currentTarget as HTMLElement;
          target.setAttribute('data-swipe', 'move');
          target.style.setProperty('--soybean-toast-swipe-move-x', `${x}px`);
          target.style.setProperty('--soybean-toast-swipe-move-y', `${y}px`);
        }
      "
      @swipe-cancel="
        event => {
          const target = event.currentTarget as HTMLElement;
          target.setAttribute('data-swipe', 'cancel');
          target.style.removeProperty('--soybean-toast-swipe-move-x');
          target.style.removeProperty('--soybean-toast-swipe-move-y');
          target.style.removeProperty('--soybean-toast-swipe-end-x');
          target.style.removeProperty('--soybean-toast-swipe-end-y');
        }
      "
      @swipe-end="
        event => {
          const { x, y } = event.detail.delta;
          const target = event.currentTarget as HTMLElement;
          target.setAttribute('data-swipe', 'end');
          target.style.removeProperty('--soybean-toast-swipe-move-x');
          target.style.removeProperty('--soybean-toast-swipe-move-y');
          target.style.setProperty('--soybean-toast-swipe-end-x', `${x}px`);
          target.style.setProperty('--soybean-toast-swipe-end-y', `${y}px`);
          open = false;
        }
      "
    >
      <slot :remaining="remaining" :duration="_duration" :open="open" />
    </ToastRootImpl>
  </Presence>
</template>
