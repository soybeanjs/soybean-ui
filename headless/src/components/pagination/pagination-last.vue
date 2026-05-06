<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationLast'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, pageCount, disabled } = usePaginationRootContext('PaginationLast');

const cls = usePaginationUi('last');

const isDisabled = computed(() => disabled.value || page.value === pageCount.value);

const onClick = () => {
  onPageChange(pageCount.value);
};
</script>

<template>
  <Button v-bind="props" :class="cls" :disabled="isDisabled" aria-label="Last Page" @click="onClick">
    <slot>Last page</slot>
  </Button>
</template>
