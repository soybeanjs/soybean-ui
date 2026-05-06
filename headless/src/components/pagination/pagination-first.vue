<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationFirst'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationFirst');

const cls = usePaginationUi('first');

const isDisabled = computed(() => disabled.value || page.value === 1);

const onClick = () => {
  onPageChange(1);
};
</script>

<template>
  <Button v-bind="props" :class="cls" :disabled="isDisabled" aria-label="First Page" @click="onClick">
    <slot>First page</slot>
  </Button>
</template>
