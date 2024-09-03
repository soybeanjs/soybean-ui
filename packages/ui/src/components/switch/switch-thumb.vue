<script setup lang="ts">
import { SwitchThumb } from 'radix-vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchThumbProps } from './types';

defineOptions({
  name: 'SSwitchThumb'
});

const props = defineProps<SwitchThumbProps>();
const { thumb } = switchVariants();
</script>

<template>
  <SwitchThumb :class="cn(thumb({ size: props.size, round: props.round }), props.class)">
    <slot />
  </SwitchThumb>
</template>

<style lang="scss" scoped></style>
