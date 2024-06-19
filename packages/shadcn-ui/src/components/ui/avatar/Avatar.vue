<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AvatarRoot } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { type AvatarVariants, avatarVariant } from '.';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
    size?: AvatarVariants['size'];
    shape?: AvatarVariants['shape'];
  }>(),
  {
    class: '',
    size: 'sm',
    shape: 'circle'
  }
);
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
