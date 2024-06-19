<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@ui/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div :class="cn('relative', props.class)">
    <slot />
  </div>
</template>
