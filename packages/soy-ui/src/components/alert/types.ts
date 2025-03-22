import type { AlertSlots, AlertVariant, ThemeColor, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';

export interface AlertRootProps extends ClassValueProp {
  color?: ThemeColor;
  variant?: AlertVariant;
  size?: ThemeSize;
}

export interface AlertWrapperProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface AlertIconProps extends ClassValueProp {
  color?: ThemeColor;
  size?: ThemeSize;
}

export interface AlertTitleProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface AlertDescriptionProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface AlertCloseProps extends ClassValueProp {
  size?: ThemeSize;
}

export type AlertUi = Partial<Record<AlertSlots, ClassValue>>;

export interface AlertProps extends AlertRootProps {
  ui?: AlertUi;
  title?: string;
  description?: string;
  closable?: boolean;
  close?: boolean;
}

export type { AlertVariant };
