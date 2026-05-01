import type { ButtonHTMLAttributes, HTMLAttributes, ShallowRef } from 'vue';
import type { UiClass } from '../../types';
import type { IconValue } from '../_icon/types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Props for the alert root component.
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
 * Emits for the alert root component.
 */
export type AlertRootEmits = {
  /**
   * Emitted when the open changes.
   */
  'update:open': [open: boolean];
};

/**
 * Props for the alert content component.
 */
export interface AlertContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the alert title component.
 */
export interface AlertTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the alert description component.
 */
export interface AlertDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the alert close component.
 */
export interface AlertCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

/**
 * Props for the alert compact component.
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
   * Props forwarded to the content element.
   */
  contentProps?: AlertContentProps;
  /**
   * Props forwarded to the title element.
   */
  titleProps?: AlertTitleProps;
  /**
   * Props forwarded to the description element.
   */
  descriptionProps?: AlertDescriptionProps;
  /**
   * Props forwarded to the close element.
   */
  closeProps?: AlertCloseProps;
}

/**
 * Emits for the alert compact component.
 */
export type AlertCompactEmits = AlertRootEmits;

/**
 * Slots for the alert compact component.
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
 * Parameters used to create the alert root context.
 */
export interface AlertRootContextParams {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

/**
 * Available UI slots for the alert component.
 */
export type AlertUiSlot = 'root' | 'icon' | 'title' | 'description' | 'content' | 'close';

/**
 * UI class overrides for the alert component.
 */
export type AlertUi = UiClass<AlertUiSlot>;
