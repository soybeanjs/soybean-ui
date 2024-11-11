<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertTitleProps } from './types';

defineOptions({
  name: 'SAlertTitle'
});

const { class: cls } = defineProps<AlertTitleProps>();

const { title } = alertVariants();

const mergedCls = computed(() => cn(title(), cls));
</script>

<template>
  <Primitive as="h5" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
