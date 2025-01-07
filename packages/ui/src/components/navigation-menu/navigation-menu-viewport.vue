<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuViewport, useForwardProps } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuViewportProps } from './types';

defineOptions({
  name: 'SNavigationMenuViewport'
});

const { class: cls, ...delegatedProps } = defineProps<NavigationMenuViewportProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { viewport } = navigationMenuVariants();

const mergedCls = computed(() => cn(viewport(), cls));
</script>

<template>
  <NavigationMenuViewport v-bind="forwardedProps" :class="mergedCls" />
</template>
