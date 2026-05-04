import type {
  SwitchControlProps,
  SwitchRootEmits,
  SwitchRootProps,
  SwitchThumbProps,
  SwitchUi
} from '@soybeanjs/headless/switch';
import type { AcceptableBooleanValue, ClassValue } from '@soybeanjs/headless/types';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { SwitchShape } from './variants';

/**
 * Properties for the switch component.
 */
export interface SwitchProps<T extends AcceptableBooleanValue = boolean> extends SwitchRootProps<T> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<SwitchUi>;
  /**
   * Theme color of the component.
   */
  color?: ThemeColor;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Shape of the component.
   */
  shape?: SwitchShape;
  /**
   * Properties forwarded to the control element.
   */
  controlProps?: SwitchControlProps;
  /**
   * Properties forwarded to the thumb element.
   */
  thumbProps?: SwitchThumbProps;
}

/**
 * Events for the switch component.
 */
export type SwitchEmits<T extends AcceptableBooleanValue = boolean> = SwitchRootEmits<T>;

export type { SwitchShape };
