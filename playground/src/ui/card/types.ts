import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardRootProps,
  CardSlot,
  CardTitleProps,
  CardTitleRootProps
} from '@/components/card';
import type { ClassValue } from '@/types';
import type { ThemeSize } from '../../theme/types';

export type CardUi = Partial<Record<CardSlot, ClassValue>>;

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
