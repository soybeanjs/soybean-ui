<script setup lang="ts">
import { computed } from 'vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertWrapperProps } from '../types';

defineOptions({
  name: 'SAlertWrapper'
});

const { class: cls, size } = defineProps<AlertWrapperProps>();

const mergedCls = computed(() => {
  const { wrapper } = alertVariants({ size });

  return cn(wrapper(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
