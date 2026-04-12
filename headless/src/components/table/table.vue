<script
  setup
  lang="ts"
  generic="
    T extends BaseTableData = BaseTableData,
    R extends string | number = string | number,
    M extends boolean = boolean
  "
>
import { useResizeObserver } from '@vueuse/core';
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useId, watch } from 'vue';
import type { ComponentPublicInstance, CSSProperties } from 'vue';
import type { CheckedState } from '../../types';
import { useOmitProps, useSelection } from '../../composables';
import {
  filterTableColumns,
  getTableColumnWidthValue,
  getNextTableFilterState,
  getTableAriaSort,
  getTableColumnKey,
  getTableFilterPlaceholder,
  getTableHeaderRows,
  getTableLeafColumns,
  getTableRowLabel,
  getTableRowValueByDataIndex,
  isTableDataColumn,
  isTableGroupColumn,
  matchesTableColumnFilter,
  parseTableColumnWidth,
  sortTableData,
  toggleTableSortState
} from './shared';
import TableBody from './table-body.vue';
import TableCell from './table-cell.vue';
import TableContent from './table-content.vue';
import { useTableUi } from './context';
import TableFooter from './table-footer.vue';
import TableHead from './table-head.vue';
import TableHeader from './table-header.vue';
import TableRoot from './table-root.vue';
import TableRow from './table-row.vue';
import type {
  BaseTableData,
  TableDataColumn,
  TableEmits,
  TableFilterState,
  TableColumnWidthState,
  TableProps,
  TableSlots,
  TableSortState
} from './types';

defineOptions({
  name: 'Table'
});

const props = withDefaults(defineProps<TableProps<T, R, M>>(), {
  multiple: true as any
});

const emit = defineEmits<TableEmits<R, M>>();

defineSlots<TableSlots<T>>();

const tableUi = useTableUi();

const forwardedRootProps = useOmitProps(props, [
  'columns',
  'data',
  'rowKey',
  'defaultSortState',
  'sortState',
  'defaultFilterState',
  'filterState',
  'defaultColumnWidths',
  'columnWidths',
  'defaultExpanded',
  'expanded',
  'defaultExpandAll',
  'defaultSelected',
  'selected',
  'multiple',
  'contentProps',
  'headerProps',
  'bodyProps',
  'footerProps',
  'headProps',
  'rowProps',
  'cellProps'
]);

const uncontrolledExpanded = shallowRef(getDefaultExpanded());
const uncontrolledSortState = shallowRef<TableSortState | undefined>(getDefaultSortState());
const uncontrolledFilterState = shallowRef<TableFilterState>(getDefaultFilterState());
const uncontrolledColumnWidths = shallowRef<TableColumnWidthState>(getDefaultColumnWidths());
const tableContentTarget = shallowRef<HTMLElement | null>(null);
const measuredColumnWidths = shallowRef<Record<string, number>>({});
const resizingColumnKey = shallowRef<string | null>(null);
const headCellElements: Record<string, HTMLElement | null> = {};

watch(
  () => props.expanded,
  value => {
    if (value !== undefined) {
      uncontrolledExpanded.value = value;
    }
  }
);

watch(
  () => props.sortState,
  value => {
    if (value !== undefined) {
      uncontrolledSortState.value = value;
    }
  }
);

watch(
  () => props.filterState,
  value => {
    if (value !== undefined) {
      uncontrolledFilterState.value = value;
    }
  }
);

watch(
  () => props.columnWidths,
  value => {
    if (value !== undefined) {
      uncontrolledColumnWidths.value = value;
    }
  }
);

const expanded = computed({
  get: () => props.expanded ?? uncontrolledExpanded.value,
  set: value => {
    if (props.expanded === undefined) {
      uncontrolledExpanded.value = value;
    }

    emit('update:expanded', value);
  }
});

