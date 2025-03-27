import type { ClassValueProp, PrimitiveProps } from '../../types';

export interface LabelProps extends ClassValueProp {
  /** The id of the element the label is associated with. */
  for?: string;
}

export type LabelPropsWithPrimitive = LabelProps & PrimitiveProps;
