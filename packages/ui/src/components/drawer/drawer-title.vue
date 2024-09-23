<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerTitleProps } from './types';

defineOptions({
  name: 'SDrawerTitle'
});

const props = defineProps<DrawerTitleProps>();

const { title } = drawerVariants();
</script>

<template>
  <Primitive as="div" :class="cn(title(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
