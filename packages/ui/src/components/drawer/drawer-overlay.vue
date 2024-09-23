<script setup lang="ts">
import { DrawerOverlay } from 'vaul-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerOverlayProps } from './types';

defineOptions({
  name: 'SDrawerOverlay'
});

const props = defineProps<DrawerOverlayProps>();

const { overlay } = drawerVariants();
</script>

<template>
  <DrawerOverlay :class="cn(overlay(), props.class)" />
</template>

<style scoped></style>
