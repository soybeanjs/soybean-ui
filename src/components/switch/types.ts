import type {
  AcceptableBooleanValue,
  SwitchControlProps,
  SwitchRootEmits,
  SwitchRootProps,
  SwitchThumbProps,
  SwitchUi
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { SwitchShape } from '@/variants/switch';

export interface SwitchProps<T extends AcceptableBooleanValue = boolean> extends SwitchRootProps<T> {
  ui?: Partial<SwitchUi>;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: SwitchShape;
  controlProps?: SwitchControlProps;
  thumbProps?: SwitchThumbProps;
}

export type SwitchEmits<T extends AcceptableBooleanValue = boolean> = SwitchRootEmits<T>;

export type { SwitchShape };
