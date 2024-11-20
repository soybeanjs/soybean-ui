<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { alertVariants, cn } from '@soybean-ui/variants';
import type { AlertDescriptionProps } from './types';

defineOptions({
  name: 'SAlertDescription'
});

const { class: cls } = defineProps<AlertDescriptionProps>();

const { description } = alertVariants();

const mergedCls = computed(() => cn(description(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
