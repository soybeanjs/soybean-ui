import type { HTMLAttributes } from 'vue';
import type { DataOrientation } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

interface SeparatorRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
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

interface SeparatorLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface SeparatorProps extends SeparatorRootProps {
  /**
   * The label for the separator.
   *
   * It is only used when the separator orientation is `horizontal`.
   */
  label?: string;
  /** Props for the label. */
  labelProps?: SeparatorLabelProps;
}
