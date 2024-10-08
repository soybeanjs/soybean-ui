import type {
  PaginationRootEmits,
  PaginationRootProps,
  PaginationListItemProps as _PaginationListItemProps
} from 'radix-vue';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';
import type { ButtonVariant } from '../button/types';

export type PaginationListProps = ClassValueProp & {
  size?: ThemeSize;
};

export type PaginationButtonVariant = Extract<ButtonVariant, 'outline' | 'ghost'>;

export type PaginationButtonProps = ClassValueProp & {
  size?: ThemeSize;
  variant?: PaginationButtonVariant;
};

export type PaginationEllipsisProps = ClassValueProp & {
  size?: ThemeSize;
};

export type PaginationListItemProps = PaginationButtonProps &
  Pick<_PaginationListItemProps, 'value'> & {
    active?: boolean;
  };

export type PaginationFirstProps = PaginationButtonProps;

export type PaginationLastProps = PaginationButtonProps;

export type PaginationNextProps = PaginationButtonProps;

export type PaginationPrevProps = PaginationButtonProps;

export type PaginationProps = Omit<PaginationRootProps, 'as' | 'asChild'> &
  PaginationListProps &
  PaginationButtonProps & {
    listItemClass?: ClassValue;
    firstClass?: ClassValue;
    lastClass?: ClassValue;
    nextClass?: ClassValue;
    prevClass?: ClassValue;
    ellipsisClass?: ClassValue;
  };

export type PaginationEmits = PaginationRootEmits;
