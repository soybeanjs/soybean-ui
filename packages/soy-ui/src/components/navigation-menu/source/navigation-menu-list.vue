<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuList } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuListProps } from '../types';

defineOptions({
  name: 'SNavigationMenuList'
});

const { class: cls, size } = defineProps<NavigationMenuListProps>();

const mergedCls = computed(() => {
  const { list } = navigationMenuVariants({ size });

  return cn(list(), cls);
});
</script>

<template>
  <NavigationMenuList :class="mergedCls">
    <slot />
  </NavigationMenuList>
</template>
