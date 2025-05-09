import type { Component } from 'vue';
import type { AnchorTarget, ClassValue, ClassValueProp } from '@soybean-ui/primitives';
import type { BreadcrumbSlots, ThemeSize } from '@soybean-ui/variants';

export interface BreadcrumbRootProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface BreadcrumbListProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface BreadcrumbItemProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface BreadcrumbPageProps extends ClassValueProp {}

export interface BreadcrumbLinkProps extends ClassValueProp {
  disabled?: boolean;
  href?: string;
  target?: AnchorTarget;
}

export interface BreadcrumbEllipsisProps extends ClassValueProp {}

export interface BreadcrumbSeparatorProps extends ClassValueProp {}

export interface BreadcrumbItem extends Omit<BreadcrumbLinkProps, 'class'> {
  label: string;
  value: string;
  icon?: Component;
}

export type BreadcrumbUi = Partial<Record<BreadcrumbSlots, ClassValue>>;

export type BreadcrumbProps<T extends BreadcrumbItem> = BreadcrumbRootProps & {
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
};

export type BreadcrumbEmits<T extends BreadcrumbItem> = {
  (e: 'click', item: T): void;
};
