import type { HTMLAttributes } from 'vue';
import type { LinkProps } from '../link/types';
import type { UiClass } from '../../types';

export interface BreadcrumbRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbListProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbItemProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbPageProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbSeparatorProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbEllipsisProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BreadcrumbLinkProps extends LinkProps {}

export type BreadcrumbUiSlot = 'root' | 'list' | 'item' | 'page' | 'separator' | 'ellipsis' | 'link';

export type BreadcrumbUi = UiClass<BreadcrumbUiSlot>;
