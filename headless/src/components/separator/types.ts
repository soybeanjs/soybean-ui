import type { HTMLAttributes } from 'vue';
import type { DataOrientation, UiClass } from '../../types';

export interface SeparatorLabelProps extends /** @vue-ignore */ HTMLAttributes {}

export interface SeparatorRootProps extends /** @vue-ignore */ HTMLAttributes {
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

export type SeparatorUiSlot = 'root' | 'label';

export type SeparatorUi = UiClass<SeparatorUiSlot>;
