import type { ClassValue } from '@soybeanjs/headless';
import type { DateFieldInputProps, DateFieldRootEmits, DateFieldRootProps, DateFieldUi } from '@soybeanjs/headless/date-field';
import type { ThemeSize } from '@/theme';

export interface DateFieldSlotProps {
  modelValue: DateFieldRootProps['modelValue'];
  segments: { part: DateFieldInputProps['part']; value: string }[];
  isInvalid: boolean;
}

export interface DateFieldProps extends /* @vue-ignore */ DateFieldRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<DateFieldUi>;
  inputProps?: Omit<DateFieldInputProps, 'part'>;
}

export type DateFieldEmits = DateFieldRootEmits;

export interface DateFieldSlots {
  default?: (props: DateFieldSlotProps) => any;
}
