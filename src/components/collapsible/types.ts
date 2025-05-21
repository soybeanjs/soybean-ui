import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { ClassValueProp, PropsToContext } from '../../types';

export interface CollapsibleRootProps extends PrimitiveProps {
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

export type CollapsibleRootEmits = {
  /** Event handler called when the open state of the collapsible changes. */
  'update:open': [value: boolean];
};

export interface CollapsibleContentProps extends ClassValueProp, PrimitiveProps {
  /**
   * Used to force mounting when more control is needed.
   *
   * Useful when controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}

export type CollapsibleContentEmits = {
  contentFound: [];
};

export interface CollapsibleTriggerProps extends ClassValueProp, PrimitiveProps {}

export interface CollapsibleContextParams extends PropsToContext<CollapsibleRootProps, 'disabled' | 'unmountOnHide'> {
  open: Ref<boolean>;
}
