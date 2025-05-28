import type { ClassValueProp } from '../../types';

export interface LabelProps extends ClassValueProp {
  /** The id of the element the label is associated with. */
  for?: string;
}
