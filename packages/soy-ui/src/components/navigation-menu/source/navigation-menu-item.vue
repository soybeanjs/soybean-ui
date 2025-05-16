<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuItem } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuItemProps } from '../types';

defineOptions({
  name: 'SNavigationMenuItem'
});

const { class: cls } = defineProps<NavigationMenuItemProps>();

const { item } = navigationMenuVariants();

const mergedCls = computed(() => cn(item(), cls));
</script>

<template>
  <NavigationMenuItem :class="mergedCls">
    <slot />
  </NavigationMenuItem>
</template>
