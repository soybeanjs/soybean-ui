import type { CardSplit as $CardSplit, CardSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type CardRootProps = {
  class?: ClassValue;
};

export type CardSplit = $CardSplit;

export type CardHeaderProps = {
  class?: ClassValue;
  size?: CardSize;
  /** show a divider between the header and the content */
  split?: boolean;
};

export type CardTitleRootProps = {
  class?: ClassValue;
};

export type CardTitleProps = {
  class?: ClassValue;
  size?: CardSize;
};

export type CardContentProps = {
  class?: ClassValue;
  size?: CardSize;
};

export type CardFooterProps = {
  class?: ClassValue;
  size?: CardSize;
  /** show a divider between the footer and the content */
  split?: boolean;
};

export type CardProps = CardRootProps & {
  title?: string;
  size?: CardSize;
  split?: CardSplit;
  headerClass?: ClassValue;
  titleRootClass?: ClassValue;
  titleClass?: ClassValue;
  contentClass?: ClassValue;
  footerClass?: ClassValue;
};

export type { CardSize };
