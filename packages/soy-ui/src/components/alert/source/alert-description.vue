<script setup lang="ts">
import { computed } from 'vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertDescriptionProps } from '../types';

defineOptions({
  name: 'SAlertDescription'
});

const { class: cls, size } = defineProps<AlertDescriptionProps>();

const mergedCls = computed(() => {
  const { description } = alertVariants({ size });

  return cn(description(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
