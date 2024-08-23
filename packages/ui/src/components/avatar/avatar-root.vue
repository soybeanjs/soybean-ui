<script setup lang="ts">
import { computed } from 'vue';
import { AvatarRoot } from 'radix-vue';
import { avatarVariants, cn } from '@soybean-unify/ui-variants';
import type { AvatarRootProps } from './types';

defineOptions({
  name: 'SAvatarRoot'
});

const props = defineProps<AvatarRootProps>();

const cls = computed(() => {
  const { root } = avatarVariants({ size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <AvatarRoot :as="as" :as-child="asChild" :class="cls">
    <slot />
  </AvatarRoot>
</template>

<style scoped></style>
