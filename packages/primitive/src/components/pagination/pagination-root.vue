<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { PaginationRootPropsWithPrimitive } from './types';
import { providePaginationRootContext } from './context';

defineOptions({
  name: 'PaginationRoot'
});

const props = withDefaults(defineProps<PaginationRootPropsWithPrimitive>(), {
  as: 'nav',
  total: 0,
  siblingCount: 2,
  defaultPage: 1,
  showEdges: false
});

const { siblingCount, disabled, showEdges } = toRefs(props);

useForwardExpose();

const page = defineModel<number>('page', {
  default: props.defaultPage
});

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))));

providePaginationRootContext({
  page,
  onPageChange(value) {
    page.value = value;
  },
  pageCount,
  siblingCount,
  disabled,
  showEdges
});
</script>

<template>
  <Primitive :as :as-child>
    <slot :page="page" :page-count="pageCount" />
  </Primitive>
</template>
