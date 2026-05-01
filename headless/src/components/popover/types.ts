import type { ButtonHTMLAttributes, ComputedRef, ShallowRef } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  TrapFocusProps,
  MaybePromise
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { DialogRootEmits, DialogRootProps } from '../dialog/types';
import type { PopperPopupProps, PopperPositionerProps, PopperArrowProps } from '../popper/types';
import type { PortalProps } from '../portal/types';

export interface PopoverRootProps extends DialogRootProps {}

export type PopoverRootEmits = DialogRootEmits;

export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  beforeClose?: () => MaybePromise<boolean | void>;
}
export type PopoverCloseEmits = {
  close: [];
};

export interface PopoverPositionerImplProps extends PopperPositionerProps, TrapFocusProps, DismissableLayerProps {}
export type PopoverPositionerImplEmits = DismissableLayerEmits & FocusScopeEmits;

export interface PopoverPositionerProps extends PopperPositionerProps, ForceMountProps {}
export type PopoverPositionerEmits = PopoverPositionerImplEmits;

export interface PopoverPopupProps extends PopperPopupProps {}

export interface PopoverTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PopoverRootContextParams {
  modal: ComputedRef<boolean | undefined>;
  open: ShallowRef<boolean | undefined>;
}

export type { PopperAnchorProps as PopoverAnchorProps } from '../popper/types';

export interface PopoverCompactProps extends PopoverRootProps {
  placement?: PopperPositionerProps['placement'];
  showArrow?: boolean;
  triggerProps?: PopoverTriggerProps;
  portalProps?: PortalProps;
  positionerProps?: PopoverPositionerProps;
  popupProps?: PopoverPopupProps;
  arrowProps?: PopperArrowProps;
  closeProps?: PopoverCloseProps;
}

export type PopoverCompactEmits = PopoverRootEmits & PopoverPositionerEmits;

export interface PopoverCompactSlots {
  default?: () => any;
  trigger?: () => any;
  close?: () => any;
}

export type { PopperUiSlot as PopoverUiSlot, PopperUi as PopoverUi } from '../popper/types';
