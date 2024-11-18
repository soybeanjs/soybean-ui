import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive/types';
import type { TeleportProps } from '../teleport/types';
import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer/types';
import type { PopperAnchorProps, PopperArrowProps, PopperContentProps } from '../popper/types';
import type { FocusScopeProps } from '../focus-scope/types';

export interface PopoverRootProps {
  /** The open state of the popover when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the popover. */
  open?: boolean;
  /**
   * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover
   * content will be visible to screen readers.
   *
   * @defaultValue false
   */
  modal?: boolean;
}
export type PopoverRootEmits = {
  /** Event handler called when the open state of the popover changes. */
  'update:open': [value: boolean];
};

export interface PopoverRootContext {
  triggerElement: Ref<HTMLElement | undefined>;
  triggerId: string;
  contentId: string;
  open: Ref<boolean>;
  modal: Ref<boolean>;
  onOpenChange: (value: boolean) => void;
  onOpenToggle: () => void;
  hasCustomAnchor: Ref<boolean>;
}

export interface PopoverPortalProps extends TeleportProps {}

export type PopoverContentImplEmits = DismissableLayerEmits & {
  /** Event handler called when auto-focusing on open. Can be prevented. */
  openAutoFocus: [event: Event];
  /** Event handler called when auto-focusing on close. Can be prevented. */
  closeAutoFocus: [event: Event];
};

export interface PopoverContentImplProps extends PopperContentProps, DismissableLayerProps {
  /**
   * Whether focus should be trapped within the `MenuContent`
   *
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped'];
}
export type PopoverContentImplPropsWithPrimitive = PopoverContentImplProps & PrimitiveProps;

export interface PopoverContentProps extends PopoverContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type PopoverContentPropsWithPrimitive = PopoverContentProps & PrimitiveProps;

export type PopoverContentEmits = PopoverContentImplEmits;

export interface PopoverCloseProps extends PrimitiveProps {}
export type PopoverClosePropsWithPrimitive = PopoverCloseProps & PrimitiveProps;

export interface PopoverArrowProps extends PopperArrowProps {}
export type PopoverArrowPropsWithPrimitive = PopoverArrowProps & PrimitiveProps;

export interface PopoverAnchorProps extends PopperAnchorProps {}
export type PopoverAnchorPropsWithPrimitive = PopoverAnchorProps & PrimitiveProps;
