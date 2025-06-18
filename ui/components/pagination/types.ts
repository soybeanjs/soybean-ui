import type {
  ClassValue,
  PaginationButtonProps,
  PaginationEllipsisProps,
  PaginationListItemProps,
  PaginationListProps,
  PaginationRootEmits,
  PaginationRootProps,
  PaginationSlot
} from '@headless';
import type { ThemeSize } from '@theme';
import type { PaginationShape, PaginationVariant } from '@variants/pagination';

export type PaginationUi = Partial<Record<PaginationSlot, ClassValue>>;

export interface PaginationProps extends PaginationRootProps {
  /** The custom ui class names */
  ui?: PaginationUi;
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
  /** The props for the list component */
  listProps?: PaginationListProps;
  /** The props for the list item component */
  listItemProps?: PaginationListItemProps;
  /** The props for the ellipsis component */
  ellipsisProps?: PaginationEllipsisProps;
  /** The props for the first button component */
  firstProps?: PaginationButtonProps;
  /** The props for the previous button component */
  prevProps?: PaginationButtonProps;
  /** The props for the next button component */
  nextProps?: PaginationButtonProps;
  /** The props for the last button component */
  lastProps?: PaginationButtonProps;
}

export type PaginationEmits = PaginationRootEmits;
