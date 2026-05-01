import type { ButtonHTMLAttributes, HTMLAttributes, Ref } from 'vue';
import type { ForceMountProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Props for the collapsible root component.
 */
export interface CollapsibleRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The open state of the collapsible when it is initially rendered.
   *
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /** The controlled open state of the collapsible. Can be bound with `v-model`. */
  open?: boolean;
  /** When `true`, prevents the user from interacting with the collapsible. */
  disabled?: boolean;
  /** When `true`, the element will be unmounted on closed state. */
  unmountOnHide?: boolean;
}

/**
 * Emits for the collapsible root component.
 */
export type CollapsibleRootEmits = {
  /** Event handler called when the open state of the collapsible changes. */
  'update:open': [value: boolean];
};

/**
 * Props for the collapsible content component.
 */
export interface CollapsibleContentProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the collapsible trigger component.
 */
export interface CollapsibleTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /** When `true`, prevents the user from toggling the collapsible. */
  disabledCollapsible?: boolean;
}

/**
 * Parameters used to create the collapsible root context.
 */
export interface CollapsibleRootContextParams extends PropsToContext<
  CollapsibleRootProps,
  'disabled' | 'unmountOnHide'
> {
  /**
   * Whether the component is open.
   */
  open: Ref<boolean | undefined>;
}

/**
 * Available UI slots for the collapsible component.
 */
export type CollapsibleUiSlot = 'root' | 'trigger' | 'content';

/**
 * UI class overrides for the collapsible component.
 */
export type CollapsibleUi = UiClass<CollapsibleUiSlot>;
