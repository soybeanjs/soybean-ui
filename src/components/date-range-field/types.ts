import type { ClassValue } from '@soybeanjs/headless';
import type { DateRangeFieldInputProps, DateRangeFieldRootEmits, DateRangeFieldRootProps, DateRangeFieldUi } from '@soybeanjs/headless/date-range-field';
import type { ThemeSize } from '@/theme';

export interface DateRangeFieldSlotProps {
  modelValue: DateRangeFieldRootProps['modelValue'];
  startSegments: { part: DateRangeFieldInputProps['part']; value: string }[];
  endSegments: { part: DateRangeFieldInputProps['part']; value: string }[];
  isInvalid: boolean;
}

export interface DateRangeFieldProps extends /* @vue-ignore */ DateRangeFieldRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<DateRangeFieldUi>;
  inputProps?: Omit<DateRangeFieldInputProps, 'part' | 'type'>;
  separator?: string;
}

export type DateRangeFieldEmits = DateRangeFieldRootEmits;

export interface DateRangeFieldSlots {
  default?: (props: DateRangeFieldSlotProps) => any;
  separator?: () => any;
}
