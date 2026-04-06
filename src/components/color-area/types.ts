import type {
  ClassValue,
  ColorAreaAreaProps,
  ColorAreaRootEmits,
  ColorAreaRootProps,
  ColorAreaThumbProps,
  ColorAreaUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface ColorAreaProps extends ColorAreaRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<ColorAreaUi>;
  areaProps?: ColorAreaAreaProps;
  thumbProps?: ColorAreaThumbProps;
}

export type ColorAreaEmits = ColorAreaRootEmits;
