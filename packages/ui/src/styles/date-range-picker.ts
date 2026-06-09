// @unocss-include
import { scv } from '@soybeanjs/cva';
import { datePickerVariants } from './date-picker';
import { dateRangeFieldVariants } from './date-range-field';

export const dateRangePickerVariants = scv({
  extend: [datePickerVariants, dateRangeFieldVariants],
  defaultVariants: {
    size: 'md'
  }
});
