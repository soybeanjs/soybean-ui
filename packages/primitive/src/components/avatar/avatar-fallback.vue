<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useForwardExpose } from '../../composables';
import type { ImageLoadingStatus } from '../../types';
import { Primitive } from '../primitive';
import { injectAvatarRootContext } from './context';
import type { AvatarFallbackPropsWithPrimitive } from './types';

defineOptions({
  name: 'AvatarFallback'
});

const props = withDefaults(defineProps<AvatarFallbackPropsWithPrimitive>(), {
  as: 'span',
  delayMs: 0
});

const { imageLoadingStatus } = injectAvatarRootContext();

const canRender = ref(false);

const visible = computed(() => canRender.value && imageLoadingStatus.value !== 'loaded');

let timeout: ReturnType<typeof setTimeout>;

function onImageLoadingStatusChange(newStatus: ImageLoadingStatus) {
  if (newStatus === 'loading') {
    canRender.value = false;
    if (props.delayMs) {
      timeout = setTimeout(() => {
        canRender.value = true;
        clearTimeout(timeout);
      }, props.delayMs);
    } else {
      canRender.value = true;
    }
  }
}

watch(
  imageLoadingStatus,
  value => {
    onImageLoadingStatusChange(value);
  },
  { immediate: true }
);

useForwardExpose();
</script>

<template>
  <Primitive v-if="visible" :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
