import type { PrimitiveProps } from '../primitive';

export interface FocusScopeProps {
  /**
   * When `true`, tabbing from last item will focus first tabbable and shift+tab from first item will focus last
   * tabbable.
   *
   * @defaultValue false
   */
  loop?: boolean;

  /**
   * When `true`, focus cannot escape the focus scope via keyboard, pointer, or a programmatic focus.
   *
   * @defaultValue false
   */
  trapped?: boolean;
}

export type FocusScopePropsWithPrimitive = FocusScopeProps & PrimitiveProps;

export type FocusScopeEmits = {
  /** Event handler called when auto-focusing on mount. Can be prevented. */
  mountAutoFocus: [event: Event];

  /** Event handler called when auto-focusing on unmount. Can be prevented. */
  unmountAutoFocus: [event: Event];
};
