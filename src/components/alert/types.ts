import type {
  AlertCloseProps,
  AlertContentProps,
  AlertDescriptionProps,
  AlertRootEmits,
  AlertRootProps,
  AlertTitleProps,
  AlertUiSlot,
  ClassValue,
  UiClass
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';
import type { AlertVariant } from './variants';

type AlertExtraUiSlot = 'icon';

export type AlertExtendedUi = UiClass<AlertUiSlot | AlertExtraUiSlot>;

export interface AlertProps extends AlertRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
  color?: ThemeColor;
  variant?: AlertVariant;
  ui?: Partial<AlertExtendedUi>;
  title?: string;
  description?: string;
  icon?: IconValue;
  closable?: boolean;
  contentProps?: AlertContentProps;
  titleProps?: AlertTitleProps;
  descriptionProps?: AlertDescriptionProps;
  closeProps?: AlertCloseProps;
}

export type AlertEmits = AlertRootEmits;

export type { AlertVariant };
