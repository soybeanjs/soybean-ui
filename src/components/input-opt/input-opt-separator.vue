<script setup lang="ts">
import { cn } from '@/theme';
import { inputOptSeparatorClass, inputOptSeparatorLineClass } from './variants';
import type { InputOptSeparatorProps } from './types';

defineOptions({
  name: 'SInputOptSeparator'
});

defineProps<InputOptSeparatorProps>();
</script>

<template>
  <div :class="cn(inputOptSeparatorClass, $props.class)" data-slot="input-opt-separator" aria-hidden="true">
    <slot>
      <div :class="inputOptSeparatorLineClass" />
    </slot>
  </div>
</template>
