<script setup lang="ts">
import { computed } from 'vue';
import { DrawerOverlay } from '@soybean-ui/primitive';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerOverlayProps } from './types';

defineOptions({
  name: 'SDrawerOverlay'
});

const { class: cls } = defineProps<DrawerOverlayProps>();

const { overlay } = drawerVariants();

const mergedCls = computed(() => cn(overlay(), cls));
</script>

<template>
  <DrawerOverlay :class="mergedCls" />
</template>

<style scoped></style>
