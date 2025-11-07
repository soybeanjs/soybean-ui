import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ClassValue } from '../../types';

export interface ListRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListItemProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export type ListThemeSlot = 'root' | 'item' | 'content' | 'title' | 'description';

export type ListUi = Record<ListThemeSlot, ClassValue>;

export interface ListThemeContextParams {
  ui: ComputedRef<ListUi>;
}