const sortState = computed({
  get: () => props.sortState ?? uncontrolledSortState.value,
  set: value => {
    if (props.sortState === undefined) {
      uncontrolledSortState.value = value;
    }

    emit('update:sortState', value);
  }
});

const filterState = computed({
  get: () => props.filterState ?? uncontrolledFilterState.value,
  set: value => {
    if (props.filterState === undefined) {
      uncontrolledFilterState.value = value;
    }

    emit('update:filterState', value);
  }
});

const columnWidths = computed({
  get: () => props.columnWidths ?? uncontrolledColumnWidths.value,
  set: value => {
    if (props.columnWidths === undefined) {
      uncontrolledColumnWidths.value = value;
    }

    emit('update:columnWidths', value);
  }
});

const {
  modelValue: selected,
  onModelValueChange: onSelectedChange,
  setModelValue: setSelected,
  resetModelValue: resetSelected,
  isMultiple,
  isValueSelected
} = useSelection(
  computed(() => ({
    modelValue: props.selected,
    defaultValue: props.defaultSelected,
    multiple: props.multiple
  })),
  value => {
    emit('update:selected', value);
  }
);

const visibleColumns = computed(() => filterTableColumns(props.columns));

const leafColumns = computed(() => getTableLeafColumns(visibleColumns.value));

const headerRows = computed(() => getTableHeaderRows(visibleColumns.value));

const columnMap = computed(() => {
  return new Map(leafColumns.value.map(column => [getTableColumnKey(column), column]));
});

const fixedColumnStates = computed(() => {
  const leftOffsets: Record<string, number> = {};
  const rightOffsets: Record<string, number> = {};
  let accumulatedLeft = 0;
  let accumulatedRight = 0;

  leafColumns.value.forEach((column, index) => {
    if (column.fixed !== 'left') {
      return;
    }

    const key = getTableColumnKey(column);
    leftOffsets[key] = accumulatedLeft;
    accumulatedLeft += getMeasuredColumnWidth(column, index);
  });

  [...leafColumns.value].reverse().forEach((column, reverseIndex) => {
    if (column.fixed !== 'right') {
      return;
    }

    const key = getTableColumnKey(column);
    rightOffsets[key] = accumulatedRight;
    accumulatedRight += getMeasuredColumnWidth(column, leafColumns.value.length - reverseIndex - 1);
  });

  return {
    leftOffsets,
    rightOffsets
  };
});

const displayData = computed(() => {
  const filtered = props.data.filter(row => {
    return Object.entries(filterState.value).every(([key, keyword]) => {
      const column = columnMap.value.get(key);

      if (!column || !isTableDataColumn(column) || !column.filter) {
        return true;
      }

      return matchesTableColumnFilter(row, column, keyword);
    });
  });

  if (!sortState.value) {
    return filtered;
  }

  const column = columnMap.value.get(sortState.value.key);

  if (!column || !isTableDataColumn(column) || !column.sorter) {
    return filtered;
  }

  return sortTableData(filtered, column, sortState.value);
});

const hasExpandColumn = computed(() => {
  return leafColumns.value.some(column => column.type === 'expand');
});

const isHeaderSelectionDisabled = computed(() => displayData.value.length === 0);

const headerSelection = computed<CheckedState>(() => {
  const selectedValues = selected.value;

  if (!Array.isArray(selectedValues) || displayData.value.length === 0) {
    return false;
  }

  const visibleRowKeys = displayData.value.map(item => props.rowKey(item));
  const selectedValuesSet = new Set(selectedValues);
  const selectedCount = visibleRowKeys.filter(value => selectedValuesSet.has(value)).length;

  if (selectedCount === 0) {
    return false;
  }

  if (selectedCount === visibleRowKeys.length) {
    return true;
  }

  return 'indeterminate';
});

const singleSelectionName = `data-table-selection-${useId()}`;

function getDefaultExpanded() {
  if (props.defaultExpandAll) {
    return props.data.map(item => props.rowKey(item));
  }

  return props.defaultExpanded ?? [];
}

