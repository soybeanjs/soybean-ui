<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertHeaderProps } from './types';

defineOptions({
  name: 'SAlertHeader'
});

const { class: cls } = defineProps<AlertHeaderProps>();

const { header } = alertVariants();

const mergedCls = computed(() => cn(header(), cls));
</script>

<template>
  <Primitive as="div" role="alert" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
