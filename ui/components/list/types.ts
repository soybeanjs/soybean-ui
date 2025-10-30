import type {
  ClassValue,
  ListContentProps,
  ListDescriptionProps,
  ListRootProps,
  ListThemeSlot,
  ListTitleProps,
  ListItemProps as _ListItemProps
} from '@headless';
import type { ThemeSize } from '@theme';

export type ListUi = Partial<Record<ListThemeSlot, ClassValue>>;

export interface ListProps extends ListRootProps {
  size?: ThemeSize;
  ui?: ListUi;
}

export interface ListItemProps extends _ListItemProps {
  title?: string;
  description?: string;
  contentProps?: ListContentProps;
  titleProps?: ListTitleProps;
  descriptionProps?: ListDescriptionProps;
}
