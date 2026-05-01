import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { PropsToContext, UiClass } from '../../types';

export interface PaginationRootProps extends /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the current page. Can be bound as `v-model:page`. */
  page?: number;
  /**
   * The value of the page that should be active when initially rendered. Use when you do not need to control the value
   * state.
   */
  defaultPage?: number;
  /** Number of items per page */
  pageSize?: number;
  /**
   * The default value of `pageSize` when initially rendered. Use when you do not need to control the value state.
   *
   * @default 10
   */
  defaultPageSize?: number;
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
  /** Event handler called when the page size value changes */
  'update:pageSize': [value: number];
};

export interface PaginationListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PaginationListItemProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Value for the page */
  value: number;
}

export interface PaginationEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

export interface PaginationButtonProps extends /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PaginationRootContextParams extends PropsToContext<
  Required<PaginationRootProps>,
  'total' | 'siblingCount' | 'disabled' | 'showEdges'
> {
  page: ShallowRef<number>;
  pageSize: ShallowRef<number>;
}

export type PaginationUiSlot = 'root' | 'list' | 'listItem' | 'ellipsis' | 'first' | 'prev' | 'next' | 'last';

export type PaginationUi = UiClass<PaginationUiSlot>;

export interface PageEllipsis {
  type: 'ellipsis';
}

export interface PageItem {
  type: 'page';
  value: number;
}

export type Pages = Array<PageEllipsis | PageItem>;

export interface PaginationCompactProps extends PaginationRootProps {
  showFirstOrLast?: boolean;
  listProps?: PaginationListProps;
  listItemProps?: PaginationListItemProps;
  ellipsisProps?: PaginationEllipsisProps;
  firstProps?: PaginationButtonProps;
  prevProps?: PaginationButtonProps;
  nextProps?: PaginationButtonProps;
  lastProps?: PaginationButtonProps;
}

export type PaginationCompactEmits = PaginationRootEmits;

export interface PaginationCompactSlots {
  leading?: () => any;
  trailing?: () => any;
  first?: () => any;
  prev?: () => any;
  next?: () => any;
  last?: () => any;
  ellipsis?: () => any;
}
