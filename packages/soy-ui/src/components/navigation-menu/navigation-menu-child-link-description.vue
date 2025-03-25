<script setup lang="ts">
import { computed } from 'vue';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildLinkDescriptionProps } from './types';

defineOptions({
  name: 'NavigationMenuChildLinkDescription'
});

const { class: cls, size } = defineProps<NavigationMenuChildLinkDescriptionProps>();

const mergedCls = computed(() => {
  const { childLinkDescription } = navigationMenuVariants({ size });

  return cn(childLinkDescription(), cls);
});
</script>

<template>
  <p :class="mergedCls">
    <slot />
  </p>
</template>
