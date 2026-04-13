<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { useTableCompactCell } from './hooks';
import { useTableUi } from './context';
import TableCell from './table-cell.vue';
import type { TableCompactCellProps } from './types';

defineOptions({
  name: 'TableCompactCell'
});

const props = defineProps<TableCompactCellProps>();

const ui = useTableUi();

const {
  bindProps,
  dataColumn,
  dataCellSlotProps,
  isTreeColumn,
  showInlineTreeToggle,
  treeCellStyle,
  treeToggleSlotProps,
  indexSlotProps,
  selectionSlotProps,
  expandSlotProps
} = useTableCompactCell(transformPropsToContext(props));
</script>

<template>
  <TableCell v-bind="bindProps">
    <template v-if="dataColumn && dataCellSlotProps">
      <slot :name="dataColumn.dataIndex" v-bind="dataCellSlotProps">
        <div v-if="isTreeColumn" :class="ui.treeCell" :style="treeCellStyle">
          <slot v-if="showInlineTreeToggle && row.hasChildren" name="tree-toggle" v-bind="treeToggleSlotProps" />
          <span v-else-if="showInlineTreeToggle" :class="ui.treeTogglePlaceholder" aria-hidden="true" />
          <span>{{ dataCellSlotProps.value }}</span>
        </div>
        <template v-else>
          {{ dataCellSlotProps.value }}
        </template>
      </slot>
    </template>
    <slot v-else-if="column.type === 'index'" name="index" v-bind="indexSlotProps">
      {{ indexSlotProps.index + 1 }}
    </slot>
    <slot v-else-if="column.type === 'selection'" name="selection" v-bind="selectionSlotProps" />
    <slot v-else-if="column.type === 'expand'" name="expand" v-bind="expandSlotProps" />
  </TableCell>
</template>
