<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationLast'
});

defineProps<PaginationButtonProps>();

const { page, onPageChange, pageCount, disabled } = usePaginationRootContext('PaginationLast');

const cls = usePaginationUi('last');

const isDisabled = computed(() => disabled.value || page.value === pageCount.value);

const onClick = () => {
  if (isDisabled.value) return;
  onPageChange(pageCount.value);
};
</script>

<template>
  <button
    :class="cls"
    :disabled="isDisabled"
    :data-disabled="isDisabled ? '' : undefined"
    aria-label="Last Page"
    @click="onClick"
  >
    <slot>Last page</slot>
  </button>
</template>
