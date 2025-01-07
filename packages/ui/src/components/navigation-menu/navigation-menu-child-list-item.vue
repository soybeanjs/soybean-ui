<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildListItemProps } from './types';

defineOptions({
  name: 'SNavigationMenuChildListItem'
});

const { class: cls } = defineProps<NavigationMenuChildListItemProps>();

const { childListItem } = navigationMenuVariants();

const mergedCls = computed(() => cn(childListItem(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="li">
    <slot />
  </Primitive>
</template>
