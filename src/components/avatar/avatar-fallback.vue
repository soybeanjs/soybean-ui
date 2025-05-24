<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useAvatarRootContext } from './context';
import type { AvatarFallbackProps } from './types';

const props = defineProps<AvatarFallbackProps>();

const { imageLoadingStatus } = useAvatarRootContext('AvatarFallback');

const canRender = ref(props.delayMs === undefined);
const visible = computed(() => canRender.value && imageLoadingStatus.value !== 'loaded');

watchEffect(onCleanup => {
  if (!props.delayMs) return;

  const timerId = window.setTimeout(() => {
    canRender.value = true;
  }, props.delayMs);

  onCleanup(() => {
    window.clearTimeout(timerId);
  });
});
</script>

<template>
  <span v-if="visible" :class="props.class">
    <slot />
  </span>
</template>
