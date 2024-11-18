<script setup lang="ts">
import { ref } from 'vue';
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import type { ImageLoadingStatus } from '../../types';
import { provideAvatarRootContext } from './context';
import type { AvatarRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'AvatarRoot',
  inheritAttrs: false
});

const { class: className } = defineProps<AvatarRootPropsWithPrimitive>();

provideAvatarRootContext({
  imageLoadingStatus: ref<ImageLoadingStatus>('loading')
});

useForwardExpose();
</script>

<template>
  <Primitive :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
