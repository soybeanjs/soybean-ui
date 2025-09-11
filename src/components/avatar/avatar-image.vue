<script setup lang="ts">
import { computed, watch } from 'vue';
import { useImageLoadingStatus } from '../../composables';
import { useAvatarRootContext, useAvatarThemeContext } from './context';
import type { AvatarImageEmits, AvatarImageProps } from './types';

defineOptions({
  name: 'AvatarImage'
});

const props = defineProps<AvatarImageProps>();

const emit = defineEmits<AvatarImageEmits>();

const themeContext = useAvatarThemeContext();

const cls = computed(() => themeContext?.ui?.value?.image);

const { updateImageLoadingStatus } = useAvatarRootContext('AvatarImage');

const imageLoadingStatus = useImageLoadingStatus(() => props.src, {
  referrerPolicy: () => props.referrerpolicy,
  crossOrigin: () => props.crossorigin
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
  <img v-show="imageLoadingStatus === 'loaded'" v-bind="props" :class="cls" role="img" />
</template>
