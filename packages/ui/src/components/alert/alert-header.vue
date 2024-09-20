<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertHeaderProps } from './types';

defineOptions({
  name: 'SAlertHeader'
});

const props = defineProps<AlertHeaderProps>();

const { header } = alertVariants();
</script>

<template>
  <Primitive as="div" :class="cn(header(), props.class)" role="alert">
    <slot />
  </Primitive>
</template>

<style scoped></style>
