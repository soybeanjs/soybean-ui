import type { CardSplit, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '@soybean-ui/primitive';

export interface CardRootProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardHeaderProps extends ClassValueProp {
  size?: ThemeSize;
  /** show a divider between the header and the content */
  split?: boolean;
}

export interface CardTitleRootProps extends ClassValueProp {}

export interface CardTitleProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardContentProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardFooterProps extends ClassValueProp {
  size?: ThemeSize;
  /** show a divider between the footer and the content */
  split?: boolean;
}

export interface CardProps extends CardRootProps {
  title?: string;
  split?: CardSplit;
  headerClass?: ClassValue;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  contentClass?: ClassValue;
  footerClass?: ClassValue;
}

export type { CardSplit };
