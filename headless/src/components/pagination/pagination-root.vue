<script setup lang="ts">
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { providePaginationRootContext, usePaginationUi } from './context';
import type { PaginationRootEmits, PaginationRootProps } from './types';

defineOptions({
  name: 'PaginationRoot'
});

const props = withDefaults(defineProps<PaginationRootProps>(), {
  total: 0,
  siblingCount: 2,
  defaultPage: 1,
  defaultPageSize: 10,
  showEdges: false
});

const emit = defineEmits<PaginationRootEmits>();

const cls = usePaginationUi('root');

const page = useControllableState(
  () => props.page as number,
  value => {
    emit('update:page', value);
  },
  props.defaultPage
);

const pageSize = useControllableState(
  () => props.pageSize as number,
  value => {
    emit('update:pageSize', value);
  },
  props.defaultPageSize
);

const { pageCount } = providePaginationRootContext({
  ...transformPropsToContext(props, ['total', 'siblingCount', 'disabled', 'showEdges']),
  page,
  pageSize
});
</script>

<template>
  <nav :class="cls">
    <slot :page="page" :page-count="pageCount" />
  </nav>
</template>
