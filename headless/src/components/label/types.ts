import type { LabelHTMLAttributes } from 'vue';

export interface LabelProps extends /** @vue-ignore */ LabelHTMLAttributes {
  /** The id of the element the label is associated with. */
  for?: string;
}
