import type { PrimitivePropsWithClass } from '../../types';

export type CardRootProps = PrimitivePropsWithClass;

export type CardHeaderProps = PrimitivePropsWithClass;

export type CardTitleRootProps = PrimitivePropsWithClass;

export type CardTitleProps = PrimitivePropsWithClass;

export type CardDescriptionProps = PrimitivePropsWithClass;

export type CardContentProps = PrimitivePropsWithClass;

export type CardFooterProps = PrimitivePropsWithClass;

export type CardProps = CardRootProps & {
  title?: string;
  description?: string;
  headerProps?: CardHeaderProps;
  titleRootProps?: CardTitleRootProps;
  titleProps?: CardTitleProps;
  descriptionProps?: CardDescriptionProps;
  contentProps?: CardContentProps;
  footerProps?: CardFooterProps;
};
