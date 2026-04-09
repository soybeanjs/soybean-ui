<script setup lang="ts">
import { cn } from '@/theme';
import Icon from '../icon/icon.vue';
import { inputOptSeparatorClass } from './variants';
import type { InputOptSeparatorProps } from './types';

defineOptions({
  name: 'SInputOptSeparator'
});

defineProps<InputOptSeparatorProps>();
</script>

<template>
  <div :class="cn(inputOptSeparatorClass, $props.class)" data-slot="input-opt-separator" aria-hidden="true">
    <slot>
      <Icon icon="lucide:minus" />
    </slot>
  </div>
</template>
