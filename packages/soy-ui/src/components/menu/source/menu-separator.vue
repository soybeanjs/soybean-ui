<script setup lang="ts">
import { computed } from 'vue';
import { MenuSeparator } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuSeparatorProps } from '../types';

defineOptions({
  name: 'SMenuSeparator'
});

const { class: cls, size } = defineProps<MenuSeparatorProps>();

const mergedCls = computed(() => {
  const { separator } = menuVariants({ size });

  return cn(separator(), cls);
});
</script>

<template>
  <MenuSeparator :class="mergedCls" />
</template>
