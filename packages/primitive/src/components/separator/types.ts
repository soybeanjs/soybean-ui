import type { DataOrientation } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface SeparatorProps {
  /**
   * Orientation of the component.
   *
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: DataOrientation;
  /**
   * Whether or not the component is purely decorative. <br>When `true`, accessibility-related attributes are updated so
   * that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
}

export type SeparatorPropsWithPrimitive = SeparatorProps & PrimitiveProps;
