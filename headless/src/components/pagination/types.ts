import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { PropsToContext, UiClass } from '../../types';

/**
 * Props for the pagination root component.
 */
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

/**
 * Emits for the pagination root component.
 */
export type PaginationRootEmits = {
  /** Event handler called when the page value changes */
  'update:page': [value: number];
  /** Event handler called when the page size value changes */
  'update:pageSize': [value: number];
};

/**
 * Props for the pagination list component.
 */
export interface PaginationListProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the pagination list item component.
 */
export interface PaginationListItemProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Value for the page */
  value: number;
}

/**
 * Props for the pagination ellipsis component.
 */
export interface PaginationEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the pagination button component.
 */
export interface PaginationButtonProps extends /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Parameters used to create the pagination root context.
 */
export interface PaginationRootContextParams extends PropsToContext<
  Required<PaginationRootProps>,
  'total' | 'siblingCount' | 'disabled' | 'showEdges'
> {
  /**
   * Page used by the component context.
   */
  page: ShallowRef<number>;
  /**
   * Page size used by the component context.
   */
  pageSize: ShallowRef<number>;
}

/**
 * Available UI slots for the pagination component.
 */
export type PaginationUiSlot = 'root' | 'list' | 'listItem' | 'ellipsis' | 'first' | 'prev' | 'next' | 'last';

/**
 * UI class overrides for the pagination component.
 */
export type PaginationUi = UiClass<PaginationUiSlot>;

/**
 * Type information for the page ellipsis component.
 */
export interface PageEllipsis {
  /**
   * Type.
   */
  type: 'ellipsis';
}

/**
 * Type information for the page item component.
 */
export interface PageItem {
  /**
   * Type.
   */
  type: 'page';
  /**
   * Value associated with the current item.
   */
  value: number;
}

/**
 * Type information for the pages component.
 */
export type Pages = Array<PageEllipsis | PageItem>;

/**
 * Props for the pagination compact component.
 */
export interface PaginationCompactProps extends PaginationRootProps {
  /**
   * Whether to show a first or last.
   */
  showFirstOrLast?: boolean;
  /**
   * Props forwarded to the list element.
   */
  listProps?: PaginationListProps;
  /**
   * Props forwarded to the list item element.
   */
  listItemProps?: PaginationListItemProps;
  /**
   * Props forwarded to the ellipsis element.
   */
  ellipsisProps?: PaginationEllipsisProps;
  /**
   * Props forwarded to the first element.
   */
  firstProps?: PaginationButtonProps;
  /**
   * Props forwarded to the prev element.
   */
  prevProps?: PaginationButtonProps;
  /**
   * Props forwarded to the next element.
   */
  nextProps?: PaginationButtonProps;
  /**
   * Props forwarded to the last element.
   */
  lastProps?: PaginationButtonProps;
}

/**
 * Emits for the pagination compact component.
 */
export type PaginationCompactEmits = PaginationRootEmits;

/**
 * Slots for the pagination compact component.
 */
export interface PaginationCompactSlots {
  /**
   * Custom content for the leading slot.
   */
  leading?: () => any;
  /**
   * Custom content for the trailing slot.
   */
  trailing?: () => any;
  /**
   * Custom content for the first slot.
   */
  first?: () => any;
  /**
   * Custom content for the prev slot.
   */
  prev?: () => any;
  /**
   * Custom content for the next slot.
   */
  next?: () => any;
  /**
   * Custom content for the last slot.
   */
  last?: () => any;
  /**
   * Custom content for the ellipsis slot.
   */
  ellipsis?: () => any;
}
