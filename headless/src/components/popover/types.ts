import type { ButtonHTMLAttributes, ComputedRef, ShallowRef } from 'vue';
import type { DismissableLayerProps, ForceMountProps, TrapFocusProps } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { DialogContentImplEmits, DialogRootEmits, DialogRootProps } from '../dialog/types';
import type { PopperContentProps } from '../popper/types';

export interface PopoverRootProps extends DialogRootProps {}

export type PopoverRootEmits = DialogRootEmits;

export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PopoverContentImplProps extends PopperContentProps, TrapFocusProps, DismissableLayerProps {}

export type PopoverContentImplEmits = DialogContentImplEmits;

export interface PopoverContentProps extends PopperContentProps, ForceMountProps {}

export type PopoverContentEmits = PopoverContentImplEmits;

export interface PopoverTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface PopoverRootContextParams {
  modal: ComputedRef<boolean | undefined>;
  open: ShallowRef<boolean | undefined>;
}

export type { PopperAnchorProps as PopoverAnchorProps } from '../popper/types';
