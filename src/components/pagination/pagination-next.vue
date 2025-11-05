<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationThemeContext } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationNext'
});

defineProps<PaginationButtonProps>();

const { page, onPageChange, pageCount, disabled } = usePaginationRootContext('PaginationNext');

const themeContext = usePaginationThemeContext();

const cls = computed(() => themeContext?.ui?.value?.next);

const isDisabled = computed(() => disabled.value || page.value === pageCount.value);

const onClick = () => {
  if (isDisabled.value) return;
  onPageChange(page.value + 1);
};
</script>

<template>
  <button
    :class="cls"
    :disabled="isDisabled"
    :data-disabled="isDisabled ? '' : undefined"
    aria-label="Next Page"
    @click="onClick"
  >
    <slot>Next page</slot>
  </button>
</template>
