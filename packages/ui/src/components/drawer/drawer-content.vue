<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue';
import { DrawerContent, DrawerDescription, DrawerTitle } from 'vaul-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerContentProps } from './types';
import SDrawerKnob from './drawer-knob.vue';

defineOptions({
  name: 'SDrawerContent'
});

const props = defineProps<DrawerContentProps>();

const { content } = drawerVariants();
</script>

<template>
  <DrawerContent :class="cn(content(), props.class)">
    <VisuallyHidden>
      <DrawerTitle />
      <DrawerDescription />
    </VisuallyHidden>
    <SDrawerKnob />
    <slot />
  </DrawerContent>
</template>

<style scoped></style>
