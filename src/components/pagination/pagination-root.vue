<script setup lang="ts">
import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { isNullish, transformPropsToContext } from '../../shared';
import { providePaginationRootContext, usePaginationThemeContext } from './context';
import type { PaginationRootEmits, PaginationRootProps } from './types';

defineOptions({
  name: 'PaginationRoot'
});

const props = withDefaults(defineProps<PaginationRootProps>(), {
  total: 0,
  siblingCount: 2,
  defaultPage: 1,
  showEdges: false
});

const emit = defineEmits<PaginationRootEmits>();

const themeContext = usePaginationThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const page = useControllableState(
  () => props.page,
  value => {
    if (isNullish(value)) return;
    emit('update:page', value);
  },
  props.defaultPage
) as ShallowRef<number>;

const { pageCount } = providePaginationRootContext({
  ...transformPropsToContext(props, ['total', 'siblingCount', 'disabled', 'showEdges', 'itemsPerPage']),
  page
});

const forwardedProps = useOmitProps(props, [
  'page',
  'defaultPage',
  'itemsPerPage',
  'total',
  'siblingCount',
  'disabled',
  'showEdges'
]);
</script>

<template>
  <nav v-bind="forwardedProps" :class="cls">
    <slot :page="page" :page-count="pageCount" />
  </nav>
</template>
