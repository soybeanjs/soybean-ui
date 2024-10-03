import type { AlertVariant, ThemeColor } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type AlertRootProps = ClassValueProp & {
  color?: ThemeColor;
  variant?: AlertVariant;
};

export type AlertHeaderProps = ClassValueProp;

export type AlertTitleRootProps = ClassValueProp & {
  color?: ThemeColor;
};

export type AlertTitleProps = ClassValueProp;

export type AlertDescriptionProps = ClassValueProp;

export type AlertProps = AlertRootProps & {
  title?: string;
  headerClass?: ClassValue;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  description?: string;
  descriptionClass?: ClassValue;
  closable?: boolean;
  close?: boolean;
};

export type { AlertVariant };
