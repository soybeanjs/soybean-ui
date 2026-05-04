import type {
  ToggleGroupRootEmits as HeadlessToggleGroupRootEmits,
  ToggleGroupRootProps as HeadlessToggleGroupRootProps,
  ToggleGroupUi
} from '@soybeanjs/headless/toggle-group';
import type { ClassValue, DefinedValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { ToggleGroupVariant } from './variants';

/**
 * Properties for the toggle group component.
 */
export interface ToggleGroupProps<
  M extends boolean = false,
  T extends DefinedValue = string
> extends HeadlessToggleGroupRootProps<M, T> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Visual variant of the component.
   */
  variant?: ToggleGroupVariant;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ToggleGroupUi>;
}

/**
 * Events for the toggle group component.
 */
export type ToggleGroupEmits<M extends boolean = false, T extends DefinedValue = string> = HeadlessToggleGroupRootEmits<
  M,
  T
>;

export type { ToggleGroupVariant };
