<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { PaginationButtonProps } from './types';

defineOptions({
  name: 'PaginationLast'
});

const props = defineProps<PaginationButtonProps>();

const { page, onPageChange, pageCount, disabled } = usePaginationRootContext('PaginationLast');

const cls = usePaginationUi('last');
const messages = useLocaleMessages();

const isDisabled = computed(() => disabled.value || page.value === pageCount.value);

const onClick = () => {
  onPageChange(pageCount.value);
};
</script>

<template>
  <Button
    v-bind="props"
    data-soybean-pagination-last
    data-soybean-pagination-action
    :class="cls"
    :disabled="isDisabled"
    :aria-label="messages.pagination.lastPage"
    @click="onClick"
  >
    <slot>{{ messages.pagination.lastPage }}</slot>
  </Button>
</template>
