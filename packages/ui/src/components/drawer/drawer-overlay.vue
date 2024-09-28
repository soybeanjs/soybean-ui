<script setup lang="ts">
import { computed } from 'vue';
import { DrawerOverlay } from 'vaul-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerOverlayProps } from './types';

defineOptions({
  name: 'SDrawerOverlay'
});

const { class: cls } = defineProps<DrawerOverlayProps>();

const mergedCls = computed(() => {
  const { overlay } = drawerVariants();

  return cn(overlay(), cls);
});
</script>

<template>
  <DrawerOverlay :class="mergedCls" />
</template>

<style scoped></style>
