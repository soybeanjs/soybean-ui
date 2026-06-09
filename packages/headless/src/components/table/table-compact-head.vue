<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { useTableCompactHead } from './hooks';
import TableHead from './table-head.vue';
import type { TableCompactHeadProps } from './types';

defineOptions({
  name: 'TableCompactHead'
});

const props = defineProps<TableCompactHeadProps>();

const {
  bindProps,
  setElementRef,
  headerSlotProps,
  headerSelectionSlotProps,
  headerFilterSlotProps,
  sortSlotProps,
  resizeSlotProps,
  columnSlotName,
  sortable,
  filterable,
  resizable
} = useTableCompactHead(transformPropsToContext(props));
</script>

<template>
  <TableHead :ref="setElementRef" v-bind="bindProps">
    <slot name="header" v-bind="headerSlotProps">
      <slot :name="`header-${columnSlotName}`" v-bind="headerSlotProps">
        <template v-if="column.type === 'index'">
          {{ column.title ?? '#' }}
        </template>
        <template v-else-if="column.type === 'selection'">
          <slot name="header-selection" v-bind="headerSelectionSlotProps" />
        </template>
        <template v-else-if="column.type === 'expand'">
          {{ column.title }}
        </template>
        <template v-else>
          <span>{{ column.title }}</span>
          <slot v-if="sortable" name="header-sort" v-bind="sortSlotProps" />
          <slot v-if="filterable" name="header-filter" v-bind="headerFilterSlotProps" />
          <slot v-if="resizable" name="header-resize" v-bind="resizeSlotProps" />
        </template>
      </slot>
    </slot>
  </TableHead>
</template>
