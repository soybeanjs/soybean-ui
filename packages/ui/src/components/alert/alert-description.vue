<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertDescriptionProps } from './types';

defineOptions({
  name: 'SAlertDescription'
});

const props = defineProps<AlertDescriptionProps>();

const { description } = alertVariants();
</script>

<template>
  <Primitive as="div" :class="cn(description(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
