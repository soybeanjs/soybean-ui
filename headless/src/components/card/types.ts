import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type {
  CollapsibleRootProps,
  CollapsibleRootEmits,
  CollapsibleContentProps,
  CollapsibleTriggerProps
} from '../collapsible/types';

/**
 * Properties for the card root component.
 */
export interface CardRootProps extends CollapsibleRootProps {}

/**
 * Events for the card root component.
 */
export type CardRootEmits = CollapsibleRootEmits;

/**
 * Properties for the card header component.
 */
export interface CardHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the card content component.
 */
export interface CardContentProps extends CollapsibleContentProps {}

/**
 * Properties for the card footer component.
 */
export interface CardFooterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the card title root component.
 */
export interface CardTitleRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the card title component.
 */
export interface CardTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the card description component.
 */
export interface CardDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the card collapsible trigger component.
 */
export interface CardCollapsibleTriggerProps extends CollapsibleTriggerProps {}

/**
 * Available UI slots for the card component.
 */
export type CardUiSlot = 'root' | 'header' | 'content' | 'footer' | 'titleRoot' | 'title' | 'description' | 'trigger';

/**
 * UI class overrides for the card component.
 */
export type CardUi = UiClass<CardUiSlot>;

/**
 * Properties for the card compact component.
 */
export interface CardCompactProps extends CardRootProps {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: CardHeaderProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: CardContentProps;
  /**
   * Properties forwarded to the footer element.
   */
  footerProps?: CardFooterProps;
  /**
   * Properties forwarded to the title root element.
   */
  titleRootProps?: CardTitleRootProps;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: CardTitleProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: CardDescriptionProps;
}

/**
 * Events for the card compact component.
 */
export type CardCompactEmits = CardRootEmits;

/**
 * Slots for the card compact component.
 */
export interface CardCompactSlots {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the header slot.
   */
  header?: () => any;
  /**
   * Custom content for the title slot.
   */
  title?: () => any;
  /**
   * Custom content for the title leading slot.
   */
  'title-leading'?: () => any;
  /**
   * Custom content for the title trailing slot.
   */
  'title-trailing'?: () => any;
  /**
   * Custom content for the extra slot.
   */
  extra?: () => any;
  /**
   * Custom content for the footer slot.
   */
  footer?: () => any;
  /**
   * Custom content for the description slot.
   */
  description?: () => any;
}
