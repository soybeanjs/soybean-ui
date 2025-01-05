<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import { alertDialogVariants, cn } from '@soybean-ui/variants';
import type { AlertDialogContentEmits, AlertDialogContentProps } from './types';

defineOptions({
  name: 'SAlertDialogContent'
});

const { class: cls, ...delegatedProps } = defineProps<AlertDialogContentProps>();

const emit = defineEmits<AlertDialogContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = alertDialogVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <AlertDialogContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </AlertDialogContent>
</template>
