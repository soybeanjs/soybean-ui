import type { HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';

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

export type BadgeUiSlot = 'root' | 'content';

export type BadgeUi = UiClass<BadgeUiSlot>;
