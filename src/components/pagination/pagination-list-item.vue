<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationRootContext, usePaginationThemeContext } from './context';
import type { PaginationListItemProps } from './types';

defineOptions({
  name: 'PaginationListItem'
});

const props = defineProps<PaginationListItemProps>();

const { page, onPageChange, disabled } = usePaginationRootContext('PaginationListItem');

const themeContext = usePaginationThemeContext();

const cls = computed(() => themeContext?.ui?.value?.listItem);

const isSelected = computed(() => page.value === props.value);

const onClick = () => {
  if (disabled.value) return;

  onPageChange(props.value);
};
</script>

<template>
  <button
    :class="cls"
    data-type="page"
    :aria-label="`Page ${value}`"
    :aria-current="isSelected ? 'page' : undefined"
    :data-selected="isSelected ? '' : undefined"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    @click="onClick"
  >
    <slot>{{ value }}</slot>
  </button>
</template>
