import type {
  PaginationCompactProps,
  PaginationCompactEmits,
  PaginationCompactSlots,
  PaginationUi
} from '@soybeanjs/headless/pagination';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { PaginationShape, PaginationVariant } from '@/styles/pagination';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the Pagination component.
 */
export interface PaginationProps extends PaginationCompactProps {
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
}

/**
 * Events for the Pagination component.
 */
export type PaginationEmits = PaginationCompactEmits;

/**
 * Slots for the Pagination component.
 */
export type PaginationSlots = PaginationCompactSlots;
