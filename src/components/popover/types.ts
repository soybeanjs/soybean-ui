import type { ButtonHTMLAttributes, ShallowRef } from 'vue';
import type { DismissableLayerProps, ForceMountProps, PropsToContext, TrapFocusProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type {
  DialogContentImplEmits as PopoverContentImplEmits,
  DialogRootEmits as PopoverRootEmits,
  DialogRootProps as PopoverRootProps
} from '../dialog/types';
import type {
  PopperAnchorProps as PopoverAnchorProps,
  PopperArrowProps as PopoverArrowProps,
  PopperContentProps
} from '../popper/types';
import type { PortalProps as PopoverPortalProps } from '../portal/types';

export interface PopoverRootContextParams extends PropsToContext<PopoverRootProps, 'modal'> {
  open: ShallowRef<boolean | undefined>;
}

export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PopoverContentImplProps extends PopperContentProps, TrapFocusProps, DismissableLayerProps {}

export interface PopoverContentProps extends PopperContentProps, ForceMountProps {}
export type PopoverContentEmits = PopoverContentImplEmits;

export interface PopoverTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export type {
  PopoverRootProps,
  PopoverRootEmits,
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverPortalProps,
  PopoverContentImplEmits
};
