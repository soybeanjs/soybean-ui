import type { Ref } from 'vue';
import type { ClassValueProp, PrimitiveProps } from '../../types';

// Root
export interface PaginationRootProps extends ClassValueProp {
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
export interface PaginationListProps extends ClassValueProp {}
export type PaginationListPropsWithPrimitive = PaginationListProps & PrimitiveProps;

// List Item
export interface PaginationListItemProps extends ClassValueProp {
  /** Value for the page */
  value: number;
}
export type PaginationListItemPropsWithPrimitive = PaginationListItemProps & PrimitiveProps;

// First
export interface PaginationFirstProps extends ClassValueProp {}
export type PaginationFirstPropsWithPrimitive = PaginationFirstProps & PrimitiveProps;

// Last
export interface PaginationLastProps extends ClassValueProp {}
export type PaginationLastPropsWithPrimitive = PaginationLastProps & PrimitiveProps;

// Next
export interface PaginationNextProps extends ClassValueProp {}
export type PaginationNextPropsWithPrimitive = PaginationNextProps & PrimitiveProps;

// Previous
export interface PaginationPrevProps extends ClassValueProp {}
export type PaginationPrevPropsWithPrimitive = PaginationPrevProps & PrimitiveProps;

// Ellipsis
export interface PaginationEllipsisProps extends ClassValueProp {}
export type PaginationEllipsisPropsWithPrimitive = PaginationEllipsisProps & PrimitiveProps;
