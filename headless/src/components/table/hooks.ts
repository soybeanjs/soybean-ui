import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, toValue, watch, mergeProps } from 'vue';
import type { ComputedRef, MaybeRefOrGetter, ShallowRef } from 'vue';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { useTableCompactContext, useTableUi } from './context';
import { useControllableState, useForwardElement, useSelection } from '../../composables';
import { getElFromTemplateRef, getMergedRefsValue, pick } from '../../shared';
import type { CheckedState, VNodeRef, PropsToContext } from '../../types';
import {
  buildTableTree,
  filterTableColumns,
  flattenTableTree,
  getDefaultTableExpandedKeys,
  getNextTableColumnWidths,
  getNextTableExpandedKeys,
  getNextTableFilterKeywordState,
  getNextTableFilterState,
  getNextTableFilterValuesState,
  getProcessedTableTree,
  getTableAriaSort,
  getTableCellStyle,
  getTableColumnFilterOptions,
  getTableColumnFilterStateValue,
  getTableColumnFilterValue,
  getTableColumnFilterValues,
  getTableColumnWidthValue,
  getTableColumnLabel,
  getTableColumnSortOrder,
  getTableFixedColumnOffsets,
  getTableHeaderRows,
  getTableHeaderSelectionState,
  getTableHeaderFixedState,
  getTableLeafColumns,
  getTableLeafFixedState,
  getTableMeasuredColumnWidth,
  getTableMeasuredColumnWidths,
  getTableResizeHandleLabel,
  getTableResolvedHeight,
  getTableRowExpandLabel,
  getTableSelectRowLabel,
  getTableRowLabel,
  getTableRowValueByDataIndex,
  getTableSortButtonLabel,
  getTableTreeRows,
  getTableTreeCellStyle,
  getTableTreeColumnKey,
  getTableVirtualMeasurements,
  getTableVirtualPaddingEnd,
  getTableVirtualPaddingStart,
  getTableVirtualRange,
  getTableVisibleExpandedKeys,
  getTableVisibleRows,
  hasTableTreeChildren,
  isTableColumnFiltered,
  isTableDataColumn,
  getTableColumnKey,
  getNextTableKeyboardResizeWidth,
  getNextTablePointerResizeWidth,
  getTableColumnResizeMinWidth,
  getTableAlign,
  getTableRootStyle,
  isTableColumnResizable,
  isTableFilterOptionSelected,
  isTableFilterableColumn,
  isTableRowExpanded,
  isTableSortableColumn,
  isTableTreeColumn,
  shouldRenderTableExpandedRow,
  shouldShowTableInlineTreeToggle,
  toggleTableFilterOption,
  toggleTableSortState
} from './shared';
import type {
  TableCellSlotProps,
  TableColumnWidthState,
  TableColumn,
  TableDataCellSlotProps,
  TableCompactEmits,
  TableExpandSlotProps,
  TableFilterState,
  TableFilterValue,
  TableHeaderFilterSlotProps,
  TableHeaderSelectionSlotProps,
  TableHeaderSlotProps,
  TableIndexSlotProps,
  TableCompactProps,
  TableHeaderResizeSlotProps,
  TableSelectionSlotProps,
  TableHeaderSortSlotProps,
  TableSortState,
  TableTreeRow,
  TableTreeToggleSlotProps,
  TableVisibleRow,
  TableUnifiedKey,
  TableCompactHeadProps
} from './types';

type TableCompactEmitFn<R extends string | number, M extends boolean> = <K extends keyof TableCompactEmits<R, M>>(
  event: K,
  ...args: TableCompactEmits<R, M>[K]
) => void;

interface UseTableCompactStateOptions {
  props: TableCompactProps;
  emit: TableCompactEmitFn<TableUnifiedKey, boolean>;
  hasExpandedRowSlot: MaybeRefOrGetter<boolean>;
}

