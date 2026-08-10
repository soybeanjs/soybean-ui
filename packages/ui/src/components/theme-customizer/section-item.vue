<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
}

const props = defineProps<Props>();

const isVertical = computed(() => props.orientation === 'vertical');
</script>

<template>
  <div class="flex justify-between items-center" :class="{ 'flex-col items-stretch gap-3': isVertical }">
    <slot name="left"></slot>
    <span v-if="title" class="text-xs font-medium text-foreground">{{ title }}</span>
    <span v-if="label" class="shrink-0 text-xs text-muted-foreground">
      {{ label }}
    </span>
    <slot />
  </div>
</template>
