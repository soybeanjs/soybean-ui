<script setup lang="ts">
import { ref } from 'vue';
import { useForwardExpose } from '../../composables';
import type { ImageLoadingStatus } from '../../types';
import { Primitive } from '../primitive';
import { provideAvatarRootContext } from './context';
import type { AvatarRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'AvatarRoot',
  inheritAttrs: false
});

const props = defineProps<AvatarRootPropsWithPrimitive>();

provideAvatarRootContext({
  imageLoadingStatus: ref<ImageLoadingStatus>('idle')
});

useForwardExpose();
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
