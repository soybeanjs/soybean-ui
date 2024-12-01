<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Presence } from '../presence';
import DialogOverlayImpl from './dialog-overlay-impl.vue';
import { injectDialogRootContext } from './context';
import type { DialogOverlayPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogOverlay',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DialogOverlayPropsWithPrimitive>(), {
  forceMount: false
});

const { modal, open } = injectDialogRootContext();

const present = computed(() => props.forceMount || open.value);

const { forwardRef } = useForwardExpose();
</script>

<template>
  <Presence v-if="modal" :present="present">
    <DialogOverlayImpl v-bind="$attrs" :ref="forwardRef" :class="props.class" :as="as" :as-child="asChild">
      <slot />
    </DialogOverlayImpl>
  </Presence>
</template>
