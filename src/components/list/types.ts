import type {
  ListContentProps,
  ListDescriptionProps,
  ListRootProps,
  ListTitleProps,
  ListUi,
  ListItemProps as _ListItemProps
} from '@soybeanjs/headless/list';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the list component.
 */
export interface ListProps extends ListRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<ListUi>;
}

/**
 * Properties for the list item component.
 */
export interface ListItemProps extends _ListItemProps {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: ListContentProps;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: ListTitleProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: ListDescriptionProps;
}
