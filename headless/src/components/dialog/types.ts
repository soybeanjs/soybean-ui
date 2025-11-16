import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, Ref } from 'vue';
import type {
  ClassValue,
  DismissableLayerEmits,
  DismissableLayerProps,
  FocusScopeEmits,
  ForceMountProps,
  MaybePromise,
  PropsToContext,
  TrapFocusProps
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface DialogRootProps {
  /**
   * The controlled open state of the dialog. Can be bound with `v-model:open`.
   *
   * @defaultValue undefined
   */
  open?: boolean;
  /**
   * The open state of the dialog when it is initially rendered. Use when you do not need to control its open state.
   *
   * @defaultValue false
   */
  defaultOpen?: boolean;
  /**
   * The modality of the dialog. When set to `true`, interaction with outside elements will be disabled and only dialog
   * content will be visible to screen readers.
   *
   * @defaultValue true
   */
  modal?: boolean;
}
export type DialogRootEmits = {
  /** Event handler called when the open state of the dialog changes. */
  'update:open': [value: boolean];
};

export interface DialogTriggerProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {}

export interface DialogOverlayProps extends ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

export interface DialogContentImplProps
  extends PrimitiveProps,
    TrapFocusProps,
    DismissableLayerProps,
    /** @vue-ignore */ HTMLAttributes {}
export type DialogContentImplEmits = DismissableLayerEmits & FocusScopeEmits;

export interface DialogContentProps
  extends Omit<DialogContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'>,
    ForceMountProps {}
export type DialogContentEmits = DialogContentImplEmits;

export interface DialogTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogCloseProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * Called before the dialog is closed. Can be used to prevent the dialog from closing.
   * @returns A boolean or a promise that resolves to a boolean. if returns `false`, the dialog will not close.
   */
  beforeClose?: () => MaybePromise<boolean>;
}

export interface DialogHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface DialogRootContextParams extends PropsToContext<DialogRootProps, 'modal'> {
  open: Ref<boolean | undefined>;
}

export type DialogThemeSlot = 'overlay' | 'header' | 'content' | 'footer' | 'title' | 'description';

export type DialogUi = Record<DialogThemeSlot, ClassValue>;

export interface DialogThemeContextParams {
  ui: ComputedRef<DialogUi>;
}
