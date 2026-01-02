import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

export interface CardRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardTitleRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export type CardUiSlot = 'root' | 'header' | 'content' | 'footer' | 'titleRoot' | 'title' | 'description';

export type CardUi = UiClass<CardUiSlot>;
