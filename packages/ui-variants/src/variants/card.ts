// @unocss-include
import { cva } from 'class-variance-authority';
import type { ThemeSize } from '../types/theme';

export type CardSize = Extract<ThemeSize, 'xs' | 'sm' | 'md' | 'lg'>;

export type CardSplit = 'header' | 'footer' | 'none';

type Variants = {
  size: Record<CardSize, string>;
  split: Record<CardSplit, string>;
};

export const cardVariants = cva<Variants>('', {
  variants: {
    size: {
      xs: 'px-3 py-2',
      sm: 'px-4 py-3',
      md: 'px-5 py-4',
      lg: 'px-6 py-5'
    },
    split: {
      header: 'border-b border-border',
      footer: 'border-t border-border',
      none: ''
    }
  },
  defaultVariants: {
    size: 'md',
    split: 'none'
  }
});
