<script setup lang="ts">
import { computed } from 'vue';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildListProps } from '../types';

defineOptions({
  name: 'SNavigationMenuChildList'
});

const { class: cls, size } = defineProps<NavigationMenuChildListProps>();

const mergedCls = computed(() => {
  const { childList } = navigationMenuVariants({ size });

  return cn(childList(), cls);
});
</script>

<template>
  <ul :class="mergedCls">
    <slot />
  </ul>
</template>
