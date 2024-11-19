import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';

// Root
export interface PaginationRootProps {
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

export type PaginationRootPropsWithPrimitive = PaginationRootProps & PrimitiveProps;

export type PaginationRootEmits = {
  /** Event handler called when the page value changes */
  'update:page': [value: number];
};

export type PaginationRootContext = {
  page: Ref<number>;
  onPageChange: (value: number) => void;
  pageCount: Ref<number>;
  siblingCount: Ref<number>;
  disabled: Ref<boolean>;
  showEdges: Ref<boolean>;
};

// List
export interface PaginationListProps {}
export type PaginationListPropsWithPrimitive = PaginationListProps & PrimitiveProps;

// List Item
export interface PaginationListItemProps {
  /** Value for the page */
  value: number;
}
export type PaginationListItemPropsWithPrimitive = PaginationListItemProps & PrimitiveProps;

// First
export interface PaginationFirstProps {}
export type PaginationFirstPropsWithPrimitive = PaginationFirstProps & PrimitiveProps;

// Last
export interface PaginationLastProps {}
export type PaginationLastPropsWithPrimitive = PaginationLastProps & PrimitiveProps;

// Next
export interface PaginationNextProps {}
export type PaginationNextPropsWithPrimitive = PaginationNextProps & PrimitiveProps;

// Previous
export interface PaginationPrevProps {}
export type PaginationPrevPropsWithPrimitive = PaginationPrevProps & PrimitiveProps;

// Ellipsis
export interface PaginationEllipsisProps {}
export type PaginationEllipsisPropsWithPrimitive = PaginationEllipsisProps & PrimitiveProps;
