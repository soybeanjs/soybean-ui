import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardRootProps,
  CardTitleProps,
  CardTitleRootProps,
  CardUi,
  ClassValue
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface CardProps extends CardRootProps {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<CardUi>;
  title?: string;
  description?: string;
  /**
   * If true, the content will be scrollable when the root has height and content is taller than the root
   *
   * @default false
   */
  scrollable?: boolean;
  /**
   * If true, the card will add divider between title and content and footer
   *
   * @default false
   */
  split?: boolean;
  headerProps?: CardHeaderProps;
  contentProps?: CardContentProps;
  footerProps?: CardFooterProps;
  titleRootProps?: CardTitleRootProps;
  titleProps?: CardTitleProps;
  descriptionProps?: CardDescriptionProps;
}
