import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ClassValue } from '../../types';
import type { LinkProps } from '../link/types';

export interface BreadcrumbRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbItemProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbPageProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbLinkProps extends LinkProps {}

export type BreadcrumbThemeSlot = 'root' | 'list' | 'item' | 'page' | 'separator' | 'ellipsis' | 'link';

export interface BreadcrumbThemeContextParams {
  ui: ComputedRef<Record<BreadcrumbThemeSlot, ClassValue>>;
}
