import { computed } from 'vue';
import { useContext } from '../../composables';
import type { PaginationRootContextParams, PaginationThemeContextParams } from './types';

export const [providePaginationRootContext, usePaginationRootContext] = useContext(
  'PaginationRoot',
  (params: PaginationRootContextParams) => {
    const { page, total, itemsPerPage } = params;

    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / (itemsPerPage.value || 1))));

    const onPageChange = (value: number) => {
      page.value = value;
    };

    return {
      ...params,
      onPageChange,
      pageCount
    };
  }
);

export const [providePaginationThemeContext, usePaginationThemeContext] = useContext(
  'PaginationTheme',
  (params: PaginationThemeContextParams) => params
);
