<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuIndicator } from '@soybean-ui/primitive';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuIndicatorProps } from './types';

defineOptions({
  name: 'SNavigationMenuIndicator'
});

const { class: cls, forceMount } = defineProps<NavigationMenuIndicatorProps>();

const { indicator, arrow } = navigationMenuVariants();

const mergedCls = computed(() => cn(indicator(), cls));
</script>

<template>
  <NavigationMenuIndicator :class="mergedCls" :force-mount="forceMount">
    <div :class="arrow()" />
  </NavigationMenuIndicator>
</template>
