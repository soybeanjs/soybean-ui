import type {
  ListContentProps,
  ListDescriptionProps,
  ListRootProps,
  ListTitleProps,
  ListUi,
  ListItemProps as _ListItemProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface ListProps extends ListRootProps {
  size?: ThemeSize;
  ui?: Partial<ListUi>;
}

export interface ListItemProps extends _ListItemProps {
  title?: string;
  description?: string;
  contentProps?: ListContentProps;
  titleProps?: ListTitleProps;
  descriptionProps?: ListDescriptionProps;
}
