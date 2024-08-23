<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { alertVariants, cn } from '@soybean-unify/ui-variants';
import type { AlertRootProps } from './types';

defineOptions({
  name: 'SAlertRoot'
});

const props = withDefaults(defineProps<AlertRootProps>(), {
  as: 'div'
});

const cls = computed(() => {
  const { color, variant } = props;

  const { root } = alertVariants({ color, variant });

  return cn(root(), props.class);
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" role="alert">
    <slot />
  </Primitive>
</template>

<style scoped></style>
