import type { ClassValueProp, PrimitiveProps } from '../../types';

export interface ViewportProps extends ClassValueProp {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}

export type ViewportPropsWithPrimitive = ViewportProps & PrimitiveProps;