function getDefaultSortState() {
  return props.defaultSortState;
}

function getDefaultFilterState() {
  return props.defaultFilterState ?? {};
}

function getDefaultColumnWidths() {
  return props.defaultColumnWidths ?? {};
}

function resolveElement(element: Element | ComponentPublicInstance | null | undefined) {
  if (!element) {
    return null;
  }

  if (element instanceof HTMLElement) {
    return element;
  }

  if ('$el' in element && element.$el instanceof HTMLElement) {
    return element.$el;
  }

  return null;
}

function setTableContentRef(element: Element | ComponentPublicInstance | null) {
  tableContentTarget.value = resolveElement(element);
}

function setHeadCellRef(key: string, element: Element | ComponentPublicInstance | null) {
  headCellElements[key] = resolveElement(element);
}

function syncMeasuredColumnWidths() {
  measuredColumnWidths.value = leafColumns.value.reduce<Record<string, number>>((acc, column, index) => {
    const key = getTableColumnKey(column);
    const parsedWidth = parseTableColumnWidth(getColumnWidth(column));
    const measuredWidth = headCellElements[key]?.getBoundingClientRect().width;

    acc[key] = parsedWidth ?? measuredWidth ?? getMeasuredColumnWidth(column, index);

    return acc;
  }, {});
}

function toggleExpand(key: R) {
  const index = expanded.value.indexOf(key);

  if (index >= 0) {
    expanded.value = expanded.value.filter(expandedKey => expandedKey !== key);
    return;
  }

  expanded.value = [...expanded.value, key];
}

function updateHeaderChecked(state: CheckedState | null) {
  if (!Array.isArray(selected.value)) {
    return;
  }

  if (state === true) {
    setSelected(displayData.value.map(item => props.rowKey(item)));
    return;
  }

  resetSelected();
}

function isRowExpanded(key: R) {
  return expanded.value.includes(key);
}

function getRowLabel(row: T) {
  return getTableRowLabel(row, props.rowKey);
}

function getColumnSlotName(column: TableProps<T, R, M>['columns'][number]) {
  return getTableColumnKey(column);
}

function getColumnWidth(column: TableProps<T, R, M>['columns'][number]) {
  return getTableColumnWidthValue(column, columnWidths.value);
}

function getColumnMinWidth(column: TableProps<T, R, M>['columns'][number]) {
  return column.minWidth;
}

function isColumnResizable(column: TableProps<T, R, M>['columns'][number]) {
  return !isTableGroupColumn(column) && Boolean(column.resizable);
}

function getMeasuredColumnWidth(column: TableProps<T, R, M>['columns'][number], index: number) {
  const key = getTableColumnKey(column);
  const parsedWidth = parseTableColumnWidth(getColumnWidth(column));
  const measuredWidth = measuredColumnWidths.value[key];

  return parsedWidth ?? measuredWidth ?? 160 + index * 0;
}

function isColumnSortable(column: TableProps<T, R, M>['columns'][number]): column is TableDataColumn<T> {
  return isTableDataColumn(column) && Boolean(column.sorter);
}

function isColumnFilterable(column: TableProps<T, R, M>['columns'][number]): column is TableDataColumn<T> {
  return isTableDataColumn(column) && Boolean(column.filter);
}

function getColumnSortOrder(column: TableProps<T, R, M>['columns'][number]) {
  if (!isColumnSortable(column)) {
    return undefined;
  }

  const key = getTableColumnKey(column);

  return sortState.value?.key === key ? sortState.value.order : undefined;
}

function toggleColumnSort(column: TableProps<T, R, M>['columns'][number]) {
  if (!isColumnSortable(column)) {
    return;
  }

  sortState.value = toggleTableSortState(sortState.value, getTableColumnKey(column));
}

