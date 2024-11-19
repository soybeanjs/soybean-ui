<script setup lang="ts">
import { toRef, watch } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose, useImageLoadingStatus } from '../../composables';
import type { ImageLoadingStatus } from '../../types';
import { injectAvatarRootContext } from './context';
import type { AvatarImageEmits, AvatarImagePropsWithPrimitive } from './types';

defineOptions({
  name: 'AvatarImage',
  inheritAttrs: false
});

const { class: className, as = 'img', src } = defineProps<AvatarImagePropsWithPrimitive>();

const emit = defineEmits<AvatarImageEmits>();

const context = injectAvatarRootContext();

const imageLoadingStatus = useImageLoadingStatus(toRef(() => src));

function handleLoadingStatusChange(newStatus: ImageLoadingStatus) {
  emit('loadingStatusChange', newStatus);

  if (newStatus !== 'idle') {
    context.updateImageLoadingStatus(newStatus);
  }
}

useForwardExpose();

watch(
  imageLoadingStatus,
  newStatus => {
    handleLoadingStatusChange(newStatus);
  },
  { immediate: true }
);
</script>

<template>
  <Primitive v-show="imageLoadingStatus === 'loaded'" :class="className" role="img" :as :as-child :src :alt />
</template>
