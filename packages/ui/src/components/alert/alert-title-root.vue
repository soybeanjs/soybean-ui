<script setup lang="ts">
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-unify/ui-variants';
import type { AlertTitleRootProps } from './types';

defineOptions({
  name: 'SAlertTitleRoot'
});

const props = withDefaults(defineProps<AlertTitleRootProps>(), {
  as: 'div'
});

const { titleRoot } = alertVariants();
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(titleRoot(), props.class)">
    <slot />
  </Primitive>
</template>

<style scoped></style>
