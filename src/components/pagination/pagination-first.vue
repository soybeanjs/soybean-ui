<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationThemeContext } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationFirst'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationFirst');

const themeContext = usePaginationThemeContext();

const cls = computed(() => themeContext?.ui?.value?.first);

const isDisabled = computed(() => disabled.value || page.value === 1);

const onClick = () => {
  if (isDisabled.value) return;
  onPageChange(1);
};
</script>

<template>
  <button v-bind="props" :class="cls" :disabled="isDisabled" aria-label="First Page" @click="onClick">
    <slot>First page</slot>
  </button>
</template>
