<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { Primitive } from '@soybeanjs/headless/primitive';
import { skeletonVariants } from '@/styles/skeleton';
import type { SkeletonProps } from './types';

defineOptions({
  name: 'SSkeleton'
});

const props = withDefaults(defineProps<SkeletonProps>(), {
  animated: true
});

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['class', 'size', 'animated', 'shape']);

const ariaHidden = computed(() => attrs['aria-hidden'] ?? true);

const cls = computed(() =>
  skeletonVariants(
    {
      size: props.size,
      animated: props.animated,
      shape: props.shape
    },
    props.class
  )
);
</script>

<template>
  <Primitive v-bind="forwardedProps" data-soybean-skeleton :class="cls" :aria-hidden="ariaHidden">
    <slot />
  </Primitive>
</template>
