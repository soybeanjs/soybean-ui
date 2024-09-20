import type { AlertColor, AlertVariant } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export interface AlertRootProps {
  class?: ClassValue;
  color?: AlertColor;
  variant?: AlertVariant;
}

export type AlertHeaderProps = {
  class?: ClassValue;
};

export type AlertTitleRootProps = {
  class?: ClassValue;
};

export type AlertTitleProps = {
  class?: ClassValue;
};

export type AlertDescriptionProps = {
  class?: ClassValue;
};

export interface AlertProps extends AlertRootProps {
  title?: string;
  headerClass?: ClassValue;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  description?: string;
  descriptionClass?: ClassValue;
  closable?: boolean;
  close?: boolean;
}

export type { AlertColor, AlertVariant };
