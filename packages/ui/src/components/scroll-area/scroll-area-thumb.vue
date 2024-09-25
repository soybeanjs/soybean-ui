<script setup lang="ts">
import { ScrollAreaThumb } from 'radix-vue';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaThumbProps } from './types';

defineOptions({
  name: 'SScrollAreaThumb'
});

const { class: cls } = defineProps<ScrollAreaThumbProps>();

const { thumb } = scrollAreaVariants();
</script>

<template>
  <ScrollAreaThumb :class="cn(thumb(), cls)">
    <slot />
  </ScrollAreaThumb>
</template>

<style scoped></style>