function getColumnSortIndicator(column: TableProps<T, R, M>['columns'][number]) {
  const order = getColumnSortOrder(column);

  if (order === 'asc') return '↑';
  if (order === 'desc') return '↓';

  return '↕';
}

function getColumnSortButtonLabel(column: TableProps<T, R, M>['columns'][number]) {
  const columnLabel = column.title ?? getColumnSlotName(column);
  const order = getColumnSortOrder(column);

  if (order === 'asc') {
    return `Sort by ${columnLabel}, currently ascending`;
  }

  if (order === 'desc') {
    return `Sort by ${columnLabel}, currently descending`;
  }

  return `Sort by ${columnLabel}`;
}

function getResizeHandleLabel(column: TableProps<T, R, M>['columns'][number]) {
  return `Resize ${column.title ?? getColumnSlotName(column)} column`;
}

function getColumnFilterValue(column: TableProps<T, R, M>['columns'][number]) {
  if (!isColumnFilterable(column)) {
    return '';
  }

  return filterState.value[getTableColumnKey(column)] ?? '';
}

function updateColumnFilter(column: TableProps<T, R, M>['columns'][number], value: string) {
  if (!isColumnFilterable(column)) {
    return;
  }

  filterState.value = getNextTableFilterState(filterState.value, getTableColumnKey(column), value);
}

function clearColumnFilter(column: TableProps<T, R, M>['columns'][number]) {
  updateColumnFilter(column, '');
}

function getColumnFilterPlaceholderText(column: TableProps<T, R, M>['columns'][number]) {
  if (!isColumnFilterable(column)) {
    return undefined;
  }

  return getTableFilterPlaceholder(column);
}

function getHeaderAriaSort(column: TableProps<T, R, M>['columns'][number]) {
  if (!isColumnSortable(column)) {
    return undefined;
  }

  return getTableAriaSort(getColumnSortOrder(column));
}

function getHeaderCellFixedState(column: TableProps<T, R, M>['columns'][number]) {
  if (!isTableGroupColumn(column)) {
    return getLeafCellFixedState(column);
  }

  const leaves = getTableLeafColumns([column]);
  const fixedSides = [...new Set(leaves.map(leaf => leaf.fixed).filter(Boolean))];

  if (fixedSides.length !== 1) {
    return undefined;
  }

  const side = fixedSides[0];

  if (!side) {
    return undefined;
  }

  const boundaryColumn = side === 'left' ? leaves[0] : leaves.at(-1);

  if (!boundaryColumn) {
    return undefined;
  }

  return getLeafCellFixedState(boundaryColumn);
}

function getLeafCellFixedState(column: TableProps<T, R, M>['columns'][number]) {
  const key = getTableColumnKey(column);

  if (column.fixed === 'left') {
    return {
      side: 'left' as const,
      offset: fixedColumnStates.value.leftOffsets[key] ?? 0
    };
  }

  if (column.fixed === 'right') {
    return {
      side: 'right' as const,
      offset: fixedColumnStates.value.rightOffsets[key] ?? 0
    };
  }

  return undefined;
}

function getHeaderCellStyle(column: TableProps<T, R, M>['columns'][number]) {
  const fixedState = getHeaderCellFixedState(column);

  const style: CSSProperties = {
    width: getColumnWidth(column),
    minWidth: getColumnMinWidth(column),
    position: fixedState ? 'sticky' : undefined,
    left: fixedState?.side === 'left' ? `${fixedState.offset}px` : undefined,
    right: fixedState?.side === 'right' ? `${fixedState.offset}px` : undefined,
    zIndex: fixedState ? 3 : undefined
  };

  return style;
}

function getBodyCellStyle(column: TableProps<T, R, M>['columns'][number]) {
  const fixedState = getLeafCellFixedState(column);

  const style: CSSProperties = {
    width: getColumnWidth(column),
    minWidth: getColumnMinWidth(column),
    position: fixedState ? 'sticky' : undefined,
    left: fixedState?.side === 'left' ? `${fixedState.offset}px` : undefined,
    right: fixedState?.side === 'right' ? `${fixedState.offset}px` : undefined,
    zIndex: fixedState ? 2 : undefined
  };

  return style;
}

