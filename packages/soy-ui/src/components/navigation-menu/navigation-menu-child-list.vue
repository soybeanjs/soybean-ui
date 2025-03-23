<script setup lang="ts">
import { computed } from 'vue';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildListProps } from './types';

defineOptions({
  name: 'SNavigationMenuChildList'
});

const { class: cls } = defineProps<NavigationMenuChildListProps>();

const { childList } = navigationMenuVariants();

const mergedCls = computed(() => cn(childList(), cls));
</script>

<template>
  <ul :class="mergedCls">
    <slot />
  </ul>
</template>
