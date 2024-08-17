import type { AlertColor, AlertVariant } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export interface AlertRootProps extends PrimitivePropsWithClass {
  color?: AlertColor;
  variant?: AlertVariant;
}

export type AlertHeaderProps = PrimitivePropsWithClass;

export type AlertTitleRootProps = PrimitivePropsWithClass;

export type AlertTitleProps = PrimitivePropsWithClass;

export type AlertIconProps = PrimitivePropsWithClass & {
  color?: AlertColor;
};

export type AlertDescriptionProps = PrimitivePropsWithClass;

export interface AlertProps extends AlertRootProps {
  title?: string;
  headerProps?: AlertHeaderProps;
  titleRootProps?: AlertTitleRootProps;
  titleProps?: AlertTitleProps;
  iconProps?: AlertIconProps;
  description?: string;
  descriptionProps?: PrimitivePropsWithClass;
  closable?: boolean;
}

export type { AlertColor, AlertVariant };
