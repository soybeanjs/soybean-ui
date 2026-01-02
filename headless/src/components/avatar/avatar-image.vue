<script setup lang="ts">
import { watch } from 'vue';
import { useImageLoadingStatus } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { useAvatarRootContext, useAvatarUi } from './context';
import type { AvatarImageEmits, AvatarImageProps } from './types';

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
    :class="cls"
    :src="src"
    :referrerpolicy="referrerpolicy"
    :crossorigin="crossorigin"
    role="img"
  />
</template>
