export { default as BreadcrumbRoot } from './breadcrumb-root.vue';
export { default as BreadcrumbList } from './breadcrumb-list.vue';
export { default as BreadcrumbItem } from './breadcrumb-item.vue';
export { default as BreadcrumbLink } from './breadcrumb-link.vue';
export { default as BreadcrumbPage } from './breadcrumb-page.vue';
export { default as BreadcrumbSeparator } from './breadcrumb-separator.vue';
export { default as BreadcrumbEllipsis } from './breadcrumb-ellipsis.vue';

export { provideBreadcrumbUi } from './context';

export type {
  BreadcrumbRootProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
  BreadcrumbLinkProps,
  BreadcrumbUiSlot,
  BreadcrumbUi
} from './types';
