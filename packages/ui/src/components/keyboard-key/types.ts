import type { ClassValue, ClassValueProp } from '@soybean-ui/primitive';
import type { KeyboardKeyVariant, ThemeSize } from '@soybean-ui/variants';

export type BuiltinKeyboardKey =
  | 'meta'
  | 'ctrl'
  | 'alt'
  | 'win'
  | 'command'
  | 'shift'
  | 'option'
  | 'enter'
  | 'delete'
  | 'backspace'
  | 'escape'
  | 'tab'
  | 'capslock'
  | 'arrowup'
  | 'arrowright'
  | 'arrowdown'
  | 'arrowleft'
  | 'pageup'
  | 'pagedown'
  | 'home'
  | 'end';

export type SpecificKeyboardKeyMap = {
  meta: string;
  alt: string;
  ctrl: string;
};

export interface KeyboardKeyProps extends ClassValueProp {
  variant?: KeyboardKeyVariant;
  size?: ThemeSize;
  value?: BuiltinKeyboardKey | (string & {});
}

export interface KeyboardKeyGroupProps extends Omit<KeyboardKeyProps, 'value'> {
  values?: KeyboardKeyProps['value'][];
  itemClass?: ClassValue;
  separator?: string;
  separatorClass?: ClassValue;
}

export type { KeyboardKeyVariant };
