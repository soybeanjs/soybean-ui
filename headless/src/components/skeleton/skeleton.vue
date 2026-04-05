<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Primitive } from '../primitive';
import type { SkeletonProps } from './types';

defineOptions({
  name: 'Skeleton'
});

withDefaults(defineProps<SkeletonProps>(), {
  as: 'div'
});

const attrs = useAttrs();

const ariaHidden = computed(() => attrs['aria-hidden'] ?? true);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :aria-hidden="ariaHidden">
    <slot />
  </Primitive>
</template>
