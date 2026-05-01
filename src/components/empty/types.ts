import type {
  ClassValue,
  EmptyContentProps,
  EmptyDescriptionProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyRootProps,
  EmptyTitleProps,
  EmptyUi
} from '@soybeanjs/headless';
import type { IconValue } from '../icon/types';
import type { EmptyMediaVariant } from './variants';

/**
 * Props for the empty component.
 */
export interface EmptyProps extends EmptyRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<EmptyUi>;
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Media variant.
   */
  mediaVariant?: EmptyMediaVariant;
  /**
   * Props forwarded to the header element.
   */
  headerProps?: EmptyHeaderProps;
  /**
   * Props forwarded to the media element.
   */
  mediaProps?: EmptyMediaProps;
  /**
   * Props forwarded to the content element.
   */
  contentProps?: EmptyContentProps;
  /**
   * Props forwarded to the title element.
   */
  titleProps?: EmptyTitleProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: EmptyDescriptionProps;
}

export type { EmptyMediaVariant };
