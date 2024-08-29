import type { CardSplit as $CardSplit, CardSize, ClassValue } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type CardRootProps = PrimitivePropsWithClass;

export type CardSplit = $CardSplit;

export type CardHeaderProps = PrimitivePropsWithClass & {
  size?: CardSize;
  /** show a divider between the header and the content */
  split?: boolean;
};

export type CardTitleRootProps = PrimitivePropsWithClass;

export type CardTitleProps = PrimitivePropsWithClass & {
  size?: CardSize;
};

export type CardContentProps = PrimitivePropsWithClass & {
  size?: CardSize;
};

export type CardFooterProps = PrimitivePropsWithClass & {
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
