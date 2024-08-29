<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertTitleProps } from './types';

defineOptions({
  name: 'SAlertTitle'
});

const props = withDefaults(defineProps<AlertTitleProps>(), {
  as: 'h5'
});

const { title } = alertVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(title(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
