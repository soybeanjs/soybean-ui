<script setup lang="ts">
import { computed } from 'vue';
import { AvatarRoot } from '@soybean-ui/primitives';
import { avatarVariants, cn } from '@soybean-ui/variants';
import type { AvatarRootProps } from '../types';

defineOptions({
  name: 'SAvatarRoot'
});

const { class: cls, size } = defineProps<AvatarRootProps>();

const mergedCls = computed(() => {
  const { root } = avatarVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <AvatarRoot :class="mergedCls">
    <slot />
  </AvatarRoot>
</template>
