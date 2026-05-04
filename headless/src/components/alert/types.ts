import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';
import type { IconValue } from '../_icon/types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the AlertRoot component.
 */
export interface AlertRootProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The controlled open state of the alert. Can be bound with `v-model:open`.
   *
   * @defaultValue true
   */
  open?: boolean;
}

/**
 * Events for the AlertRoot component.
 */
export type AlertRootEmits = {
  /**
   * Emitted when the open changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the AlertContent component.
 */
export interface AlertContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the AlertTitle component.
 */
export interface AlertTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the AlertDescription component.
 */
export interface AlertDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the AlertClose component.
 */
export interface AlertCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Properties for the AlertCompact component.
 */
export interface AlertCompactProps extends AlertRootProps {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Whether the component can be closed.
   */
  closable?: boolean;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: AlertContentProps;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: AlertTitleProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: AlertDescriptionProps;
  /**
   * Properties forwarded to the close element.
   */
  closeProps?: AlertCloseProps;
}

/**
 * Events for the AlertCompact component.
 */
export type AlertCompactEmits = AlertRootEmits;

/**
 * Slots for the AlertCompact component.
 */
export type AlertCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the leading slot.
   */
  leading?: () => any;
  /**
   * Custom content for the title slot.
   */
  title?: () => any;
  /**
   * Custom content for the description slot.
   */
  description?: () => any;
  /**
   * Custom content for the trailing slot.
   */
  trailing?: () => any;
  /**
   * Custom content for the close slot.
   */
  close?: () => any;
};

/**
 * Parameters used to create the AlertRoot context.
 */
export interface AlertRootContextParams {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

/**
 * Available UI slots for the Alert component.
 */
export type AlertUiSlot = 'root' | 'icon' | 'title' | 'description' | 'content' | 'close';

/**
 * UI class overrides for the Alert component.
 */
export type AlertUi = UiClass<AlertUiSlot>;
