<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, skeletonVariants } from '@soybean-ui/variants';
import type { SkeletonProps } from '../types';

defineOptions({
  name: 'SSkeleton'
});

const { class: cls } = defineProps<SkeletonProps>();

const mergedCls = computed(() => cn(skeletonVariants(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div" />
</template>
