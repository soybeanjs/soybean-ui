import type { CardSplit, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type CardRootProps = ClassValueProp & {
  size?: ThemeSize;
};

export type CardHeaderProps = ClassValueProp & {
  size?: ThemeSize;
  /** show a divider between the header and the content */
  split?: boolean;
};

export type CardTitleRootProps = ClassValueProp;

export type CardTitleProps = ClassValueProp & {
  size?: ThemeSize;
};

export type CardContentProps = ClassValueProp & {
  size?: ThemeSize;
};

export type CardFooterProps = ClassValueProp & {
  size?: ThemeSize;
  /** show a divider between the footer and the content */
  split?: boolean;
};

export type CardProps = CardRootProps & {
  title?: string;
  split?: CardSplit;
  headerClass?: ClassValue;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  contentClass?: ClassValue;
  footerClass?: ClassValue;
};

export type { CardSplit };
