import type {
  AlertCloseProps,
  AlertContentProps,
  AlertDescriptionProps,
  AlertRootEmits,
  AlertRootProps,
  AlertTitleProps,
  AlertUi,
  ClassValue
} from '@soybeanjs/headless';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { AlertVariant } from '@/variants/alert';
import type { IconValue } from '../icon/types';

type AlertExtraThemeSlot = 'icon';

export type AlertExtendedUi = AlertUi & Record<AlertExtraThemeSlot, ClassValue>;

export interface AlertProps extends AlertRootProps {
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
