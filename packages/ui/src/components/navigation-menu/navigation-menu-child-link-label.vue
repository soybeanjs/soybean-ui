<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import type { NavigationMenuChildLinkLabelProps } from './types';

defineOptions({
  name: 'NavigationMenuChildLinkLabel'
});

const { class: cls } = defineProps<NavigationMenuChildLinkLabelProps>();

const { childLinkLabel } = navigationMenuVariants();

const mergedCls = computed(() => cn(childLinkLabel(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>
