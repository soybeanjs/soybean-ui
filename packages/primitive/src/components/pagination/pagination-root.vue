<script setup lang="ts">
import { computed, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import type { PaginationRootEmits, PaginationRootPropsWithPrimitive } from './types';
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

const emit = defineEmits<PaginationRootEmits>();

const { siblingCount, disabled, showEdges } = toRefs(props);

useForwardExpose();

const page = useVModel(props, 'page', emit, {
  defaultValue: props.defaultPage,
  passive: (props.page === undefined) as false
}) as Ref<number>;

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
  <Primitive :class="props.class" :as="as" :as-child="asChild">
    <slot :page="page" :page-count="pageCount" />
  </Primitive>
</template>
