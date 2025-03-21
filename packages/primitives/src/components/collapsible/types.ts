import type { ComputedRef, Ref } from 'vue';
import type { ClassValueProp, DisclosureState } from '../../types';
import type { PrimitiveProps } from '../primitive';

export interface CollapsibleRootProps extends ClassValueProp, PrimitiveProps {
  /**
   * The open state of the collapsible when it is initially rendered. <br> Use when you do not need to control its open
   * state.
   */
  defaultOpen?: boolean;
  /** The controlled open state of the collapsible. Can bind with `v-model`. */
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

export type CollapsibleRootSlots = {
  default: (props: Pick<CollapsibleRootProps, 'open'>) => any;
};

export interface CollapsibleContentProps extends ClassValueProp, PrimitiveProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

export type CollapsibleContentEmits = {
  contentFound: [void];
};

export interface CollapsibleTriggerProps extends ClassValueProp, PrimitiveProps {}

export interface CollapsibleRootContextParams {
  disabled?: Ref<boolean>;
  open: Ref<boolean>;
  unmountOnHide: Ref<boolean>;
}

export interface CollapsibleRootContext extends CollapsibleRootContextParams {
  contentId: Ref<string>;
  initContentId: () => void;
  dataState: ComputedRef<DisclosureState>;
  dataDisabled: ComputedRef<'' | undefined>;
  onOpenToggle: () => void;
}
