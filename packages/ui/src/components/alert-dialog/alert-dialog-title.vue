<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogTitle } from '@soybean-ui/primitive';
import { alertDialogVariants, cn } from '@soybean-ui/variants';
import type { AlertDialogTitleProps } from './types';

defineOptions({
  name: 'SAlertDialogTitle'
});

const { class: cls } = defineProps<AlertDialogTitleProps>();

const { title } = alertDialogVariants();

const mergedCls = computed(() => cn(title(), cls));
</script>

<template>
  <AlertDialogTitle :class="mergedCls">
    <slot />
  </AlertDialogTitle>
</template>

<style scoped></style>
