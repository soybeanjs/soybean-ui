import type { AlertColor } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type AlertTitleProps = PrimitivePropsWithClass;

export type AlertDescriptionProps = PrimitivePropsWithClass;

export interface AlertRootProps extends PrimitivePropsWithClass {
  color?: AlertColor;
}

export interface AlertProps extends AlertRootProps {
  title?: string;
  titleProps?: PrimitivePropsWithClass;
  description?: string;
  descriptionProps?: PrimitivePropsWithClass;
}
