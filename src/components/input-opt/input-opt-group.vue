<script setup lang="ts">
import { cn } from '@/theme';
import { inputOptGroupClass } from './variants';
import type { InputOptGroupProps } from './types';

defineOptions({
  name: 'SInputOptGroup'
});

defineProps<InputOptGroupProps>();
</script>

<template>
  <div :class="cn(inputOptGroupClass, $props.class)" data-slot="input-opt-group">
    <slot />
  </div>
</template>
