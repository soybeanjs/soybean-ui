<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationFirst'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationFirst');

const cls = usePaginationUi('first');
const messages = useLocaleMessages();

const isDisabled = computed(() => disabled.value || page.value === 1);

const onClick = () => {
  onPageChange(1);
};
</script>

<template>
  <Button
    v-bind="props"
    data-soybean-pagination-first
    :class="cls"
    :disabled="isDisabled"
    :aria-label="messages.pagination.firstPage"
    @click="onClick"
  >
    <slot>{{ messages.pagination.firstPage }}</slot>
  </Button>
</template>
