import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ClassValue } from '../../types';

export interface CardRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardTitleRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export type CardThemeSlot = 'root' | 'header' | 'content' | 'footer' | 'titleRoot' | 'title' | 'description';

export interface CardThemeContextParams {
  ui: ComputedRef<Record<CardThemeSlot, ClassValue>>;
}
