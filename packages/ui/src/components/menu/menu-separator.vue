<script setup lang="ts">
import { computed } from 'vue';
import { MenuSeparator } from '@soybean-ui/primitive';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { MenuSeparatorProps } from './types';

defineOptions({
  name: 'SMenuSeparator'
});

const { class: cls } = defineProps<MenuSeparatorProps>();

const { separator } = menuVariants();

const mergedCls = computed(() => cn(separator(), cls));
</script>

<template>
  <MenuSeparator :class="mergedCls" />
</template>
