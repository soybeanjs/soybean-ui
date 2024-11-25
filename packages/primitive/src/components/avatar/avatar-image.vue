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

const props = withDefaults(defineProps<AvatarImagePropsWithPrimitive>(), {
  as: 'img'
});

const emit = defineEmits<AvatarImageEmits>();

const context = injectAvatarRootContext();

const imageLoadingStatus = useImageLoadingStatus(toRef(() => props.src));

function handleLoadingStatusChange(newStatus: ImageLoadingStatus) {
  emit('loadingStatusChange', newStatus);

  if (newStatus !== 'idle') {
    context.updateImageLoadingStatus(newStatus);
  }
}

watch(
  imageLoadingStatus,
  newStatus => {
    handleLoadingStatusChange(newStatus);
  },
  { immediate: true }
);

useForwardExpose();
</script>

<template>
  <Primitive
    v-show="imageLoadingStatus === 'loaded'"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :alt="alt"
    role="img"
    :src="src"
  />
</template>
