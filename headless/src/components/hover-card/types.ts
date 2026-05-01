import type { ComputedRef, ShallowRef } from 'vue';
import type { DismissableLayerEmits, DisclosureState, ForceMountProps, PropsToContext } from '../../types';
import type { PopperAnchorProps, PopperArrowProps, PopperPopupProps, PopperPositionerProps } from '../popper/types';
import type { PortalProps } from '../portal/types';

export interface HoverCardRootProps {
  /** The open state of the hover card when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the hover card. */
  open?: boolean;
  /** The duration from when the pointer enters the trigger until the hover card opens. */
  openDelay?: number;
  /** The duration from when the pointer leaves the trigger or popup until the hover card closes. */
  closeDelay?: number;
}

export interface HoverCardRootEmits {
  /** Event handler called when the open state of the hover card changes. */
  'update:open': [value: boolean];
}

export interface HoverCardPositionerImplProps extends PopperPositionerProps {}
export type HoverCardPositionerImplEmits = Pick<
  DismissableLayerEmits,
  'escapeKeyDown' | 'pointerDownOutside' | 'focusOutside'
>;

export interface HoverCardPositionerProps extends HoverCardPositionerImplProps, ForceMountProps {}
export type HoverCardPositionerEmits = HoverCardPositionerImplEmits;

export interface HoverCardPopupProps extends PopperPopupProps {}

export interface HoverCardRootContextParams extends PropsToContext<HoverCardRootProps, 'openDelay' | 'closeDelay'> {
  open: ShallowRef<boolean | undefined>;
}

export interface HoverCardRootContext extends HoverCardRootContextParams {
  dataState: ComputedRef<DisclosureState>;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  onTriggerElementChange: (element: HTMLElement) => void;
  popupElement: ShallowRef<HTMLElement | undefined>;
  onPopupElementChange: (element: HTMLElement) => void;
  hasSelectionRef: ShallowRef<boolean>;
  isPointerDownOnPopupRef: ShallowRef<boolean>;
  isPointerInTransitRef: ShallowRef<boolean>;
  onOpen: () => void;
  onClose: () => void;
  onDismiss: () => void;
}

export type {
  PopperArrowProps as HoverCardArrowProps,
  PopperUiSlot as HoverCardUiSlot,
  PopperUi as HoverCardUi
} from '../popper/types';
export type { PortalProps as HoverCardPortalProps } from '../portal/types';
export type { PopperAnchorProps as HoverCardTriggerProps } from '../popper/types';

export interface HoverCardCompactProps extends HoverCardRootProps {
  placement?: PopperPositionerProps['placement'];
  showArrow?: boolean;
  triggerProps?: PopperAnchorProps;
  portalProps?: PortalProps;
  positionerProps?: HoverCardPositionerProps;
  popupProps?: HoverCardPopupProps;
  arrowProps?: PopperArrowProps;
}

export type HoverCardCompactEmits = HoverCardRootEmits & HoverCardPositionerEmits;

export interface HoverCardCompactSlots {
  default?: () => any;
  trigger?: () => any;
}
