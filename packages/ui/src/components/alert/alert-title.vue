<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertTitleProps } from './types';

defineOptions({
  name: 'SAlertTitle'
});

const props = defineProps<AlertTitleProps>();

const { title } = alertVariants();
</script>

<template>
  <Primitive as="h5" :class="cn(title(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
