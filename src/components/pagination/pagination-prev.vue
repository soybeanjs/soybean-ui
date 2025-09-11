<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationThemeContext } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationPrev'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationPrev');

const themeContext = usePaginationThemeContext();

const cls = computed(() => themeContext?.ui?.value?.prev);

const isDisabled = computed(() => disabled.value || page.value === 1);

const onClick = () => {
  if (isDisabled.value) return;
  onPageChange(page.value - 1);
};
</script>

<template>
  <button v-bind="props" :class="cls" :disabled="isDisabled" aria-label="Previous Page" @click="onClick">
    <slot>Prev page</slot>
  </button>
</template>
