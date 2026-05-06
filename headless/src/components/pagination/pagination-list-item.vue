<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import Button from '../button/button.vue';
import { usePaginationRootContext, usePaginationUi } from './context';
import type { PaginationListItemProps } from './types';

defineOptions({
  name: 'PaginationListItem'
});

const props = defineProps<PaginationListItemProps>();

const forwardedProps = useOmitProps(props, ['value']);

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationListItem');

const cls = usePaginationUi('listItem');

const isSelected = computed(() => page.value === props.value);

const onClick = () => {
  onPageChange(props.value);
};
</script>

<template>
  <Button
    v-bind="forwardedProps"
    :class="cls"
    data-type="page"
    :aria-label="`Page ${value}`"
    :aria-current="isSelected ? 'page' : undefined"
    :data-selected="isSelected ? '' : undefined"
    :disabled="disabled"
    @click="onClick"
  >
    <slot>{{ value }}</slot>
  </Button>
</template>
