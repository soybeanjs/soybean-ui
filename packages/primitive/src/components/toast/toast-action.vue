<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import type { ToastActionPropsWithPrimitive } from './types';
import ToastAnnounceExclude from './toast-announce-exclude.vue';
import ToastClose from './toast-close.vue';

defineOptions({
  name: 'ToastAction'
});

const props = withDefaults(defineProps<ToastActionPropsWithPrimitive>(), {
  as: 'button'
});

if (!props.altText) {
  throw new Error('Missing prop `altText` expected on `ToastAction`');
}

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToastAnnounceExclude v-if="altText" :alt-text="altText" as-child>
    <ToastClose :ref="forwardRef" :class="props.class" :as="as" :as-child="asChild">
      <slot />
    </ToastClose>
  </ToastAnnounceExclude>
</template>
