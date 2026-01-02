<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationFirst'
});

defineProps<PaginationButtonProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationFirst');

const cls = usePaginationUi('first');

const isDisabled = computed(() => disabled.value || page.value === 1);

const onClick = () => {
  if (isDisabled.value) return;
  onPageChange(1);
};
</script>

<template>
  <button
    :class="cls"
    :disabled="isDisabled"
    :data-disabled="isDisabled ? '' : undefined"
    aria-label="First Page"
    @click="onClick"
  >
    <slot>First page</slot>
  </button>
</template>
