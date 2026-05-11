import type { ComputedRef, ShallowRef } from 'vue';
import type { DismissableLayerEmits, DisclosureState, ForceMountProps, PropsToContext } from '../../types';
import type { PopperAnchorProps, PopperArrowProps, PopperPopupProps, PopperPositionerProps } from '../popper/types';
import type { PortalProps } from '../portal/types';

/**
 * Properties for the HoverCardRoot component.
 */
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

/**
 * Events for the HoverCardRoot component.
 */
export interface HoverCardRootEmits {
  /** Event handler called when the open state of the hover card changes. */
  'update:open': [value: boolean];
}

/**
 * Properties for the HoverCardPositionerImpl component.
 */
export interface HoverCardPositionerImplProps extends PopperPositionerProps {}
/**
 * Events for the HoverCardPositionerImpl component.
 */
export type HoverCardPositionerImplEmits = Pick<
  DismissableLayerEmits,
  'escapeKeyDown' | 'pointerDownOutside' | 'focusOutside'
>;

/**
 * Properties for the HoverCardPositioner component.
 */
export interface HoverCardPositionerProps extends HoverCardPositionerImplProps, ForceMountProps {}
/**
 * Events for the HoverCardPositioner component.
 */
export type HoverCardPositionerEmits = HoverCardPositionerImplEmits;

/**
 * Properties for the HoverCardPopup component.
 */
export interface HoverCardPopupProps extends PopperPopupProps {}

/**
 * Parameters used to create the HoverCardRoot context.
 */
export interface HoverCardRootContextParams extends PropsToContext<HoverCardRootProps, 'openDelay' | 'closeDelay'> {
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
}

/**
 * Context for the HoverCardRoot component.
 */
export interface HoverCardRootContext extends HoverCardRootContextParams {
  /**
   * Data state used by the component context.
   */
  dataState: ComputedRef<DisclosureState>;
  /**
   * Trigger element used by the component context.
   */
  triggerElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Callback invoked when the trigger element changes.
   */
  onTriggerElementChange: (element: HTMLElement) => void;
  /**
   * Popup element used by the component context.
   */
  popupElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Callback invoked when the popup element changes.
   */
  onPopupElementChange: (element: HTMLElement) => void;
  /**
   * Whether the component has selection ref.
   */
  hasSelectionRef: ShallowRef<boolean>;
  /**
   * Whether a pointer down on popup ref.
   */
  isPointerDownOnPopupRef: ShallowRef<boolean>;
  /**
   * Whether a pointer in transit ref.
   */
  isPointerInTransitRef: ShallowRef<boolean>;
  /**
   * Callback invoked when the open event fires.
   */
  onOpen: () => void;
  /**
   * Callback invoked when the close event fires.
   */
  onClose: () => void;
  /**
   * Callback invoked when the dismiss event fires.
   */
  onDismiss: () => void;
}

export type {
  PopperArrowProps as HoverCardArrowProps,
  PopperUiSlot as HoverCardUiSlot,
  PopperUi as HoverCardUi
} from '../popper/types';
export type { PortalProps as HoverCardPortalProps } from '../portal/types';
export type { PopperAnchorProps as HoverCardTriggerProps } from '../popper/types';

/**
 * Properties for the HoverCardCompact component.
 */
export interface HoverCardCompactProps extends HoverCardRootProps {
  /**
   * Placement.
   */
  placement?: PopperPositionerProps['placement'];
  /**
   * Whether to show an arrow.
   */
  showArrow?: boolean;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: PopperAnchorProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: PortalProps;
  /**
   * Properties forwarded to the positioner element.
   */
  positionerProps?: HoverCardPositionerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: HoverCardPopupProps;
  /**
   * Properties forwarded to the arrow element.
   */
  arrowProps?: PopperArrowProps;
}

/**
 * Events for the HoverCardCompact component.
 */
export type HoverCardCompactEmits = HoverCardRootEmits & HoverCardPositionerEmits;

/**
 * Slots for the HoverCardCompact component.
 */
export type HoverCardCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the trigger slot.
   */
  trigger?: () => any;
};
