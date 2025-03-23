<script setup lang="ts">
import { computed } from 'vue';
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
  <div :class="mergedCls">
    <slot />
  </div>
</template>
