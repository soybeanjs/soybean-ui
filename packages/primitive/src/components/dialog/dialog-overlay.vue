<script setup lang="ts">
import { computed } from 'vue';
import { Presence } from '../presence';
import { useForwardExpose } from '../../composables';
import DialogOverlayImpl from './dialog-overlay-impl.vue';
import { injectDialogRootContext } from './context';
import type { DialogOverlayPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogOverlay',
  inheritAttrs: false
});

const { class: className, forceMount = false } = defineProps<DialogOverlayPropsWithPrimitive>();

const { modal, open } = injectDialogRootContext();

const present = computed(() => forceMount || open.value);

const { forwardRef } = useForwardExpose();
</script>

<template>
  <Presence v-if="modal" :present>
    <DialogOverlayImpl v-bind="$attrs" :ref="forwardRef" :class="className" :as :as-child>
      <slot />
    </DialogOverlayImpl>
  </Presence>
</template>
