<script setup lang="ts">
import { computed } from 'vue';
import { cn, menuVariants } from '@soybean-ui/variants';
import { ArrowUpRight } from 'lucide-vue-next';
import type { MenuItemLinkIconProps } from './types';

defineOptions({
  name: 'SMenuItemLinkIcon'
});

const { class: cls, size } = defineProps<MenuItemLinkIconProps>();

const mergedCls = computed(() => {
  const { itemLinkIcon } = menuVariants({ size });

  return cn(itemLinkIcon(), cls);
});
</script>

<template>
  <ArrowUpRight :class="mergedCls" />
</template>
