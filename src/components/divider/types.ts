import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ClassValue, DataOrientation } from '../../types';

export interface DividerLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DividerRootProps extends /** @vue-ignore */ HTMLAttributes {
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

export type DividerThemeSlot = 'root' | 'label';

export interface DividerThemeContextParams {
  ui: ComputedRef<Record<DividerThemeSlot, ClassValue>>;
}
