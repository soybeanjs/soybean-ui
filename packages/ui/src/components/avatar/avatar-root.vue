<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AvatarRoot, useForwardProps } from 'radix-vue';
import { avatarVariants, cn } from '@soybean-unify/ui-variants';
import type { AvatarRootProps } from './types';

defineOptions({
  name: 'SAvatarRoot'
});

const props = defineProps<AvatarRootProps>();

const delegatedProps = reactiveOmit(props, ['class', 'size']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { root } = avatarVariants({ size: props.size });

  return cn(root(), props.class);
});
</script>

<template>
  <AvatarRoot v-bind="forwardedProps" :class="cls">
    <slot />
  </AvatarRoot>
</template>

<style scoped></style>
