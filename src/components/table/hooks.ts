import { shallowRef, watch } from 'vue';
import { useTable as _useTable } from '@soybeanjs/hooks';
import type { UseTableOptions as _UseTableOptions, TableColumnCheck } from '@soybeanjs/hooks';
import type { TableColumn } from './types';

export type UseTableOptions<ResponseData, ApiData, Pagination extends boolean> = Omit<
  _UseTableOptions<ResponseData, ApiData, TableColumn<ApiData>, Pagination>,
  'pagination' | 'getColumnChecks' | 'getColumns'
>;

export function useTable<ResponseData, ApiData>(options: UseTableOptions<ResponseData, ApiData, false>) {
  const result = _useTable<ResponseData, ApiData, TableColumn<ApiData>, false>({
    ...options,
    getColumnChecks,
    getColumns
  });

  return result;
}

export type UsePaginatedTableOptions<ResponseData, ApiData> = UseTableOptions<ResponseData, ApiData, true> & {
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

export function usePaginatedTable<ResponseData, ApiData>(options: UsePaginatedTableOptions<ResponseData, ApiData>) {
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
    const { type, dataIndex, title, hidden } = col;

    if (type) return;

    const key = dataIndex as string;

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
  const checksMap = new Map<string, TableColumnCheck>();

  checks.forEach(check => {
    if (check.checked) {
      checksMap.set(check.key, check);
    }
  });

  return columns.filter(col => {
    if (col.type) return true;

    const current = checksMap.get(col.dataIndex as string);

    return current && !current.hidden;
  });
}
