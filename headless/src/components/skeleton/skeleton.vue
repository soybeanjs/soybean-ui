<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import type { SkeletonProps } from './types';

defineOptions({
  name: 'Skeleton'
});

const props = withDefaults(defineProps<SkeletonProps>(), {
  as: 'div'
});

const forwardedProps = useOmitProps(props, ['aria-hidden']);

const ariaHidden = computed(() => props['aria-hidden'] ?? true);
</script>

<template>
  <Primitive v-bind="forwardedProps" :aria-hidden="ariaHidden" />
</template>
