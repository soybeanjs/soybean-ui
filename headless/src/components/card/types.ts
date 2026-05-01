import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type {
  CollapsibleRootProps,
  CollapsibleRootEmits,
  CollapsibleContentProps,
  CollapsibleTriggerProps
} from '../collapsible/types';

/**
 * Props for the card root component.
 */
export interface CardRootProps extends CollapsibleRootProps {}

/**
 * Emits for the card root component.
 */
export type CardRootEmits = CollapsibleRootEmits;

/**
 * Props for the card header component.
 */
export interface CardHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the card content component.
 */
export interface CardContentProps extends CollapsibleContentProps {}

/**
 * Props for the card footer component.
 */
export interface CardFooterProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the card title root component.
 */
export interface CardTitleRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the card title component.
 */
export interface CardTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the card description component.
 */
export interface CardDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the card collapsible trigger component.
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
 * Props for the card compact component.
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
   * Props forwarded to the header element.
   */
  headerProps?: CardHeaderProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: CardContentProps;
  /**
   * Props forwarded to the footer element.
   */
  footerProps?: CardFooterProps;
  /**
   * Props forwarded to the title root element.
   */
  titleRootProps?: CardTitleRootProps;
  /**
   * Props forwarded to the title element.
   */
  titleProps?: CardTitleProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: CardDescriptionProps;
}

/**
 * Emits for the card compact component.
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
