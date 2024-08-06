<script setup lang="ts">
import { AspectRatio } from 'radix-vue';
import type { AspectRatioProps } from './types';

defineOptions({
  name: 'SAspectRatio'
});

const props = defineProps<AspectRatioProps>();
</script>

<template>
  <AspectRatio v-bind="props">
    <slot />
  </AspectRatio>
</template>
