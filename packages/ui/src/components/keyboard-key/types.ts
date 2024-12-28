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

export type KeyboardKeyValue = BuiltinKeyboardKey | (string & {});

export interface KeyboardKeyProps<T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue>
  extends ClassValueProp {
  variant?: KeyboardKeyVariant;
  size?: ThemeSize;
  value?: T;
}

export interface KeyboardKeyGroupProps<T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue>
  extends Omit<KeyboardKeyProps, 'value'> {
  values?: T[];
  itemClass?: ClassValue;
  separator?: string;
  separatorClass?: ClassValue;
}

export type { KeyboardKeyVariant };
