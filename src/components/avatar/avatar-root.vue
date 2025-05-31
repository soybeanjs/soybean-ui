<script setup lang="ts">
import { provideAvatarRootContext } from './context';
import type { AvatarRootProps } from './types';

defineOptions({
  name: 'AvatarRoot'
});

const props = defineProps<AvatarRootProps>();

provideAvatarRootContext();
</script>

<template>
  <span v-bind="props">
    <slot />
  </span>
</template>
