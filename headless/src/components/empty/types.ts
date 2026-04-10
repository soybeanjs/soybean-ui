import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

export interface EmptyRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface EmptyHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface EmptyMediaProps extends /** @vue-ignore */ HTMLAttributes {}

export interface EmptyContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface EmptyTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface EmptyDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export type EmptyUiSlot = 'root' | 'header' | 'media' | 'content' | 'title' | 'description';

export type EmptyUi = UiClass<EmptyUiSlot>;
