<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerDescriptionProps } from './types';

defineOptions({
  name: 'SDrawerDescription'
});

const props = defineProps<DrawerDescriptionProps>();

const { description } = drawerVariants();
</script>

<template>
  <Primitive as="div" :class="cn(description(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
