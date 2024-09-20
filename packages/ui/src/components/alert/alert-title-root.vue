<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertTitleRootProps } from './types';

defineOptions({
  name: 'SAlertTitleRoot'
});

const props = defineProps<AlertTitleRootProps>();

const { titleRoot } = alertVariants();
</script>

<template>
  <Primitive as="div" :class="cn(titleRoot(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
