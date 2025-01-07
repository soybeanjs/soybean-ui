<script setup lang="ts">
import { computed } from 'vue';
import { DrawerContent } from '@soybean-ui/primitives';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerContentProps } from './types';

defineOptions({
  name: 'SDrawerContent'
});

const { class: cls } = defineProps<DrawerContentProps>();

const { content } = drawerVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <DrawerContent :class="mergedCls">
    <slot />
  </DrawerContent>
</template>
