<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildLinkDescriptionProps } from './types';

defineOptions({
  name: 'NavigationMenuChildLinkDescription'
});

const { class: cls } = defineProps<NavigationMenuChildLinkDescriptionProps>();

const { childLinkDescription } = navigationMenuVariants();

const mergedCls = computed(() => cn(childLinkDescription(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="p">
    <slot />
  </Primitive>
</template>
