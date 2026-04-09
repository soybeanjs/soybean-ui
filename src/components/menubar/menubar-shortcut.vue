<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarShortcutProps } from './types';

defineOptions({
  name: 'SMenubarShortcut'
});

const props = defineProps<MenubarShortcutProps>();

const cls = computed(() => cn(menubarVariants({ size: props.size }).shortcut(), props.class));
</script>

<template>
  <span :class="cls">
    <slot />
  </span>
</template>
