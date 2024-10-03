<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerKnobProps } from './types';

defineOptions({
  name: 'SDrawerKnob'
});

const { class: cls } = defineProps<DrawerKnobProps>();

const { knob } = drawerVariants();

const mergedCls = computed(() => cn(knob(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls" />
</template>

<style scoped></style>
