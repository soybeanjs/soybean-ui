<script setup lang="ts">
import { computed } from 'vue';
import { ScrollAreaThumb } from '@soybean-ui/primitive';
import { cn, scrollAreaVariants } from '@soybean-ui/variants';
import type { ScrollAreaThumbProps } from './types';

defineOptions({
  name: 'SScrollAreaThumb'
});

const { class: cls } = defineProps<ScrollAreaThumbProps>();

const { thumb } = scrollAreaVariants();

const mergedCls = computed(() => cn(thumb(), cls));
</script>

<template>
  <ScrollAreaThumb :class="mergedCls">
    <slot />
  </ScrollAreaThumb>
</template>

<style scoped></style>
