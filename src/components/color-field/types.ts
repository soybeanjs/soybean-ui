import type {
  ClassValue,
  ColorFieldInputProps,
  ColorFieldRootEmits,
  ColorFieldRootProps,
  ColorFieldUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface ColorFieldProps extends ColorFieldRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ColorFieldUi>;
  inputProps?: ColorFieldInputProps;
}

export type ColorFieldEmits = ColorFieldRootEmits;
