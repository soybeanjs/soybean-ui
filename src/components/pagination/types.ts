import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { ClassValue, PropsToContext } from '../../types';

export interface PaginationRootProps extends /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the current page. Can be bound as `v-model:page`. */
  page?: number;
  /**
   * The value of the page that should be active when initially rendered. Use when you do not need to control the value
   * state.
   */
  defaultPage?: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Number of items in your list */
  total?: number;
  /** Number of sibling should be shown around the current page */
  siblingCount?: number;
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean;
  /** When `true`, always show first page, last page, and ellipsis */
  showEdges?: boolean;
}

export type PaginationRootEmits = {
  /** Event handler called when the page value changes */
  'update:page': [value: number];
};

export interface PaginationListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PaginationListItemProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Value for the page */
  value: number;
}

export interface PaginationEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PaginationButtonProps extends /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PaginationRootContextParams
  extends PropsToContext<
    Required<PaginationRootProps>,
    'total' | 'siblingCount' | 'disabled' | 'showEdges' | 'itemsPerPage'
  > {
  page: ShallowRef<number>;
}

export type PaginationThemeSlot = 'root' | 'list' | 'listItem' | 'ellipsis' | 'first' | 'prev' | 'next' | 'last';

export interface PaginationThemeContextParams {
  ui: ComputedRef<Record<PaginationThemeSlot, ClassValue>>;
}

export interface PageEllipsis {
  type: 'ellipsis';
}

export interface PageItem {
  type: 'page';
  value: number;
}

export type Pages = Array<PageEllipsis | PageItem>;
