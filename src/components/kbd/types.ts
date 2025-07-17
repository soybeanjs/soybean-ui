import type { HTMLAttributes } from 'vue';
import type { KbdKey } from '../../types';
import type { PrimitiveProps } from '../primitive';

export type KbdValue = KbdKey | (string & {});

export interface KbdProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The value of the component.
   */
  value?: KbdValue | KbdValue[];
  /**
   * Whether to convert the command value to icon representation.
   *
   * @defaultValue true
   */
  iconization?: boolean;
}
