<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { alertDialogVariants, cn } from '@soybean-ui/variants';
import type { AlertDialogHeaderProps } from './types';

defineOptions({
  name: 'SAlertDialogHeader'
});

const { class: cls } = defineProps<AlertDialogHeaderProps>();

const { header } = alertDialogVariants();

const mergedCls = computed(() => cn(header(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>
