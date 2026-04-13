<script
  setup
  lang="ts"
  generic="
    T extends TableBaseData = TableBaseData,
    R extends string | number = string | number,
    M extends boolean = boolean
  "
>
import { computed, useSlots } from 'vue';
import { transformPropsToContext } from '../../shared';
import { provideTableCompactContext } from './context';
import { useTableCompactData, useTableCompactResize, useTableCompactState, useTableCompactVirtual } from './hooks';
import TableBody from './table-body.vue';
import TableCompactRow from './table-compact-row.vue';
import TableCompactHead from './table-compact-head.vue';
import TableContent from './table-content.vue';
import TableFooter from './table-footer.vue';
import TableHeader from './table-header.vue';
import TableRoot from './table-root.vue';
import TableRow from './table-row.vue';
import TableVirtualSpacerRow from './table-virtual-spacer-row.vue';
import type { TableBaseData, TableCompactEmits, TableCompactProps, TableCompactSlots, TableUnifiedKey } from './types';

defineOptions({
  name: 'TableCompact'
});

const props = withDefaults(defineProps<TableCompactProps<T, R, M>>(), {
  expanded: undefined,
  sortState: undefined,
  filterState: undefined,
  columnWidths: undefined,
  selected: undefined,
  multiple: true as any,
  indent: 16
});

const emit = defineEmits<TableCompactEmits<R, M>>();

defineSlots<TableCompactSlots<T>>();

const slots = useSlots();

const slotNames = computed(() => Object.keys(slots) as Array<keyof TableCompactSlots<T>>);

const hasExpandedRowSlot = computed(() => Boolean(slots['expanded-row']));

const contextProps = props as TableCompactProps;

const {
  expanded,
  sortState,
  filterState,
  columnWidths,
  selected,
  multiple,
  onSelectedChange,
  setSelected,
  resetSelected,
  isValueSelected
} = useTableCompactState({
  props: contextProps,
  emit,
  hasExpandedRowSlot
});

const {
  leafColumns,
  headerRows,
  sourceRows,
  hasTreeRows,
  visibleExpandedKeys,
  visibleRowKeys,
  treeColumnKey,
  hasExpandColumn,
  isHeaderSelectionDisabled,
  headerSelection,
  displayRows
} = useTableCompactData({
  props: contextProps,
  expanded,
  sortState,
  filterState,
  selected,
  hasExpandedRowSlot
});

const {
  setTableContentRef,
  headCellElements,
  measuredColumnWidths,
  syncMeasuredColumnWidths,
  resizingColumnKey,
  fixedColumnStates
} = useTableCompactResize({
  leafColumns,
  columnWidths
});

const { isVirtual, setTableRootRef, tableRootStyle, virtualPaddingStart, virtualPaddingEnd, visibleRows } =
  useTableCompactVirtual({
    ...transformPropsToContext(contextProps, ['height', 'virtual', 'virtualizerOptions', 'estimateSize']),
    displayRows,
    syncMeasuredColumnWidths
  });

provideTableCompactContext({
  ...transformPropsToContext(props, ['indent', 'headProps', 'cellProps', 'rowProps']),
  rowKey: props.rowKey as (row: TableBaseData) => TableUnifiedKey,
  expanded,
  sortState,
  filterState,
  columnWidths,
  selected,
  multiple,
  onSelectedChange,
  setSelected,
  resetSelected,
  isValueSelected,
  leafColumns,
  sourceRows,
  hasTreeRows,
  treeColumnKey,
  hasExpandColumn,
  hasExpandedRowSlot,
  visibleExpandedKeys,
  visibleRowKeys,
  isHeaderSelectionDisabled,
  headerSelection,
  fixedColumnStates,
  resizingColumnKey,
  measuredColumnWidths,
  headCellElements
});
</script>

<template>
  <TableRoot :ref="setTableRootRef" :style="tableRootStyle">
    <TableContent :ref="setTableContentRef" v-bind="contentProps">
      <TableHeader v-bind="headerProps">
        <TableRow v-for="(headerRow, headerRowIndex) in headerRows" :key="headerRowIndex" v-bind="rowProps">
          <TableCompactHead v-for="headerCell in headerRow" v-bind="headerCell" :key="headerCell.key">
            <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </TableCompactHead>
        </TableRow>
      </TableHeader>
      <TableBody v-bind="bodyProps">
        <TableVirtualSpacerRow
          :is-virtual="isVirtual"
          :colspan="Math.max(leafColumns.length, 1)"
          :padding-start="virtualPaddingStart"
          :padding-end="virtualPaddingEnd"
        >
          <TableCompactRow
            v-for="{ item, index } in visibleRows"
            :key="item.key"
            :row="item"
            :index="index"
            :leaf-columns="leafColumns"
          >
            <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </TableCompactRow>
        </TableVirtualSpacerRow>
      </TableBody>
      <TableFooter v-if="$slots.footer" v-bind="footerProps">
        <slot name="footer" :column-size="leafColumns.length" />
      </TableFooter>
    </TableContent>
  </TableRoot>
</template>
