<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { isClient } from '@vueuse/shared';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectAvatarRootContext } from './context';
import type { AvatarFallbackPropsWithPrimitive } from './types';

defineOptions({
  name: 'AvatarFallback'
});

const props = withDefaults(defineProps<AvatarFallbackPropsWithPrimitive>(), {
  as: 'span'
});

const { imageLoadingStatus } = injectAvatarRootContext();

const canRender = ref(props.delayMs === undefined);

const visible = computed(() => canRender.value && imageLoadingStatus.value !== 'loaded');

watchEffect(onCleanup => {
  if (props.delayMs && isClient) {
    const timerId = window.setTimeout(() => {
      canRender.value = true;
    }, props.delayMs);

    onCleanup(() => {
      window.clearTimeout(timerId);
    });
  }
});

useForwardExpose();
</script>

<template>
  <Primitive v-if="visible" :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
