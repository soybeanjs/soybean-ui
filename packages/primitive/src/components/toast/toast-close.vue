<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import ToastAnnounceExclude from './toast-announce-exclude.vue';
import { injectToastRootContext } from './toast-root-impl.vue';

export interface ToastCloseProps extends PrimitiveProps {}

const props = withDefaults(defineProps<ToastCloseProps>(), {
  as: 'button'
});

const rootContext = injectToastRootContext();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToastAnnounceExclude as-child>
    <Primitive
      v-bind="props"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined"
      @click="rootContext.onClose()"
    >
      <slot />
    </Primitive>
  </ToastAnnounceExclude>
</template>
