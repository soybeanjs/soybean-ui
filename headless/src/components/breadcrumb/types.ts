import type { HTMLAttributes } from 'vue';
import type { IconValue } from '../_icon/types';
import type { LinkBaseProps, LinkProps } from '../link/types';
import type { UiClass } from '../../types';

export interface BreadcrumbRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbItemProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbPageProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbLinkProps extends LinkProps {}

export interface BreadcrumbOptionData extends LinkBaseProps {
  /** The value of the option. */
  value?: string;
  /** The label to display in the option. */
  label: string;
  /** The icon of the option. */
  icon?: IconValue;
  /** Whether the option is disabled. */
  disabled?: boolean;
}

export interface BreadcrumbCompactProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> extends Omit<
  BreadcrumbRootProps,
  'onClick'
> {
  items: T[];
  /**
   * The range of items to show ellipsis.
   *
   * When the item count is greater than 4, we will show ellipsis.
   */
  ellipsis?: true | [number, number] | null;
  listProps?: BreadcrumbListProps;
  itemProps?: BreadcrumbItemProps;
  linkProps?: BreadcrumbLinkProps;
  pageProps?: BreadcrumbPageProps;
  separatorProps?: BreadcrumbSeparatorProps;
  ellipsisProps?: BreadcrumbEllipsisProps;
}

export type BreadcrumbCompactEmits<T extends BreadcrumbOptionData = BreadcrumbOptionData> = {
  click: [item: T];
};

export interface BreadcrumbCompactItemSlotProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> {
  item: T;
  index: number;
}

export interface BreadcrumbCompactEllipsisSlotProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> {
  ellipsisItems: T[];
}

export type BreadcrumbCompactSlots<T extends BreadcrumbOptionData = BreadcrumbOptionData> = {
  default?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  ellipsis?: (props: BreadcrumbCompactEllipsisSlotProps<T>) => any;
  'ellipsis-icon'?: () => any;
  separator?: () => any;
  'item-leading'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  'item-link'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  'item-label'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  'item-trailing'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
};

export type BreadcrumbUiSlot = 'root' | 'list' | 'item' | 'page' | 'separator' | 'ellipsis' | 'link';

export type BreadcrumbUi = UiClass<BreadcrumbUiSlot>;
