<script setup lang="ts">
import { computed } from 'vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertTitleProps } from '../types';

defineOptions({
  name: 'SAlertTitle'
});

const { class: cls, size } = defineProps<AlertTitleProps>();

const mergedCls = computed(() => {
  const { title } = alertVariants({ size });

  return cn(title(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
