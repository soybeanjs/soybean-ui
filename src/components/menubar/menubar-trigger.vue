<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'SMenubarTrigger'
});

const props = defineProps<MenubarTriggerProps>();

const cls = computed(() => cn(menubarVariants().trigger(), props.class));
</script>

<template>
  <MenubarTrigger v-bind="props" :class="cls">
    <slot />
  </MenubarTrigger>
</template>
