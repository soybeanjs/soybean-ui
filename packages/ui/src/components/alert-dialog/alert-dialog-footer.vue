<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { alertDialogVariants, cn } from '@soybean-ui/variants';
import type { AlertDialogFooterProps } from './types';

defineOptions({
  name: 'SAlertDialogFooter'
});

const { class: cls } = defineProps<AlertDialogFooterProps>();

const { footer } = alertDialogVariants();

const mergedCls = computed(() => cn(footer(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>

<style scoped></style>
