import type { CardSplit as $CardSplit, CardSize } from '@soybean-unify/ui-variants';
import type { PrimitivePropsWithClass } from '../../types';

export type CardRootProps = PrimitivePropsWithClass;

export type CardSplit = $CardSplit | 'all';

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
  headerProps?: CardHeaderProps;
  titleRootProps?: CardTitleRootProps;
  titleProps?: CardTitleProps;
  contentProps?: CardContentProps;
  footerProps?: CardFooterProps;
};

export type { CardSize };
