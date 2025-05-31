import type { ButtonHTMLAttributes, ShallowRef } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  ForceMountProps,
  PropsToContext,
  TrapFocusProps
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type {
  PopperAnchorProps as PopoverAnchorProps,
  PopperArrowProps as PopoverArrowProps,
  PopperContentProps
} from '../popper/types';
import type { PortalProps as PopoverPortalProps } from '../portal/types';

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

export interface PopoverRootContextParams extends PropsToContext<PopoverRootProps, 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PopoverContentImplProps extends PopperContentProps, TrapFocusProps, DismissableLayerProps {}
export type PopoverContentImplEmits = DismissableLayerEmits & {
  /** Event handler called when auto-focusing on open. Can be prevented. */
  openAutoFocus: [event: Event];
  /** Event handler called when auto-focusing on close. Can be prevented. */
  closeAutoFocus: [event: Event];
};

export interface PopoverContentProps
  extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'>,
    ForceMountProps {}
export type PopoverContentEmits = PopoverContentImplEmits;

export interface PopoverTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export type { PopoverAnchorProps, PopoverArrowProps, PopoverPortalProps };
