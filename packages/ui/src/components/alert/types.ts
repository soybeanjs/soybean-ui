import type { AlertColor, AlertVariant, ClassValue } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export interface AlertRootProps extends PrimitivePropsWithClass {
  color?: AlertColor;
  variant?: AlertVariant;
}

export type AlertHeaderProps = PrimitivePropsWithClass;

export type AlertTitleRootProps = PrimitivePropsWithClass;

export type AlertTitleProps = PrimitivePropsWithClass;

export type AlertDescriptionProps = PrimitivePropsWithClass;

export interface AlertProps extends AlertRootProps {
  title?: string;
  headerClass?: ClassValue;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  description?: string;
  descriptionClass?: ClassValue;
  closable?: boolean;
}

export type { AlertColor, AlertVariant };
