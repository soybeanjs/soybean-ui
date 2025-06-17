import type {
  AcceptableBooleanValue,
  ClassValue,
  SwitchControlProps,
  SwitchRootEmits,
  SwitchRootProps,
  SwitchSlot,
  SwitchThumbProps
} from '@headless';
import type { ThemeColor, ThemeSize } from '@theme';
import type { SwitchShape } from '@variants/switch';

export type SwitchUi = Partial<Record<SwitchSlot, ClassValue>>;

export interface SwitchProps<T extends AcceptableBooleanValue = boolean> extends SwitchRootProps<T> {
  ui?: SwitchUi;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: SwitchShape;
  controlProps?: SwitchControlProps;
  thumbProps?: SwitchThumbProps;
}

export type SwitchEmits<T extends AcceptableBooleanValue = boolean> = SwitchRootEmits<T>;

export type { SwitchShape };
