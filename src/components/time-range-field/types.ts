import type { ClassValue } from '@soybeanjs/headless';
import type { TimeRangeFieldInputProps, TimeRangeFieldRootEmits, TimeRangeFieldRootProps, TimeRangeFieldUi } from '@soybeanjs/headless/time-range-field';
import type { ThemeSize } from '@/theme';

export interface TimeRangeFieldSlotProps {
  modelValue: TimeRangeFieldRootProps['modelValue'];
  startSegments: { part: TimeRangeFieldInputProps['part']; value: string }[];
  endSegments: { part: TimeRangeFieldInputProps['part']; value: string }[];
  isInvalid: boolean;
}

export interface TimeRangeFieldProps extends /* @vue-ignore */ TimeRangeFieldRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TimeRangeFieldUi>;
  inputProps?: Omit<TimeRangeFieldInputProps, 'part' | 'type'>;
  separator?: string;
}

export type TimeRangeFieldEmits = TimeRangeFieldRootEmits;

export interface TimeRangeFieldSlots {
  default?: (props: TimeRangeFieldSlotProps) => any;
  separator?: () => any;
}
