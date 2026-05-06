<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationPrev'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationPrev');

const cls = usePaginationUi('prev');

const isDisabled = computed(() => disabled.value || page.value === 1);

const onClick = () => {
  onPageChange(page.value - 1);
};
</script>

<template>
  <Button v-bind="props" :class="cls" :disabled="isDisabled" aria-label="Previous Page" @click="onClick">
    <slot>Prev page</slot>
  </Button>
</template>
