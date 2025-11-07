<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { labelVariants } from '@/variants/label';
import type { LabelProps } from './types';

defineOptions({
  name: 'SLabel'
});

const props = defineProps<LabelProps>();

const cls = computed(() => cn(labelVariants({ size: props.size }), props.class));
</script>

<template>
  <Label :for="props.for" :class="cls">
    <slot />
  </Label>
</template>
