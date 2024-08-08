<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AvatarFallback, useForwardProps } from 'radix-vue';
import { avatarVariants, cn } from '@soybean-unify/ui-variants';
import type { AvatarFallbackProps } from './types';

defineOptions({
  name: 'SAvatarFallback'
});

const props = defineProps<AvatarFallbackProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { fallback } = avatarVariants();

  return cn(fallback(), props.class);
});
</script>

<template>
  <AvatarFallback v-bind="forwardedProps" :class="cls">
    <slot>{{ label }}</slot>
  </AvatarFallback>
</template>

<style scoped></style>
