import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { ClassValue } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface AlertRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The controlled open state of the alert. Can be bound with `v-model:open`.
   *
   * @defaultValue true
   */
  open?: boolean;
}

export type AlertRootEmits = {
  'update:open': [open: boolean];
};

export interface AlertTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AlertDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AlertContentProps extends /** @vue-ignore */ HTMLAttributes {}

export interface AlertCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface AlertRootContextParams {
  open: ShallowRef<boolean | undefined>;
}

export type AlertThemeSlot = 'root' | 'title' | 'description' | 'content' | 'closable';

export interface AlertThemeContextParams {
  ui: ComputedRef<Record<AlertThemeSlot, ClassValue>>;
}
