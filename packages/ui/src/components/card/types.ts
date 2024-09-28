import type { CardSplit as $CardSplit, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type CardRootProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type CardSplit = $CardSplit;

export type CardHeaderProps = {
  class?: ClassValue;
  size?: ThemeSize;
  /** show a divider between the header and the content */
  split?: boolean;
};

export type CardTitleRootProps = {
  class?: ClassValue;
};

export type CardTitleProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type CardContentProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type CardFooterProps = {
  class?: ClassValue;
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
