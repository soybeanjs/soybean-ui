import type { Component } from 'vue';
import type { AlertColor, AlertVariant } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type AlertTitleProps = PrimitivePropsWithClass;

export type AlertDescriptionProps = PrimitivePropsWithClass;

export interface AlertRootProps extends PrimitivePropsWithClass {
  color?: AlertColor;
  variant?: AlertVariant;
}

export interface AlertProps extends AlertRootProps {
  title?: string;
  titleProps?: PrimitivePropsWithClass;
  description?: string;
  descriptionProps?: PrimitivePropsWithClass;
  icon?: Component;
}

export type { AlertColor, AlertVariant };
