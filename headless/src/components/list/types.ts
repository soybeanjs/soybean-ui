import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

export interface ListRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListItemProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface ListDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export type ListUiSlot = 'root' | 'item' | 'content' | 'title' | 'description';

export type ListUi = UiClass<ListUiSlot>;
