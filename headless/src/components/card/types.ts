import type { BaseProps, UiClass } from '../../types';
import type {
  CollapsibleRootProps,
  CollapsibleRootEmits,
  CollapsibleContentProps,
  CollapsibleTriggerProps
} from '../collapsible/types';

/**
 * Properties for the CardRoot component.
 */
export interface CardRootProps extends CollapsibleRootProps {}

/**
 * Events for the CardRoot component.
 */
export type CardRootEmits = CollapsibleRootEmits;

/**
 * Properties for the CardHeader component.
 */
export interface CardHeaderProps extends BaseProps {}

/**
 * Properties for the CardContent component.
 */
export interface CardContentProps extends CollapsibleContentProps {}

/**
 * Properties for the CardFooter component.
 */
export interface CardFooterProps extends BaseProps {}

/**
 * Properties for the CardTitleRoot component.
 */
export interface CardTitleRootProps extends BaseProps {}

/**
 * Properties for the CardTitle component.
 */
export interface CardTitleProps extends BaseProps {}

/**
 * Properties for the CardDescription component.
 */
export interface CardDescriptionProps extends BaseProps {}

/**
 * Properties for the CardCollapsibleTrigger component.
 */
export interface CardCollapsibleTriggerProps extends CollapsibleTriggerProps {}

/**
 * Available UI slots for the Card component.
 */
export type CardUiSlot = 'root' | 'header' | 'content' | 'footer' | 'titleRoot' | 'title' | 'description' | 'trigger';

/**
 * UI class overrides for the Card component.
 */
export type CardUi = UiClass<CardUiSlot>;

/**
 * Properties for the CardCompact component.
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
 * Events for the CardCompact component.
 */
export type CardCompactEmits = CardRootEmits;

/**
 * Slots for the CardCompact component.
 */
export type CardCompactSlots = {
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
};
