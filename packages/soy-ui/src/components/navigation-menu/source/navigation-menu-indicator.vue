<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuIndicator } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuIndicatorProps } from '../types';

defineOptions({
  name: 'SNavigationMenuIndicator'
});

const { class: cls, size, ui, forceMount } = defineProps<NavigationMenuIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator, arrow } = navigationMenuVariants({ size });

  return {
    cls: cn(indicator(), cls || ui?.indicator),
    arrow: cn(arrow(), ui?.arrow)
  };
});
</script>

<template>
  <NavigationMenuIndicator :class="mergedCls.cls" :force-mount="forceMount">
    <div :class="mergedCls.arrow" />
  </NavigationMenuIndicator>
</template>
