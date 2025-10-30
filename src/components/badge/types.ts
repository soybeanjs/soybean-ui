import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { ClassValue } from '../../types';

export interface BadgeRootProps extends /** @vue-ignore */ HTMLAttributes {
  open?: boolean;
}

export type BadgeRootEmits = {
  'update:open': [open: boolean];
};

export interface BadgeContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface BadgeRootContextParams {
  open: ShallowRef<boolean | undefined>;
}

export type BadgeThemeSlot = 'root' | 'content';

export interface BadgeThemeContextParams {
  ui: ComputedRef<Record<BadgeThemeSlot, ClassValue>>;
}
