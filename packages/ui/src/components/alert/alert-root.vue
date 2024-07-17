<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { AlertColor } from '@soybean-unify/ui-variants';
import { alertVariants } from '@soybean-unify/ui-variants';
import { cn } from '../../shared';

defineOptions({
  name: 'SAlertRoot'
});

interface Props {
  class?: HTMLAttributes['class'];
  color?: AlertColor;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(alertVariants({ color }), props.class)" role="alert">
    <slot />
  </div>
</template>

<style scoped></style>
