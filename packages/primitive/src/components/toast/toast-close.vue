<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectToastRootContext } from './context';
import type { ToastClosePropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastClose',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastClosePropsWithPrimitive>(), {
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
