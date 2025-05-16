<script setup lang="ts">
import { computed } from 'vue';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildListItemProps } from '../types';

defineOptions({
  name: 'SNavigationMenuChildListItem'
});

const { class: cls } = defineProps<NavigationMenuChildListItemProps>();

const { childListItem } = navigationMenuVariants();

const mergedCls = computed(() => cn(childListItem(), cls));
</script>

<template>
  <li :class="mergedCls">
    <slot />
  </li>
</template>
