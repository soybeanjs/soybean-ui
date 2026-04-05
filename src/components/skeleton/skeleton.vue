<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { skeletonVariants } from './variants';
import type { SkeletonProps } from './types';

defineOptions({
  name: 'SSkeleton'
});

const props = withDefaults(defineProps<SkeletonProps>(), {
  animated: true
});

const forwardedProps = useOmitProps(props, ['class', 'size', 'animated', 'shape']);

const cls = computed(() =>
  cn(
    skeletonVariants({
      size: props.size,
      animated: props.animated,
      shape: props.shape
    }),
    props.class
  )
);
</script>

<template>
  <Skeleton v-bind="forwardedProps" :class="cls">
    <slot />
  </Skeleton>
</template>
