import { shallowRef, watch } from 'vue';
import { useTable as _useTable } from '@soybeanjs/hooks';
import { getTableColumnKey, isTableGroupColumn } from '@soybeanjs/headless/table';
import type { UseTableOptions as _UseTableOptions, TableColumnCheck } from '@soybeanjs/hooks';
import type { BaseTableData, TableColumn, TableColumnType } from './types';

export type UseTableOptions<ResponseData, ApiData extends BaseTableData, Pagination extends boolean> = Omit<
  _UseTableOptions<ResponseData, ApiData, TableColumn<ApiData>, Pagination>,
  'pagination' | 'getColumnChecks' | 'getColumns'
>;

export function useTable<ResponseData, ApiData extends BaseTableData>(options: UseTableOptions<ResponseData, ApiData, false>) {
  const result = _useTable<ResponseData, ApiData, TableColumn<ApiData>, false>({
    ...options,
    getColumnChecks,
    getColumns
  });

  return result;
}

export type UsePaginatedTableOptions<ResponseData, ApiData extends BaseTableData> = UseTableOptions<
  ResponseData,
  ApiData,
  true
> & {
  page?: number;
  pageSize?: number;
  /**
   * Whether to fetch data when page or pageSize changes. [是否在 page 或 pageSize 变化时自动请求数据]
   *
   * Set this to `false` if you want to handle pagination change manually, such as fetching data in a parent component. [如果你想手动处理分页变化，比如在父组件中请求数据，可以将此项设置为 `false`]
   *
   * In this case, you can listen to `update:page` and `update:pageSize` events to get the current page and page size. [在这种情况下，你可以监听 `update:page` 和 `update:pageSize` 事件来获取当前页码和每页条数]
   *
   * @default true
   */
  fetchOnPaginationChange?: boolean;
};

export function usePaginatedTable<ResponseData, ApiData extends BaseTableData>(
  options: UsePaginatedTableOptions<ResponseData, ApiData>
) {
  const { page: _page = 1, pageSize: _pageSize = 10, fetchOnPaginationChange = true, onFetched } = options;

  const page = shallowRef(_page);
  const pageSize = shallowRef(_pageSize);
  const total = shallowRef(0);

  const result = _useTable<ResponseData, ApiData, TableColumn<ApiData>, true>({
    ...options,
    pagination: true,
    getColumnChecks,
    getColumns,
    onFetched: data => {
      if (data.total && data.total !== total.value) {
        total.value = data.total;
      }
      if (data.page && data.page !== page.value) {
        page.value = data.page;
      }
      if (data.pageSize && data.pageSize !== pageSize.value) {
        pageSize.value = data.pageSize;
      }

      onFetched?.(data);
    }
  });

  watch(
    [page, pageSize],
    () => {
      if (fetchOnPaginationChange) {
        result.fetchData();
      }
    },
    { flush: 'post' }
  );

  return {
    page,
    pageSize,
    total,
    ...result
  };
}

function getColumnChecks<T extends TableColumn<any>>(columns: T[]) {
  const cols: TableColumnCheck[] = [];

  columns.forEach(col => {
    if (isTableGroupColumn(col)) {
      cols.push(...getColumnChecks(col.children));
      return;
    }

    const { type, title, hidden } = col;

    // Group columns are flattened above, so only leaf data columns participate in visibility checks.
    if (type || !col.dataIndex) return;

    const key = getTableColumnKey(col);

    const column: TableColumnCheck = {
      key,
      title: title || key,
      checked: true,
      hidden,
      fixed: false
    };

    cols.push(column);
  });

  return cols;
}

function getColumns<T extends TableColumn<any>>(columns: T[], checks: TableColumnCheck[]) {
  const typeColumnsMap = new Map<TableColumnType, { column: T; index: number }>();
  const checksMap = new Map(checks.map(check => [check.key, check]));

  columns.forEach((column, index) => {
    if (column.type) {
      typeColumnsMap.set(column.type, { column: column, index });
      return;
    }
  });

  return columns.reduce<T[]>((acc, column, index) => {
    if (column.type) {
      const typeColumn = typeColumnsMap.get(column.type);

      if (!typeColumn || typeColumn.index !== index) {
        return acc;
      }

      acc.push(column);
      return acc;
    }

    if (isTableGroupColumn(column)) {
      const nextChildren = getColumns(column.children, checks);

      if (nextChildren.length > 0) {
        acc.push({
          ...column,
          children: nextChildren
        });
      }

      return acc;
    }

    const check = checksMap.get(getTableColumnKey(column));

    if (check?.checked !== false) {
      acc.push(column);
    }

    return acc;
  }, []);
}
