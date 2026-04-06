import type {
  ClassValue,
  DefinedValue,
  ToggleGroupRootEmits as HeadlessToggleGroupRootEmits,
  ToggleGroupRootProps as HeadlessToggleGroupRootProps,
  ToggleGroupUi
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { ToggleGroupVariant } from './variants';

export interface ToggleGroupProps<
  M extends boolean = false,
  T extends DefinedValue = string
> extends HeadlessToggleGroupRootProps<M, T> {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  variant?: ToggleGroupVariant;
  ui?: Partial<ToggleGroupUi>;
}

export type ToggleGroupEmits<M extends boolean = false, T extends DefinedValue = string> = HeadlessToggleGroupRootEmits<
  M,
  T
>;
