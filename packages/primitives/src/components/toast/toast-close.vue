<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectToastRootContext } from './context';
import ToastAnnounceExclude from './toast-announce-exclude.vue';
import type { ToastClosePropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastClose',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastClosePropsWithPrimitive>(), {
  as: 'button'
});

const { onClose } = injectToastRootContext();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToastAnnounceExclude as-child>
    <Primitive v-bind="props" :ref="forwardRef" :type="tag" @click="onClose">
      <slot />
    </Primitive>
  </ToastAnnounceExclude>
</template>
