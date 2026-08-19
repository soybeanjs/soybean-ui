import type { TreeSelectUi, TreeSelectCompactProps as _TreeSelectCompactProps } from '@soybeanjs/headless/tree-select';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';

/**
 * Properties for the TreeSelect component.
 */
export interface TreeSelectProps extends _TreeSelectCompactProps {
  /**
   * root class
   */
  class?: ClassValue;
  /**
   * Visual size of the trigger.
   */
  size?: ThemeSize;
  /**
   * Theme color of the trigger focus state.
   */
  color?: ThemeColor;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<TreeSelectUi>;
}
