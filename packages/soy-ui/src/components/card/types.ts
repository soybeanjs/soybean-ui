import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';

export interface CardRootProps extends ClassValueProp {
  size?: ThemeSize;
  split?: boolean;
}

export interface CardHeaderProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardTitleRootProps extends ClassValueProp {}

export interface CardTitleProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardBodyProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardFooterProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardProps extends CardRootProps {
  headerClass?: ClassValue;
  title?: string;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  bodyClass?: ClassValue;
  footerClass?: ClassValue;
}
