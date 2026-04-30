import type { ClassValue } from '@soybeanjs/headless';
import type { TimeFieldInputProps, TimeFieldRootEmits, TimeFieldRootProps, TimeFieldUi } from '@soybeanjs/headless/time-field';
import type { ThemeSize } from '@/theme';

export interface TimeFieldSlotProps {
  modelValue: TimeFieldRootProps['modelValue'];
  segments: { part: TimeFieldInputProps['part']; value: string }[];
  isInvalid: boolean;
}

export interface TimeFieldProps extends /* @vue-ignore */ TimeFieldRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<TimeFieldUi>;
  inputProps?: Omit<TimeFieldInputProps, 'part'>;
}

export type TimeFieldEmits = TimeFieldRootEmits;

export interface TimeFieldSlots {
  default?: (props: TimeFieldSlotProps) => any;
}
