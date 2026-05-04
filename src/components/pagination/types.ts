import type {
  PaginationButtonProps,
  PaginationEllipsisProps,
  PaginationListItemProps,
  PaginationListProps,
  PaginationRootEmits,
  PaginationRootProps,
  PaginationUi
} from '@soybeanjs/headless/pagination';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { PaginationShape, PaginationVariant } from './variants';

/**
 * Properties for the Pagination component.
 */
export interface PaginationProps extends PaginationRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /** The custom ui class names */
  ui?: Partial<PaginationUi>;
  /** The size of the pagination */
  size?: ThemeSize;
  /** The variant of the pagination */
  variant?: PaginationVariant;
  /** The shape of the pagination */
  shape?: PaginationShape;
  /** Whether to apply the selected state to the action button */
  actionAsSelected?: boolean;
  /** Whether to show the first and last buttons */
  showFirstOrLast?: boolean;
  /** The properties for the list component */
  listProps?: PaginationListProps;
  /** The properties for the list item component */
  listItemProps?: PaginationListItemProps;
  /** The properties for the ellipsis component */
  ellipsisProps?: PaginationEllipsisProps;
  /** The properties for the first button component */
  firstProps?: PaginationButtonProps;
  /** The properties for the previous button component */
  prevProps?: PaginationButtonProps;
  /** The properties for the next button component */
  nextProps?: PaginationButtonProps;
  /** The properties for the last button component */
  lastProps?: PaginationButtonProps;
}

/**
 * Events for the Pagination component.
 */
export type PaginationEmits = PaginationRootEmits;
