import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardRootProps,
  CardThemeSlot,
  CardTitleProps,
  CardTitleRootProps,
  ClassValue
} from '@headless';
import type { ThemeSize } from '@theme';

export type CardUi = Partial<Record<CardThemeSlot, ClassValue>>;

export interface CardProps extends CardRootProps {
  size?: ThemeSize;
  ui?: CardUi;
  title?: string;
  description?: string;
  /**
   * If true, the card will add divider between title and content and footer
   *
   * @default false
   */
  split?: boolean;
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
  headerProps?: CardHeaderProps;
  contentProps?: CardContentProps;
  footerProps?: CardFooterProps;
  titleRootProps?: CardTitleRootProps;
  titleProps?: CardTitleProps;
  descriptionProps?: CardDescriptionProps;
}

export type {
  CardRootProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardTitleRootProps,
  CardTitleProps,
  CardDescriptionProps
};
