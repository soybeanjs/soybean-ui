<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertTitleRootProps } from './types';

defineOptions({
  name: 'SAlertTitleRoot'
});

const { class: cls, color } = defineProps<AlertTitleRootProps>();

const mergedCls = computed(() => {
  const { titleRoot } = alertVariants({ color });

  return cn(titleRoot(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
