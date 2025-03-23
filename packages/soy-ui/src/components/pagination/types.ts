import type {
  ClassValue,
  ClassValueProp,
  PaginationRootEmits,
  PaginationRootProps,
  PaginationEllipsisProps as _PaginationEllipsisProps,
  PaginationFirstProps as _PaginationFirstProps,
  PaginationLastProps as _PaginationLastProps,
  PaginationListItemProps as _PaginationListItemProps,
  PaginationNextProps as _PaginationNextProps,
  PaginationPrevProps as _PaginationPrevProps
} from '@soybean-ui/primitives';
import type { PaginationSlots, ThemeSize } from '@soybean-ui/variants';
import type { ButtonVariant } from '../button/types';

export interface PaginationListProps extends ClassValueProp {
  size?: ThemeSize;
}

export type PaginationButtonVariant = Extract<ButtonVariant, 'plain' | 'ghost'>;

export interface PaginationButtonProps extends ClassValueProp {
  size?: ThemeSize;
  variant?: PaginationButtonVariant;
}

export interface PaginationEllipsisProps extends _PaginationEllipsisProps {
  size?: ThemeSize;
}

export interface PaginationListItemProps extends PaginationButtonProps, _PaginationListItemProps {}

export interface PaginationFirstProps extends PaginationButtonProps, _PaginationFirstProps {}

export interface PaginationLastProps extends PaginationButtonProps, _PaginationLastProps {}

export interface PaginationNextProps extends PaginationButtonProps, _PaginationNextProps {}

export interface PaginationPrevProps extends PaginationButtonProps, _PaginationPrevProps {}

export type PaginationUi = Partial<Record<PaginationSlots, ClassValue>>;

export interface PaginationProps extends PaginationRootProps, PaginationListProps, PaginationButtonProps {
  ui?: PaginationUi;
}

export type PaginationEmits = PaginationRootEmits;
