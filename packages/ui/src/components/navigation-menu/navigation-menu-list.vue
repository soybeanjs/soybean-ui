<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuList } from '@soybean-ui/primitive';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuListProps } from './types';

defineOptions({
  name: 'SNavigationMenuList'
});

const { class: cls } = defineProps<NavigationMenuListProps>();

const { list } = navigationMenuVariants();

const mergedCls = computed(() => cn(list(), cls));
</script>

<template>
  <NavigationMenuList :class="mergedCls">
    <slot />
  </NavigationMenuList>
</template>