function updateColumnWidth(key: string, width: number) {
  const nextWidth = `${Math.round(width)}px`;

  columnWidths.value = {
    ...columnWidths.value,
    [key]: nextWidth
  };
}

function getColumnResizeMinWidth(column: TableProps<T, R, M>['columns'][number]) {
  return parseTableColumnWidth(column.minWidth) ?? 80;
}

let resizeListenersCleanup: (() => void) | null = null;

function stopColumnResize() {
  resizeListenersCleanup?.();
  resizeListenersCleanup = null;
  resizingColumnKey.value = null;
}

function startColumnResize(column: TableProps<T, R, M>['columns'][number], event: PointerEvent) {
  if (!isColumnResizable(column)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const key = getTableColumnKey(column);
  const startX = event.clientX;
  const startWidth = headCellElements[key]?.getBoundingClientRect().width ?? getMeasuredColumnWidth(column, 0);
  const minWidth = getColumnResizeMinWidth(column);
  const ownerDocument = headCellElements[key]?.ownerDocument;

  if (!ownerDocument) {
    return;
  }

  resizingColumnKey.value = key;

  const handlePointerMove = (pointerEvent: PointerEvent) => {
    const nextWidth = Math.max(minWidth, startWidth + (pointerEvent.clientX - startX));

    updateColumnWidth(key, nextWidth);
  };

  const handlePointerUp = () => {
    stopColumnResize();
  };

  ownerDocument.addEventListener('pointermove', handlePointerMove);
  ownerDocument.addEventListener('pointerup', handlePointerUp);
  ownerDocument.addEventListener('pointercancel', handlePointerUp);

  resizeListenersCleanup = () => {
    ownerDocument.removeEventListener('pointermove', handlePointerMove);
    ownerDocument.removeEventListener('pointerup', handlePointerUp);
    ownerDocument.removeEventListener('pointercancel', handlePointerUp);
  };
}

function onResizeHandleKeydown(column: TableProps<T, R, M>['columns'][number], event: KeyboardEvent) {
  if (!isColumnResizable(column)) {
    return;
  }

  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const key = getTableColumnKey(column);
  const currentWidth = getMeasuredColumnWidth(column, 0);
  const delta = event.key === 'ArrowRight' ? 16 : -16;
  const nextWidth = Math.max(getColumnResizeMinWidth(column), currentWidth + delta);

  updateColumnWidth(key, nextWidth);
}

watch([leafColumns, columnWidths], () => {
  nextTick(syncMeasuredColumnWidths);
}, { deep: true, flush: 'post' });

useResizeObserver(tableContentTarget, () => {
  syncMeasuredColumnWidths();
});

onMounted(() => {
  nextTick(syncMeasuredColumnWidths);
});

onBeforeUnmount(() => {
  stopColumnResize();
});
</script>

<template>
  <TableRoot v-bind="forwardedRootProps">
    <TableContent :ref="setTableContentRef" v-bind="contentProps">
      <TableHeader v-bind="headerProps">
        <TableRow v-for="(headerRow, headerRowIndex) in headerRows" :key="headerRowIndex" v-bind="rowProps">
          <TableHead
            v-for="headerCell in headerRow"
            :key="`${headerRowIndex}-${headerCell.key}`"
            :ref="element => setHeadCellRef(headerCell.key, element)"
            v-bind="headProps"
            :class="getHeaderCellFixedState(headerCell.column) ? tableUi.fixed : undefined"
            :align="headerCell.column.align ?? (headerCell.column.type ? 'center' : 'left')"
            :style="getHeaderCellStyle(headerCell.column)"
            :colspan="headerCell.colSpan"
            :rowspan="headerCell.rowSpan"
            :aria-sort="getHeaderAriaSort(headerCell.column)"
            :data-fixed="Boolean(getHeaderCellFixedState(headerCell.column)) || undefined"
            :data-fixed-side="getHeaderCellFixedState(headerCell.column)?.side"
          >
            <slot
              name="header"
              :column="headerCell.column"
              :col-span="headerCell.colSpan"
              :row-span="headerCell.rowSpan"
              :sortable="isColumnSortable(headerCell.column)"
              :resizable="isColumnResizable(headerCell.column)"
              :sort-order="getColumnSortOrder(headerCell.column)"
              :toggle-sort="() => toggleColumnSort(headerCell.column)"
              :filter-value="getColumnFilterValue(headerCell.column)"
              :set-filter-value="(value: string) => updateColumnFilter(headerCell.column, value)"
              :clear-filter="() => clearColumnFilter(headerCell.column)"
            >
              <slot
                :name="`header-${getColumnSlotName(headerCell.column)}`"
                :column="headerCell.column"
                :col-span="headerCell.colSpan"
                :row-span="headerCell.rowSpan"
                :sortable="isColumnSortable(headerCell.column)"
                :resizable="isColumnResizable(headerCell.column)"
                :sort-order="getColumnSortOrder(headerCell.column)"
                :toggle-sort="() => toggleColumnSort(headerCell.column)"
                :filter-value="getColumnFilterValue(headerCell.column)"
                :set-filter-value="(value: string) => updateColumnFilter(headerCell.column, value)"
                :clear-filter="() => clearColumnFilter(headerCell.column)"
                :multiple="isMultiple"
                :checked="headerSelection"
                :disabled="isHeaderSelectionDisabled"
                :update-checked="updateHeaderChecked"
              >
                <template v-if="headerCell.column.type === 'index'">
                  {{ headerCell.column.title ?? '#' }}
                </template>
                <template v-else-if="headerCell.column.type === 'selection'">
                  <input
                    v-if="isMultiple"
                    type="checkbox"
                    :checked.prop="headerSelection === true"
                    :indeterminate.prop="headerSelection === 'indeterminate'"
                    :aria-checked="headerSelection === 'indeterminate' ? 'mixed' : `${headerSelection}`"
                    aria-label="Select all rows"
                    :disabled="isHeaderSelectionDisabled"
                    @change="updateHeaderChecked(($event.target as HTMLInputElement).checked)"
                  >
                </template>
                <template v-else-if="headerCell.column.type === 'expand'">
                  {{ headerCell.column.title }}
                </template>
                <template v-else>
                  <div :class="tableUi.headContent">
                    <button
                      v-if="isColumnSortable(headerCell.column)"
                      type="button"
                      :class="tableUi.sortTrigger"
                      :aria-label="getColumnSortButtonLabel(headerCell.column)"
                      @click="toggleColumnSort(headerCell.column)"
                    >
                      <span>{{ headerCell.column.title }}</span>
                      <span aria-hidden="true">{{ getColumnSortIndicator(headerCell.column) }}</span>
                    </button>
                    <span v-else>{{ headerCell.column.title }}</span>
                    <input
                      v-if="isColumnFilterable(headerCell.column)"
                      :class="tableUi.filterInput"
                      type="text"
                      :value="getColumnFilterValue(headerCell.column)"
                      :placeholder="getColumnFilterPlaceholderText(headerCell.column)"
                      :aria-label="`Filter ${headerCell.column.title ?? getColumnSlotName(headerCell.column)}`"
                      @input="updateColumnFilter(headerCell.column, ($event.target as HTMLInputElement).value)"
                    >
                  </div>
                  <button
                    v-if="isColumnResizable(headerCell.column)"
                    type="button"
                    :class="tableUi.resizeHandle"
                    :aria-label="getResizeHandleLabel(headerCell.column)"
                    :aria-pressed="resizingColumnKey === getTableColumnKey(headerCell.column)"
                    :data-resizing="resizingColumnKey === getTableColumnKey(headerCell.column) || undefined"
                    @pointerdown="startColumnResize(headerCell.column, $event)"
                    @keydown="onResizeHandleKeydown(headerCell.column, $event)"
                  />
                </template>
              </slot>
            </slot>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-bind="bodyProps">
        <template v-for="(item, index) in displayData" :key="rowKey(item)">
          <TableRow v-bind="rowProps" data-row>
            <template v-for="column in leafColumns" :key="getTableColumnKey(column)">
              <TableCell
                v-if="column.dataIndex"
                v-bind="cellProps"
                :class="getLeafCellFixedState(column) ? tableUi.fixed : undefined"
                :align="column.align ?? 'left'"
                :style="getBodyCellStyle(column)"
                :data-fixed="Boolean(getLeafCellFixedState(column)) || undefined"
                :data-fixed-side="getLeafCellFixedState(column)?.side"
              >
                <slot
                  :name="column.dataIndex"
                  :index="index"
                  :column="column"
                  :row="item"
                  :value="getTableRowValueByDataIndex(item, column.dataIndex)"
                >
                  {{ getTableRowValueByDataIndex(item, column.dataIndex) }}
                </slot>
              </TableCell>
              <TableCell
                v-else-if="column.type"
                v-bind="cellProps"
                :class="getLeafCellFixedState(column) ? tableUi.fixed : undefined"
                :align="column.align ?? 'center'"
                :style="getBodyCellStyle(column)"
                :data-fixed="Boolean(getLeafCellFixedState(column)) || undefined"
                :data-fixed-side="getLeafCellFixedState(column)?.side"
              >
                <slot v-if="column.type === 'index'" name="index" :index="index" :column="column" :row="item">
                  {{ index + 1 }}
                </slot>
                <slot
                  v-else-if="column.type === 'selection'"
                  name="selection"
                  :index="index"
                  :column="column"
                  :row="item"
                  :multiple="isMultiple"
                  :checked="isValueSelected(rowKey(item))"
                  :toggle-select="() => onSelectedChange(rowKey(item))"
                >
                  <input
                    v-if="isMultiple"
                    type="checkbox"
                    :checked="isValueSelected(rowKey(item))"
                    :aria-label="`Select row ${getRowLabel(item)}`"
                    @change="onSelectedChange(rowKey(item))"
                  >
                  <input
                    v-else
                    type="radio"
                    :name="singleSelectionName"
                    :checked="isValueSelected(rowKey(item))"
                    :aria-label="`Select row ${getRowLabel(item)}`"
                    @click="onSelectedChange(rowKey(item))"
                  >
                </slot>
                <slot
                  v-else-if="column.type === 'expand'"
                  name="expand"
                  :index="index"
                  :column="column"
                  :row="item"
                  :expanded="isRowExpanded(rowKey(item))"
                  :toggle-expand="() => toggleExpand(rowKey(item))"
                >
                  <button
                    type="button"
                    :aria-expanded="isRowExpanded(rowKey(item))"
                    :aria-label="isRowExpanded(rowKey(item)) ? 'Collapse row' : 'Expand row'"
                    @click="toggleExpand(rowKey(item))"
                  >
                    {{ isRowExpanded(rowKey(item)) ? '−' : '+' }}
                  </button>
                </slot>
              </TableCell>
            </template>
          </TableRow>
          <TableRow v-if="hasExpandColumn && isRowExpanded(rowKey(item))" v-bind="rowProps" data-expanded-row>
            <TableCell v-bind="cellProps" :colspan="leafColumns.length">
              <slot name="expanded-row" :index="index" :row="item" />
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
      <TableFooter v-if="$slots.footer" v-bind="footerProps">
        <slot name="footer" :column-size="leafColumns.length" />
      </TableFooter>
    </TableContent>
  </TableRoot>
</template>
