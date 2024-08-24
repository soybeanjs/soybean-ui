// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const checkboxVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control: [
      'peer size-4.5 shrink-0 rounded-sm border border-primary shadow',
      'focus-visible:(outline outline-2 outline-offset-2) disabled:(cursor-not-allowed opacity-50)',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground'
    ],
    indicator: 'size-full flex items-center justify-center text-current',
    group: 'flex gap-2'
  },
  variants: {
    orientation: {
      horizontal: {
        group: 'items-center'
      },
      vertical: {
        group: 'flex-col'
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export type CheckboxOrientation = NonNullable<CheckboxVariants['orientation']>;
