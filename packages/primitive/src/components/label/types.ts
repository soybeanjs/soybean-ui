import type { PrimitiveProps } from '../primitive/types';

export interface LabelProps {
  /** The id of the element the label is associated with. */
  for?: string;
}

export type LabelPropsWithPrimitive = LabelProps & PrimitiveProps;
