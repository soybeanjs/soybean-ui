<script setup lang="ts">
import { Label } from 'radix-vue';
import { cn, labelVariants } from '@soybean-ui/variants';
import type { LabelProps } from './types';

defineOptions({
  name: 'SLabel'
});

const props = defineProps<LabelProps>();
</script>

<template>
  <Label :as="as" :as-child="asChild" :for="props.for" :class="cn(labelVariants(), props.class)">
    <slot />
  </Label>
</template>
