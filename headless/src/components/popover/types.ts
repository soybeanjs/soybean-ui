import type { ButtonHTMLAttributes, ComputedRef, ShallowRef } from 'vue';
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  TrapFocusProps
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { DialogRootEmits, DialogRootProps } from '../dialog/types';
import type { PopperPopupProps, PopperPositionerProps } from '../popper/types';

export interface PopoverRootProps extends DialogRootProps {}

export type PopoverRootEmits = DialogRootEmits;

export interface PopoverCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

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

export interface PopoverPositionerContextParams {
  pointerEvents: ComputedRef<'auto' | 'none' | undefined>;
}

export type { PopperAnchorProps as PopoverAnchorProps } from '../popper/types';
