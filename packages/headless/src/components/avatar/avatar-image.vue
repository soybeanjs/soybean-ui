<script setup lang="ts">
import { watch } from 'vue';
import { transformPropsToContext } from '../../shared';
import { useImageLoadingStatus } from '../../composables';
import { useAvatarRootContext, useAvatarUi } from './context';
import type { AvatarImageProps, AvatarImageEmits } from './types';

defineOptions({
  name: 'AvatarImage'
});

const props = defineProps<AvatarImageProps>();

const emit = defineEmits<AvatarImageEmits>();

const cls = useAvatarUi('image');

const { updateImageLoadingStatus } = useAvatarRootContext('AvatarImage');

const imageLoadingStatus = useImageLoadingStatus(transformPropsToContext(props));

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
    data-soybean-avatar-image
    :class="cls"
    :src="src"
    :referrerpolicy="referrerpolicy"
    :crossorigin="crossorigin"
    role="img"
  />
</template>
