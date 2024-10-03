<script setup lang="ts">
import { AspectRatio, useForwardProps } from 'radix-vue';
import type { AspectRatioProps } from './types';

defineOptions({
  name: 'SAspectRatio'
});

const props = defineProps<AspectRatioProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <AspectRatio v-bind="forwardedProps">
    <slot />
  </AspectRatio>
</template>
