import type { ClassValue, ClassValueProp, SwitchRootProps as _SwitchRootProps } from '@soybean-ui/primitives';
import type { SwitchSlots, ThemeColor, ThemeSize } from '@soybean-ui/variants';

export interface SwitchRootProps extends _SwitchRootProps {
  color?: ThemeColor;
  size?: ThemeSize;
}

export interface SwitchThumbProps extends ClassValueProp {
  size?: ThemeSize;
}

export type SwitchUi = Partial<Record<SwitchSlots, ClassValue>>;

export interface SwitchProps extends SwitchRootProps {
  ui?: SwitchUi;
}

export type SwitchRootEmits = {
  'update:modelValue': [value: boolean];
};

export type SwitchEmits = SwitchRootEmits;
