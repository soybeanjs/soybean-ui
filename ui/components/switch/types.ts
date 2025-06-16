import type {
  AcceptableBooleanValue,
  ClassValue,
  SwitchRootEmits,
  SwitchRootProps,
  SwitchSlot,
  SwitchThumbProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type SwitchUi = Partial<Record<SwitchSlot, ClassValue>>;

export interface SwitchProps<T extends AcceptableBooleanValue = boolean> extends SwitchRootProps<T> {
  size?: ThemeSize;
  ui?: SwitchUi;
  thumbProps?: SwitchThumbProps;
}

export type SwitchEmits<T extends AcceptableBooleanValue = boolean> = SwitchRootEmits<T>;
