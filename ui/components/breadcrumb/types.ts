import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbRootProps,
  BreadcrumbSeparatorProps,
  BreadcrumbThemeSlot,
  ClassValue
} from '@headless';
import type { ThemeSize } from '@theme';
import type { IconValue } from '../icon/types';

export interface BreadcrumbOptionData {
  /** The value of the option. */
  value?: string;
  /** The label to display in the option. */
  label: string;
  /**
   * The icon of the option.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: IconValue;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /**
   * The link props
   *
   * if provided, the option will be a link.
   */
  linkProps?: BreadcrumbLinkProps;
}

export type BreadcrumbUi = Partial<Record<BreadcrumbThemeSlot, ClassValue>>;

export interface BreadcrumbProps<T extends BreadcrumbOptionData = BreadcrumbOptionData>
  extends Omit<BreadcrumbRootProps, 'onClick'> {
  size?: ThemeSize;
  ui?: BreadcrumbUi;
  items: T[];
  /**
   * the range of items to show ellipsis
   *
   * when the item count is greater than 4, we will show ellipsis
   *
   * start: the start index of the ellipsis
   *
   * end: the end index of the ellipsis.
   */
  ellipsis?: true | [number, number] | null;
  listProps?: BreadcrumbListProps;
  itemProps?: BreadcrumbItemProps;
  pageProps?: BreadcrumbPageProps;
  separatorProps?: BreadcrumbSeparatorProps;
  ellipsisProps?: BreadcrumbEllipsisProps;
}

export type BreadcrumbEmits<T extends BreadcrumbOptionData> = {
  (e: 'click', item: T): void;
};
