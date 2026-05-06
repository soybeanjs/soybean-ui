<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationNext'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, pageCount, disabled } = usePaginationRootContext('PaginationNext');

const cls = usePaginationUi('next');

const isDisabled = computed(() => disabled.value || page.value === pageCount.value);

const onClick = () => {
  onPageChange(page.value + 1);
};
</script>

<template>
  <Button v-bind="props" :class="cls" :disabled="isDisabled" aria-label="Next Page" @click="onClick">
    <slot>Next page</slot>
  </Button>
</template>
