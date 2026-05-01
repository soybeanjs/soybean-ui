import type { HTMLAttributes } from 'vue';
import type { IconValue } from '../_icon/types';
import type { LinkBaseProps, LinkProps } from '../link/types';
import type { UiClass } from '../../types';

/**
 * Props for the breadcrumb root component.
 */
export interface BreadcrumbRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the breadcrumb list component.
 */
export interface BreadcrumbListProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the breadcrumb item component.
 */
export interface BreadcrumbItemProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the breadcrumb page component.
 */
export interface BreadcrumbPageProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the breadcrumb separator component.
 */
export interface BreadcrumbSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the breadcrumb ellipsis component.
 */
export interface BreadcrumbEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the breadcrumb link component.
 */
export interface BreadcrumbLinkProps extends LinkProps {}

/**
 * Option data for the breadcrumb component.
 */
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

/**
 * Props for the breadcrumb compact component.
 */
export interface BreadcrumbCompactProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> extends Omit<
  BreadcrumbRootProps,
  'onClick'
> {
  /**
   * Items rendered by the component.
   */
  items: T[];
  /**
   * The range of items to show ellipsis.
   *
   * When the item count is greater than 4, we will show ellipsis.
   */
  ellipsis?: true | [number, number] | null;
  /**
   * Props forwarded to the list element.
   */
  listProps?: BreadcrumbListProps;
  /**
   * Props forwarded to the item element.
   */
  itemProps?: BreadcrumbItemProps;
  /**
   * Props forwarded to the link element.
   */
  linkProps?: BreadcrumbLinkProps;
  /**
   * Props forwarded to the page element.
   */
  pageProps?: BreadcrumbPageProps;
  /**
   * Props forwarded to the separator element.
   */
  separatorProps?: BreadcrumbSeparatorProps;
  /**
   * Props forwarded to the ellipsis element.
   */
  ellipsisProps?: BreadcrumbEllipsisProps;
}

/**
 * Emits for the breadcrumb compact component.
 */
export type BreadcrumbCompactEmits<T extends BreadcrumbOptionData = BreadcrumbOptionData> = {
  /**
   * Emitted when click occurs.
   */
  click: [item: T];
};

/**
 * Slot props for the breadcrumb compact item component.
 */
export interface BreadcrumbCompactItemSlotProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> {
  /**
   * Current item data.
   */
  item: T;
  /**
   * Index of the current item.
   */
  index: number;
}

/**
 * Slot props for the breadcrumb compact ellipsis component.
 */
export interface BreadcrumbCompactEllipsisSlotProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> {
  /**
   * Ellipsis items exposed in the slot scope.
   */
  ellipsisItems: T[];
}

/**
 * Slots for the breadcrumb compact component.
 */
export type BreadcrumbCompactSlots<T extends BreadcrumbOptionData = BreadcrumbOptionData> = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the ellipsis slot.
   */
  ellipsis?: (props: BreadcrumbCompactEllipsisSlotProps<T>) => any;
  /**
   * Custom content for the ellipsis icon slot.
   */
  'ellipsis-icon'?: () => any;
  /**
   * Custom content for the separator slot.
   */
  separator?: () => any;
  /**
   * Custom content for the item leading slot.
   */
  'item-leading'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item link slot.
   */
  'item-link'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item label slot.
   */
  'item-label'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
  /**
   * Custom content for the item trailing slot.
   */
  'item-trailing'?: (props: BreadcrumbCompactItemSlotProps<T>) => any;
};

/**
 * Available UI slots for the breadcrumb component.
 */
export type BreadcrumbUiSlot = 'root' | 'list' | 'item' | 'page' | 'separator' | 'ellipsis' | 'link';

/**
 * UI class overrides for the breadcrumb component.
 */
export type BreadcrumbUi = UiClass<BreadcrumbUiSlot>;
