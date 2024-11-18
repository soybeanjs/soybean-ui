<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import type { ImageLoadingStatus } from '../../types';
import { injectAvatarRootContext } from './context';
import type { AvatarFallbackPropsWithPrimitive } from './types';

defineOptions({
  name: 'AvatarFallback'
});

const { class: className, as = 'span', delayMs = 0 } = defineProps<AvatarFallbackPropsWithPrimitive>();

const { imageLoadingStatus } = injectAvatarRootContext();

const canRender = ref(false);

const visible = computed(() => canRender.value && imageLoadingStatus.value !== 'loaded');

let timeout: ReturnType<typeof setTimeout>;

function onImageLoadingStatusChange(newStatus: ImageLoadingStatus) {
  if (newStatus === 'loading') {
    canRender.value = false;
    if (delayMs) {
      timeout = setTimeout(() => {
        canRender.value = true;
        clearTimeout(timeout);
      }, delayMs);
    } else {
      canRender.value = true;
    }
  }
}

useForwardExpose();

watch(
  imageLoadingStatus,
  value => {
    onImageLoadingStatusChange(value);
  },
  { immediate: true }
);
</script>

<template>
  <Primitive v-if="visible" :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
