<script setup lang="ts">
import { computed } from 'vue';
import { useTextareaRootContext, useTextareaThemeContext } from './context';
import type { TextareaCounterProps } from './types';

defineOptions({
  name: 'TextareaCounter'
});

defineProps<TextareaCounterProps>();

const { maxlength, count } = useTextareaRootContext('TextareaCounter');

const themeContext = useTextareaThemeContext();

const cls = computed(() => themeContext?.ui?.value?.counter);

const countText = computed(() => {
  if (maxlength.value) {
    return `${count.value} / ${maxlength.value}`;
  }
  return `${count.value}`;
});
</script>

<template>
  <div :class="cls">
    <slot :count="count" :maxlength="maxlength">{{ countText }}</slot>
  </div>
</template>
