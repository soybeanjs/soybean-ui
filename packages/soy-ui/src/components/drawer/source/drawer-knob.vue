<script setup lang="ts">
import { computed } from 'vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerKnobProps } from '../types';

defineOptions({
  name: 'SDrawerKnob'
});

const { class: cls, size } = defineProps<DrawerKnobProps>();

const mergedCls = computed(() => {
  const { knob } = drawerVariants({ size });

  return cn(knob(), cls);
});
</script>

<template>
  <div :class="mergedCls" />
</template>
