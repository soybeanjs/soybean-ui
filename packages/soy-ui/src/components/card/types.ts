import type { ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { CardSlots, ThemeSize } from '@soybean-ui/variants';

export interface CardRootProps extends ClassValueProp {
  size?: ThemeSize;
  split?: boolean;
}

export interface CardHeaderProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardTitleRootProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardTitleProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface CardContentProps extends ClassValueProp {
  size?: ThemeSize;
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
}

export interface CardFooterProps extends ClassValueProp {
  size?: ThemeSize;
}

export type CardUi = Partial<Record<CardSlots, ClassValue>>;

export interface CardProps extends CardRootProps {
  ui?: CardUi;
  title?: string;
  /**
   * If true, the content will be flex-grow and overflow-hidden
   *
   * @default false
   */
  flexHeight?: boolean;
}
