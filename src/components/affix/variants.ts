// @unocss-include
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

export const affixVariants = tv({
  slots: {
    root: '',
    placeholder: '',
    content: 'data-[state=fixed]:z-50'
  }
});

export type AffixVariantProps = VariantProps<typeof affixVariants>;
