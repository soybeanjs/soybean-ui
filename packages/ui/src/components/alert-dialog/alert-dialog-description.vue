<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogDescription } from '@soybean-ui/primitive';
import { alertDialogVariants, cn } from '@soybean-ui/variants';
import type { AlertDialogDescriptionProps } from './types';

defineOptions({
  name: 'SAlertDialogDescription'
});

const { class: cls } = defineProps<AlertDialogDescriptionProps>();

const { description } = alertDialogVariants();

const mergedCls = computed(() => cn(description(), cls));
</script>

<template>
  <AlertDialogDescription :class="mergedCls">
    <slot />
  </AlertDialogDescription>
</template>