export function useTableCompactState(options: UseTableCompactStateOptions) {
  const { props, emit, hasExpandedRowSlot } = options;

  const expanded = useControllableState(
    () => props.expanded,
    value => {
      emit('update:expanded', value ?? []);
    },
    getDefaultTableExpandedKeys(props.data, props.rowKey, {
      getChildren: props.getChildren,
      defaultExpandAll: props.defaultExpandAll,
      defaultExpanded: props.defaultExpanded,
      includeLeaves: Boolean(toValue(hasExpandedRowSlot))
    })
  ) as ShallowRef<TableUnifiedKey[]>;

  const sortState = useControllableState(
    () => props.sortState,
    value => {
      emit('update:sortState', value);
    },
    props.defaultSortState
  );

  const filterState = useControllableState(
    () => props.filterState,
    value => {
      emit('update:filterState', value ?? {});
    },
    props.defaultFilterState ?? {}
  ) as ShallowRef<TableFilterState>;

  const columnWidths = useControllableState(
    () => props.columnWidths,
    value => {
      emit('update:columnWidths', value ?? {});
    },
    props.defaultColumnWidths ?? {}
  ) as ShallowRef<TableColumnWidthState>;

  const {
    modelValue: selected,
    onModelValueChange: onSelectedChange,
    setModelValue: setSelected,
    resetModelValue: resetSelected,
    isMultiple: multiple,
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

  return {
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
  };
}

interface UseTableCompactDataOptions {
  props: TableCompactProps;
  expanded: ShallowRef<TableUnifiedKey[]>;
  sortState: ShallowRef<TableSortState | undefined>;
  filterState: ShallowRef<TableFilterState>;
  selected: ShallowRef<TableUnifiedKey[] | TableUnifiedKey | undefined>;
  hasExpandedRowSlot: ComputedRef<boolean>;
}

export function useTableCompactData(options: UseTableCompactDataOptions) {
  const { props, expanded, sortState, filterState, selected, hasExpandedRowSlot } = options;

  const visibleColumns = computed(() => filterTableColumns(props.columns));
  const leafColumns = computed(() => getTableLeafColumns(visibleColumns.value));
  const headerRows = computed(() => getTableHeaderRows(visibleColumns.value));

  const columnMap = computed(() => {
    return new Map(leafColumns.value.map(column => [getTableColumnKey(column), column]));
  });

  const sourceTree = computed(() => buildTableTree(props.data, props.rowKey, props.getChildren));
  const hasTreeRows = computed(() => hasTableTreeChildren(sourceTree.value));
  const sourceRows = computed(() => getTableTreeRows(sourceTree.value));

  const processedTree = computed(() =>
    getProcessedTableTree(sourceTree.value, filterState.value, columnMap.value, sortState.value)
  );

  const isFiltering = computed(() => Object.keys(filterState.value).length > 0);

  const visibleExpandedKeys = computed(() => {
    return getTableVisibleExpandedKeys(hasTreeRows.value, isFiltering.value, expanded.value, processedTree.value);
  });

  const displayRows = computed(() => flattenTableTree(processedTree.value, visibleExpandedKeys.value));
  const visibleRowKeys = computed(() => displayRows.value.map(row => row.key));
  const treeColumnKey = computed(() => getTableTreeColumnKey(leafColumns.value));
  const hasExpandColumn = computed(() => leafColumns.value.some(column => column.type === 'expand'));
  const isHeaderSelectionDisabled = computed(() => displayRows.value.length === 0);
  const headerSelection = computed<CheckedState>(() =>
    getTableHeaderSelectionState(selected.value, visibleRowKeys.value)
  );

  return {
    visibleColumns,
    leafColumns,
    headerRows,
    sourceTree,
    hasTreeRows,
    sourceRows,
    processedTree,
    isFiltering,
    visibleExpandedKeys,
    displayRows,
    visibleRowKeys,
    treeColumnKey,
    hasExpandColumn,
    isHeaderSelectionDisabled,
    headerSelection,
    hasExpandedRowSlot
  };
}

interface UseTableCompactResizeOptions {
  leafColumns: ComputedRef<TableColumn[]>;
  columnWidths: ShallowRef<TableColumnWidthState>;
}

export function useTableCompactResize(options: UseTableCompactResizeOptions) {
  const { leafColumns, columnWidths } = options;

  const [tableContentTarget, setTableContentRef] = useForwardElement<HTMLElement>();
  const measuredColumnWidths = shallowRef<Record<string, number>>({});
  const resizingColumnKey = shallowRef<string | null>(null);
  const headCellElements: Record<string, HTMLElement | null> = {};

  function syncMeasuredColumnWidths() {
    measuredColumnWidths.value = getTableMeasuredColumnWidths(leafColumns.value, {
      columnWidths: columnWidths.value,
      headCellElements,
      measuredColumnWidths: measuredColumnWidths.value
    });
  }

  const fixedColumnStates = computed(() =>
    getTableFixedColumnOffsets(leafColumns.value, column =>
      getTableMeasuredColumnWidth(column, columnWidths.value, measuredColumnWidths.value)
    )
  );

  watch(
    [leafColumns, columnWidths],
    () => {
      nextTick(syncMeasuredColumnWidths);
    },
    { deep: true, flush: 'post' }
  );

  useResizeObserver(tableContentTarget, () => {
    syncMeasuredColumnWidths();
  });

  onBeforeUnmount(() => {
    resizingColumnKey.value = null;
  });

  return {
    setTableContentRef,
    tableContentTarget,
    headCellElements,
    measuredColumnWidths,
    syncMeasuredColumnWidths,
    resizingColumnKey,
    fixedColumnStates
  };
}

interface UseTableCompactVirtualOptions extends PropsToContext<
  TableCompactProps,
  'height' | 'virtual' | 'virtualizerOptions' | 'estimateSize'
> {
  displayRows: ComputedRef<TableTreeRow[]>;
  syncMeasuredColumnWidths: () => void;
}

export function useTableCompactVirtual(options: UseTableCompactVirtualOptions) {
  const { virtual, height, virtualizerOptions, estimateSize, displayRows, syncMeasuredColumnWidths } = options;

  const virtualViewportHeight = shallowRef(0);
  const virtualScrollTop = shallowRef(0);
  const isVirtual = computed(() => Boolean(virtual.value && height.value !== undefined));

  function resetVirtualState() {
    virtualViewportHeight.value = 0;
    virtualScrollTop.value = 0;
  }

  const [tableRootTarget, setTableRootRef] = useForwardElement<HTMLElement>(element => {
    if (!isVirtual.value) {
      return;
    }

    virtualViewportHeight.value = element.clientHeight ?? 0;
    virtualScrollTop.value = element.scrollTop ?? 0;
  });

  const tableRootStyle = computed(() => getTableRootStyle(isVirtual.value, height.value));
  const virtualTableRootTarget = computed(() => (isVirtual.value ? tableRootTarget.value : undefined));
  const virtualOverscan = computed(() => (isVirtual.value ? (virtualizerOptions.value?.overscan ?? 8) : 0));

  const resolvedVirtualHeight = computed(() => {
    if (!isVirtual.value) {
      return 0;
    }

    return getTableResolvedHeight(virtualViewportHeight.value, height.value);
  });

  function syncVirtualStateFromRoot() {
    if (!isVirtual.value) {
      resetVirtualState();
      return;
    }

    virtualViewportHeight.value = tableRootTarget.value?.clientHeight ?? resolvedVirtualHeight.value;
    virtualScrollTop.value = tableRootTarget.value?.scrollTop ?? 0;
  }

  const virtualMeasurements = computed(() => {
    if (!isVirtual.value) {
      return [];
    }

    return getTableVirtualMeasurements(displayRows.value, estimateSize.value);
  });

  const virtualRange = computed(() => {
    return getTableVirtualRange({
      isVirtual: isVirtual.value,
      rowCount: displayRows.value.length,
      viewportHeight: resolvedVirtualHeight.value,
      scrollTop: virtualScrollTop.value,
      measurements: virtualMeasurements.value,
      overscan: virtualOverscan.value
    });
  });

  const virtualPaddingStart = computed(() => {
    return getTableVirtualPaddingStart(isVirtual.value, virtualRange.value, virtualMeasurements.value);
  });

  const virtualPaddingEnd = computed(() => {
    return getTableVirtualPaddingEnd(isVirtual.value, virtualRange.value, virtualMeasurements.value);
  });

  const visibleRows = computed<TableVisibleRow[]>(() =>
    getTableVisibleRows(displayRows.value, isVirtual.value, virtualRange.value)
  );

  watch(
    displayRows,
    () => {
      if (!isVirtual.value) {
        return;
      }

      nextTick(() => {
        virtualScrollTop.value = tableRootTarget.value?.scrollTop ?? 0;
      });
    },
    { deep: true, flush: 'post' }
  );

  watch(
    isVirtual,
    value => {
      if (!value) {
        resetVirtualState();
        return;
      }

      nextTick(syncVirtualStateFromRoot);
    },
    { flush: 'post' }
  );

  useResizeObserver(virtualTableRootTarget, entries => {
    virtualViewportHeight.value = entries[0]?.contentRect.height ?? tableRootTarget.value?.clientHeight ?? 0;
  });

  useEventListener(virtualTableRootTarget, 'scroll', event => {
    const target = event.target;

    if (target instanceof HTMLElement) {
      virtualScrollTop.value = target.scrollTop;
    }
  });

  onMounted(() => {
    nextTick(() => {
      syncMeasuredColumnWidths();
      syncVirtualStateFromRoot();
    });
  });

  return {
    isVirtual,
    setTableRootRef,
    tableRootStyle,
    virtualPaddingStart,
    virtualPaddingEnd,
    visibleRows
  };
}

export function useTableCompactHead(options: PropsToContext<TableCompactHeadProps>) {
  const {
    dir,
    headProps,
    headCellElements,
    columnWidths,
    measuredColumnWidths,
    fixedColumnStates,
    sortState,
    filterState: contextFilterState,
    sourceRows,
    selected,
    multiple,
    visibleRowKeys,
    resizingColumnKey,
    headerSelection: checked,
    isHeaderSelectionDisabled: disabled
  } = useTableCompactContext('TableCompactHead');
  const ui = useTableUi();
  const { column, colSpan, rowSpan } = options;

  const columnKey = computed(() => getTableColumnKey(column.value));
  const sortOrder = computed(() => getTableColumnSortOrder(column.value, sortState.value));
  const sortable = computed(() => isTableSortableColumn(column.value));
  const filterable = computed(() => isTableFilterableColumn(column.value));
  const resizable = computed(() => isTableColumnResizable(column.value));
  const columnLabel = computed(() => getTableColumnLabel(column.value));
  const sortAriaLabel = computed(() => getTableSortButtonLabel(columnLabel.value, sortOrder.value));
  const headerAriaSort = computed(() => getTableAriaSort(sortOrder.value));
  const filterValue = computed(() => {
    if (!filterable.value) {
      return '';
    }

    return getTableColumnFilterValue(contextFilterState.value, columnKey.value);
  });
  const filterValues = computed(() => {
    if (!filterable.value) {
      return [];
    }

    return getTableColumnFilterValues(contextFilterState.value, columnKey.value);
  });
  const filterState = computed(() => {
    if (!filterable.value) {
      return undefined;
    }
    return getTableColumnFilterStateValue(contextFilterState.value, columnKey.value);
  });

  const filterOptions = computed(() => {
    if (!isTableFilterableColumn(column.value)) {
      return [];
    }

    return getTableColumnFilterOptions(sourceRows.value, column.value);
  });

  const filtered = computed(() => {
    if (!filterable.value) {
      return false;
    }

    return isTableColumnFiltered(contextFilterState.value, columnKey.value);
  });

  const toggleSort = () => {
    if (!sortable.value) {
      return;
    }

    sortState.value = toggleTableSortState(sortState.value, columnKey.value);
  };

  const setFilterValue = (value: string) => {
    if (!filterable.value) {
      return;
    }

    contextFilterState.value = getNextTableFilterKeywordState(contextFilterState.value, columnKey.value, value);
  };

  const setFilterValues = (values: string[]) => {
    if (!filterable.value) {
      return;
    }

    contextFilterState.value = getNextTableFilterValuesState(contextFilterState.value, columnKey.value, values);
  };

  const setFilterState = (value: TableFilterValue | undefined) => {
    if (!filterable.value) {
      return;
    }

    contextFilterState.value = getNextTableFilterState(contextFilterState.value, columnKey.value, value);
  };

  const toggleFilterOption = (value: string) => {
    if (!filterable.value) {
      return;
    }

    contextFilterState.value = toggleTableFilterOption(contextFilterState.value, columnKey.value, value);
  };

  const isFilterOptionSelected = (value: string) => {
    if (!filterable.value) {
      return false;
    }

    return isTableFilterOptionSelected(contextFilterState.value, columnKey.value, value);
  };

  const clearFilter = () => {
    setFilterState(undefined);
  };

  const updateChecked = (state: CheckedState | null) => {
    if (!Array.isArray(selected.value)) {
      return;
    }

    if (state === true) {
      selected.value = [...visibleRowKeys.value] as typeof selected.value;
      return;
    }

    selected.value = [] as typeof selected.value;
  };

  const bindProps = computed(() => {
    const fixedState = getTableHeaderFixedState(column.value, fixedColumnStates.value);
    const headCellStyle = getTableCellStyle({
      width: getTableColumnWidthValue(column.value, columnWidths.value),
      minWidth: column.value.minWidth,
      textAlign: getTableAlign(column.value),
      fixedState,
      zIndex: 3
    });

    return mergeProps(
      { ...headProps.value },
      {
        class: fixedState ? ui.value.fixed : undefined,
        style: headCellStyle,
        colspan: colSpan.value,
        rowspan: rowSpan.value,
        'aria-sort': headerAriaSort.value,
        'data-fixed': fixedState ? '' : undefined,
        'data-fixed-side': fixedState?.side
      }
    );
  });

  const headerSlotProps = computed<TableHeaderSlotProps>(() => {
    return {
      ...getMergedRefsValue({
        column,
        colSpan,
        rowSpan,
        sortable,
        filterable,
        filtered,
        resizable,
        sortOrder,
        multiple,
        checked,
        disabled,
        filterValue,
        filterValues,
        filterState,
        filterOptions
      }),
      updateChecked,
      toggleSort,
      setFilterValue,
      setFilterValues,
      setFilterState,
      toggleFilterOption,
      isFilterOptionSelected,
      clearFilter
    };
  });
  const headerSelectionSlotProps = computed<TableHeaderSelectionSlotProps>(() => ({
    column: column.value,
    multiple: multiple.value,
    checked: checked.value,
    disabled: disabled.value,
    updateChecked
  }));
  const headerFilterSlotProps = computed<TableHeaderFilterSlotProps>(() =>
    pick(headerSlotProps.value, [
      'column',
      'filterValue',
      'filterValues',
      'filterState',
      'filtered',
      'filterOptions',
      'toggleFilterOption',
      'isFilterOptionSelected',
      'setFilterValue',
      'setFilterValues',
      'setFilterState',
      'clearFilter'
    ])
  );
  const sortSlotProps = computed<TableHeaderSortSlotProps>(() => ({
    column: column.value,
    sortOrder: sortOrder.value,
    ariaLabel: sortAriaLabel.value,
    toggleSort
  }));
  const resizeSlotProps = computed<TableHeaderResizeSlotProps>(() => ({
    column: column.value,
    resizing: resizingColumnKey.value === columnKey.value,
    ariaLabel: getTableResizeHandleLabel(columnLabel.value),
    onPointerdown: event => startColumnResize(event),
    onKeydown: event => onResizeHandleKeydown(event)
  }));

  let resizeListenersCleanup: (() => void) | null = null;

  const stopColumnResize = () => {
    resizeListenersCleanup?.();
    resizeListenersCleanup = null;
    resizingColumnKey.value = null;
  };

  const startColumnResize = (event: PointerEvent) => {
    if (!resizable.value) return;

    event.preventDefault();
    event.stopPropagation();

    const key = columnKey.value;
    const startX = event.clientX;
    const startWidth =
      headCellElements[key]?.getBoundingClientRect().width ??
      getTableMeasuredColumnWidth(column.value, columnWidths.value, measuredColumnWidths.value);
    const minWidth = getTableColumnResizeMinWidth(column.value.minWidth);
    const ownerDocument = headCellElements[key]?.ownerDocument;

    if (!ownerDocument) {
      return;
    }

    resizingColumnKey.value = key;

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      const nextWidth = getNextTablePointerResizeWidth(startWidth, startX, pointerEvent.clientX, minWidth, dir.value);

      columnWidths.value = getNextTableColumnWidths(columnWidths.value, key, nextWidth);
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
  };

  const onResizeHandleKeydown = (event: KeyboardEvent) => {
    if (!resizable.value) {
      return;
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const key = columnKey.value;
    const currentWidth = getTableMeasuredColumnWidth(column.value, columnWidths.value, measuredColumnWidths.value);
    const nextWidth = getNextTableKeyboardResizeWidth(
      currentWidth,
      event.key === 'ArrowRight' ? 'increase' : 'decrease',
      getTableColumnResizeMinWidth(column.value.minWidth),
      dir.value
    );

    columnWidths.value = getNextTableColumnWidths(columnWidths.value, key, nextWidth);
  };

  const setElementRef = (nodeRef: VNodeRef) => {
    const element = getElFromTemplateRef(nodeRef) ?? null;
    headCellElements[columnKey.value] = element;
  };

  onBeforeUnmount(() => {
    stopColumnResize();
  });

  return {
    bindProps,
    setElementRef,
    headerSlotProps,
    headerSelectionSlotProps,
    headerFilterSlotProps,
    sortSlotProps,
    resizeSlotProps,
    columnSlotName: columnKey,
    sortable,
    filterable,
    resizable
  };
}

interface TableCompactCellOptions {
  column: TableColumn;
  row: TableTreeRow;
  index: number;
}

export function useTableCompactCell(options: PropsToContext<TableCompactCellOptions>) {
  const {
    indent,
    rowKey,
    columnWidths,
    fixedColumnStates,
    visibleExpandedKeys,
    expanded,
    hasTreeRows,
    treeColumnKey,
    hasExpandColumn,
    isValueSelected,
    onSelectedChange,
    multiple,
    cellProps
  } = useTableCompactContext('TableCompactCell');

  const ui = useTableUi();
  const { column, row, index } = options;

  const toggleExpand = (key: TableUnifiedKey) => {
    expanded.value = getNextTableExpandedKeys(expanded.value, key);
  };

  const getCellSlotProps = ($column: TableColumn, $row: TableTreeRow, $index: number) => {
    return {
      index: $index,
      column: $column,
      row: $row.row,
      level: $row.level,
      hasChildren: $row.hasChildren,
      expanded: isTableRowExpanded(visibleExpandedKeys.value, $row.key),
      toggleExpand: () => toggleExpand($row.key)
    } satisfies TableCellSlotProps;
  };

  const bindProps = computed(() => {
    const fixedState = getTableLeafFixedState(column.value, fixedColumnStates.value);
    const bodyCellStyle = getTableCellStyle({
      width: getTableColumnWidthValue(column.value, columnWidths.value),
      minWidth: column.value.minWidth,
      textAlign: getTableAlign(column.value),
      fixedState,
      zIndex: 2
    });

    return mergeProps(
      { ...cellProps.value },
      {
        class: fixedState ? ui.value.fixed : undefined,
        style: bodyCellStyle,
        'data-fixed': fixedState ? '' : undefined,
        'data-fixed-side': fixedState?.side
      }
    );
  });

  const dataColumn = computed(() => (isTableDataColumn(column.value) ? column.value : undefined));

  const dataCellSlotProps = computed(() => {
    if (!dataColumn.value) {
      return undefined;
    }

    return {
      ...getCellSlotProps(dataColumn.value, row.value, index.value),
      value: getTableRowValueByDataIndex(row.value.row, dataColumn.value.dataIndex)
    } satisfies TableDataCellSlotProps;
  });

  const isTreeColumn = computed(() => isTableTreeColumn(column.value, hasTreeRows.value, treeColumnKey.value));

  const showInlineTreeToggle = computed(() =>
    shouldShowTableInlineTreeToggle(column.value, hasTreeRows.value, treeColumnKey.value, hasExpandColumn.value)
  );

  const treeCellStyle = computed(() => getTableTreeCellStyle(hasTreeRows.value, row.value.level, indent.value ?? 16));

  const treeToggleSlotProps = computed<TableTreeToggleSlotProps>(() => ({
    ...getCellSlotProps(column.value, row.value, index.value),
    ariaLabel: getTableRowExpandLabel(
      getTableRowLabel(row.value.row, rowKey),
      isTableRowExpanded(visibleExpandedKeys.value, row.value.key)
    )
  }));

  const indexSlotProps = computed<TableIndexSlotProps>(() => ({
    index: index.value,
    column: column.value,
    row: row.value.row,
    level: row.value.level,
    hasChildren: row.value.hasChildren
  }));

  const selectionSlotProps = computed<TableSelectionSlotProps>(() => ({
    ...getCellSlotProps(column.value, row.value, index.value),
    multiple: multiple.value,
    checked: isValueSelected(row.value.key),
    ariaLabel: getTableSelectRowLabel(getTableRowLabel(row.value.row, rowKey)),
    toggleSelect: () => onSelectedChange(row.value.key)
  }));

  const expandSlotProps = computed<TableExpandSlotProps>(() => ({
    ...getCellSlotProps(column.value, row.value, index.value),
    ariaLabel: getTableRowExpandLabel(
      getTableRowLabel(row.value.row, rowKey),
      isTableRowExpanded(visibleExpandedKeys.value, row.value.key)
    )
  }));

  return {
    bindProps,
    dataColumn,
    isTreeColumn,
    showInlineTreeToggle,
    treeCellStyle,
    dataCellSlotProps,
    indexSlotProps,
    selectionSlotProps,
    expandSlotProps,
    treeToggleSlotProps
  };
}

interface TableCompactExpandedRowOptions {
  row: TableTreeRow;
  index: number;
}

export function useTableCompactExpandedRow(options: PropsToContext<TableCompactExpandedRowOptions>) {
  const { hasExpandColumn, hasExpandedRowSlot, visibleExpandedKeys, rowProps, cellProps } =
    useTableCompactContext('TableCompactExpandedRow');

  const { row: treeRow, index } = options;

  const visible = computed(() =>
    shouldRenderTableExpandedRow(
      treeRow.value,
      getMergedRefsValue({
        hasExpandColumn,
        hasExpandedRowSlot,
        expandedKeys: visibleExpandedKeys
      })
    )
  );

  const expandedRowSlotProps = computed(() => {
    const { row, level, hasChildren } = treeRow.value;

    return {
      index: index.value,
      row,
      level,
      hasChildren
    };
  });

  return {
    visible,
    expandedRowSlotProps,
    rowProps,
    cellProps
  };
}
