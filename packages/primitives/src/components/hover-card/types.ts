import type { Ref } from 'vue';
import type { PopperAnchorProps, PopperArrowProps, PopperContentProps } from '../popper';
import type { TeleportProps } from '../teleport';
import type { PrimitiveProps } from '../primitive';
import type { DismissableLayerEmits } from '../dismissable-layer';

// HoverCardRoot
export interface HoverCardRootProps {
  /** The open state of the hover card when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the hover card. Can be bound as `v-model:open`. */
  open?: boolean;
  /** The duration from when the mouse enters the trigger until the hover card opens. */
  openDelay?: number;
  /** The duration from when the mouse leaves the trigger or content until the hover card closes. */
  closeDelay?: number;
}

export type HoverCardRootEmits = {
  /** Event handler called when the open state of the hover card changes. */
  'update:open': [value: boolean];
};

export interface HoverCardRootContext {
  open: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  onDismiss: () => void;
  hasSelectionRef: Ref<boolean>;
  isPointerDownOnContentRef: Ref<boolean>;
  isPointerInTransitRef: Ref<boolean>;
  triggerElement: Ref<HTMLElement | undefined>;
}

// HoverCardArrow
export interface HoverCardArrowProps extends PopperArrowProps {}
export type HoverCardArrowPropsWithPrimitive = HoverCardArrowProps & PrimitiveProps;

// HoverCardPortal
export interface HoverCardPortalProps extends TeleportProps {}

// HoverCardTrigger
export interface HoverCardTriggerProps extends PopperAnchorProps {}
export type HoverCardTriggerPropsWithPrimitive = HoverCardTriggerProps & PrimitiveProps;

// HoverCardContentImpl
export interface HoverCardContentImplProps extends PopperContentProps {}
export type HoverCardContentImplEmits = DismissableLayerEmits;

// HoverCardContent
export interface HoverCardContentProps extends HoverCardContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type HoverCardContentEmits = DismissableLayerEmits;
