import type { Component } from 'vue';
import type { ClassValue, ClassValueProp, ThemeSize } from '../../types';

export type BreadcrumbRootProps = ClassValueProp & {
  size?: ThemeSize;
};

export type BreadcrumbListProps = ClassValueProp;

export type BreadcrumbItemProps = ClassValueProp;

export type BreadcrumbPageProps = ClassValueProp;

export type AnchorTarget = '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;

export type BreadcrumbLinkProps = ClassValueProp & {
  disabled?: boolean;
  href?: string;
  target?: AnchorTarget;
};

export type BreadcrumbEllipsisProps = ClassValueProp;

export type BreadcrumbSeparatorProps = ClassValueProp;

export type BreadcrumbItem = Omit<BreadcrumbLinkProps, 'class'> & {
  label: string;
  value: string;
  icon?: Component;
};

export type BreadcrumbProps<T extends BreadcrumbItem> = BreadcrumbRootProps & {
  items: T[];
  listClass?: ClassValue;
  itemClass?: ClassValue;
  pageClass?: ClassValue;
  linkClass?: ClassValue;
  ellipsisClass?: ClassValue;
  separatorClass?: ClassValue;
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
