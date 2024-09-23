<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerKnobProps } from './types';

defineOptions({
  name: 'SDrawerKnob'
});

const props = defineProps<DrawerKnobProps>();

const { knob } = drawerVariants();
</script>

<template>
  <Primitive as="div" :class="cn(knob(), props.class)" />
</template>

<style scoped></style>
