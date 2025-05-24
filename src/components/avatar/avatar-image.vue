<script setup lang="ts">
import { watch } from 'vue';
import { useImageLoadingStatus } from '../../composables';
import { useAvatarRootContext } from './context';
import type { AvatarImageEmits, AvatarImageProps } from './types';

defineOptions({
  name: 'AvatarImage'
});

const props = defineProps<AvatarImageProps>();

const emit = defineEmits<AvatarImageEmits>();

const { updateImageLoadingStatus } = useAvatarRootContext('AvatarImage');

const imageLoadingStatus = useImageLoadingStatus(() => props.src, {
  referrerPolicy: () => props.referrerPolicy,
  crossOrigin: () => props.crossOrigin
});

watch(
  imageLoadingStatus,
  newValue => {
    emit('loadingStatusChange', newValue);
    if (newValue !== 'idle') {
      updateImageLoadingStatus(newValue);
    }
  },
  { immediate: true }
);
</script>

<template>
  <img
    v-show="imageLoadingStatus === 'loaded'"
    :class="props.class"
    role="img"
    :src="src"
    :referrerpolicy="referrerPolicy"
    :crossorigin="crossOrigin"
  />
</template>
