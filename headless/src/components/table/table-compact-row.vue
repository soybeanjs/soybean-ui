<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { transformPropsToContext } from '../../shared';
import { useTableCompactExpandedRow } from './hooks';
import { getTableColumnKey } from './shared';
import TableCompactCell from './table-compact-cell.vue';
import TableRow from './table-row.vue';
import TableCell from './table-cell.vue';
import type { TableCompactRowProps } from './types';

defineOptions({
  name: 'TableCompactRow',
  inheritAttrs: false
});

const props = defineProps<TableCompactRowProps>();

const slots = useSlots();

const { visible, expandedRowSlotProps, rowProps, cellProps } = useTableCompactExpandedRow(
  transformPropsToContext(props, ['row', 'index'])
);

const slotNames = computed(() => Object.keys(slots));
</script>

<template>
  <TableRow v-bind="rowProps" data-row :data-level="row.level">
    <template v-for="column in leafColumns" :key="getTableColumnKey(column)">
      <TableCompactCell :column="column" :row="row" :index="index">
        <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </TableCompactCell>
    </template>
  </TableRow>
  <TableRow v-if="visible" v-bind="rowProps" data-expanded-row :data-level="row.level">
    <TableCell v-bind="cellProps" :colspan="leafColumns.length">
      <slot name="expanded-row" v-bind="expandedRowSlotProps" />
    </TableCell>
  </TableRow>
</template>
