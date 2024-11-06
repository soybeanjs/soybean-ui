import type { ClassValueProp, ThemeSize } from '../../types';

export type KeyboardKeyProps = ClassValueProp & {
  size?: ThemeSize;
  keys?: string[];
  separator?: string;
};
