import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';
import type { IconValue } from '../_icon/types';
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

export interface AlertCompactProps extends AlertRootProps {
  title?: string;
  description?: string;
  icon?: IconValue;
  closable?: boolean;
  contentProps?: AlertContentProps;
  titleProps?: AlertTitleProps;
  descriptionProps?: AlertDescriptionProps;
  closeProps?: AlertCloseProps;
}

export type AlertCompactEmits = AlertRootEmits;

export type AlertCompactSlots = {
  default?: () => any;
  leading?: () => any;
  title?: () => any;
  description?: () => any;
  trailing?: () => any;
  close?: () => any;
};

export interface AlertRootContextParams {
  open: ShallowRef<boolean | undefined>;
}

export type AlertUiSlot = 'root' | 'icon' | 'title' | 'description' | 'content' | 'close';

export type AlertUi = UiClass<AlertUiSlot>;
