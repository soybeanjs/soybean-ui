<script setup lang="ts">
import { computed } from 'vue';
import { DrawerOverlay } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DrawerOverlayProps } from '../types';

defineOptions({
  name: 'SDrawerOverlay'
});

const { class: cls } = defineProps<DrawerOverlayProps>();

const { overlay } = dialogVariants();

const mergedCls = computed(() => cn(overlay(), cls));
</script>

<template>
  <DrawerOverlay :class="mergedCls" />
</template>
