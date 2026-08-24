import type { ComputedRef, ShallowRef, VNodeChild } from 'vue';
import type { ButtonProps } from '@soybeanjs/headless/button';
import type { PortalProps } from '@soybeanjs/headless/portal';
import type { PrimitiveWithBaseProps } from '@soybeanjs/headless/primitive';
import type {
  Align,
  BaseProps,
  Direction,
  DisclosureState,
  DismissableLayerEmits,
  FocusScopeEmits,
  ForceMountProps,
  Placement,
  UiClass,
  VNodeRef
} from '@soybeanjs/headless/types';
import type { Padding, ReferenceElement, Side } from '@floating-ui/dom';

export type EpTriggerType = 'click' | 'hover' | 'contextmenu';

export type EpReferenceElement = ReferenceElement;

export type EpOpenChangeReason =
  | 'trigger-click'
  | 'trigger-hover'
  | 'trigger-contextmenu'
  | 'trigger-focus'
  | 'dismiss-outside'
  | 'dismiss-escape'
  | 'parent-close'
  | 'imperative';

export interface EpRootProps {
  dir?: Direction;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  disabled?: boolean;
}

export type EpRootEmits = {
  'update:open': [value: boolean, reason: EpOpenChangeReason];
};

export interface EpRootSlotProps {
  open: boolean;
  reason: EpOpenChangeReason;
  close: () => void;
  dir: Direction;
}

export type EpRootSlots = {
  default?: (props: EpRootSlotProps) => VNodeChild;
};

export interface EpTriggerProps extends ButtonProps {
  trigger?: EpTriggerType;
  reference?: ReferenceElement;
  openDelay?: number;
  closeDelay?: number;
  skipDelayDuration?: number;
  pressOpenDelay?: number;
  openOnFocus?: boolean;
}

export interface EpTriggerConfiguration {
  type: EpTriggerType;
  openDelay: number;
  closeDelay: number;
  skipDelayDuration: number;
  pressOpenDelay: number;
  openOnFocus: boolean;
  disabled: boolean;
}

/**
 * Properties for the positioner that floats above the anchor. Mirrors the positioning surface of
 * the headless `PopperPositioner` with the prototype's own defaults.
 */
export interface EpPositionerProps extends BaseProps, ForceMountProps {
  /**
   * The placement of the floating element.
   *
   * If used, it will override the `side` and `align` props.
   *
   * @defaultValue undefined
   */
  placement?: Placement;
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur and
   * avoidCollisions is enabled.
   *
   * @defaultValue 'bottom'
   */
  side?: Side;
  /**
   * The distance in pixels from the trigger.
   *
   * @defaultValue 0
   */
  sideOffset?: number;
  /**
   * Flip to the opposite side when colliding with boundary.
   *
   * @defaultValue true
   */
  sideFlip?: boolean;
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   *
   * @defaultValue 'center'
   */
  align?: Align;
  /**
   * An offset in pixels from the `start` or `end` alignment options.
   *
   * @defaultValue 0
   */
  alignOffset?: number;
  /**
   * Flip alignment when colliding with boundary.
   * May only occur when `prioritizePosition` is true.
   *
   * @defaultValue true
   */
  alignFlip?: boolean;
  /**
   * When `true`, overrides the side and align preferences to prevent collisions with boundary edges.
   *
   * @defaultValue true
   */
  avoidCollisions?: boolean;
  /**
   * The element used as the collision boundary. By default this is the viewport, though you can provide additional
   * element(s) to be included in this check.
   *
   * @defaultValue [ ]
   */
  collisionBoundary?: Element | null | Array<Element | null>;
  /**
   * The distance in pixels from the boundary edges where collision detection should occur. Accepts a number (same for
   * all sides), or a partial padding object, for example: { top: 20, left: 20 }.
   *
   * @defaultValue 0
   */
  collisionPadding?: Padding;
  /**
   * The padding between the arrow and the edges of the content. If your content has border-radius, this will prevent it
   * from overflowing the corners.
   *
   * @defaultValue 0
   */
  arrowPadding?: number;
  /**
   * When `true`, hides the arrow when it cannot be centered
   * to the reference element.
   *
   * @defaultValue true
   */
  hideShiftedArrow?: boolean;
  /**
   * The sticky behavior on the align axis. `partial` will keep the content in the boundary as long as the trigger is at
   * least partially in the boundary whilst "always" will keep the content in the boundary regardless.
   *
   * @defaultValue 'partial'
   */
  sticky?: 'partial' | 'always';
  /**
   * Whether to hide the content when the trigger becomes fully occluded.
   *
   * @defaultValue false
   */
  hideWhenDetached?: boolean;
  /**
   * The type of CSS position property to use.
   *
   * @defaultValue 'fixed'
   */
  positionStrategy?: 'absolute' | 'fixed';
  /**
   * Strategy to update the position of the floating element on every animation frame.
   *
   * @defaultValue 'optimized'
   */
  updatePositionStrategy?: 'optimized' | 'always';
  /**
   * Whether to disable the update position for the content when the layout shifted.
   *
   * @defaultValue false
   */
  disableUpdateOnLayoutShift?: boolean;
  /**
   * Force content to be position within the viewport. Might overlap the reference element, which may not be desired.
   *
   * @defaultValue false
   */
  prioritizePosition?: boolean;
  /**
   * The custom element or virtual element that will be set as the reference to position the floating element. If
   * provided, it will replace the default anchor element.
   */
  reference?: ReferenceElement;
  /**
   * Whether focus is trapped inside the popup while open (Tab cycles within the layer and body
   * scroll is locked for modal layers).
   *
   * @defaultValue modal
   */
  trapFocus?: boolean;
}

export type EpPositionerEmits = DismissableLayerEmits &
  FocusScopeEmits & {
    placed: [];
  };

export interface EpPopupProps extends BaseProps {}

export interface EpArrowProps extends BaseProps {}

export interface EpPortalProps extends PortalProps {}

/** Properties for the anchor (reference) element, optionally overriding the reference. */
export interface EpAnchorProps extends PrimitiveWithBaseProps {
  reference?: ReferenceElement;
}

/** Data provided by the positioner for the popup and arrow to consume. */
export interface EpPositionerContextParams {
  arrowX: ComputedRef<number>;
  arrowY: ComputedRef<number>;
  hideArrow: ComputedRef<boolean>;
  placedSide: ComputedRef<Side>;
  placedAlign: ComputedRef<Align>;
  isPositioned: ComputedRef<boolean>;
  setArrowElement: (nodeRef: VNodeRef) => void;
}

export interface EpSubProps extends EpRootProps {}

export type EpSubEmits = EpRootEmits;

export type EpSubSlots = EpRootSlots;

export interface EpSubTriggerProps extends EpTriggerProps {}

export interface EpCompactProps extends EpRootProps {
  trigger?: EpTriggerType;
  openDelay?: number;
  closeDelay?: number;
  skipDelayDuration?: number;
  pressOpenDelay?: number;
  openOnFocus?: boolean;
  placement?: Placement;
  showArrow?: boolean;
  triggerProps?: EpTriggerProps;
  portalProps?: EpPortalProps;
  positionerProps?: EpPositionerProps;
  popupProps?: EpPopupProps;
  arrowProps?: EpArrowProps;
}

export type EpCompactEmits = EpRootEmits & EpPositionerEmits;

export type EpCompactSlots = {
  default?: (props: EpRootSlotProps) => VNodeChild;
  trigger?: () => VNodeChild;
};

export type EpUiSlot = 'anchor' | 'positioner' | 'popup' | 'arrow' | 'trigger' | 'subTrigger';

export type EpUi = UiClass<EpUiSlot>;

export interface EpRootContext {
  open: ShallowRef<boolean>;
  reason: ShallowRef<EpOpenChangeReason>;
  dir: ComputedRef<Direction>;
  modal: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  dataState: ComputedRef<DisclosureState>;
  triggerType: ShallowRef<EpTriggerType>;
  triggerElement: ShallowRef<HTMLElement | undefined>;
  positionerElement: ShallowRef<HTMLElement | undefined>;
  popupElement: ShallowRef<HTMLElement | undefined>;
  anchorElement: ShallowRef<EpReferenceElement | undefined>;
  triggerId: ShallowRef<string>;
  popupId: ShallowRef<string>;
  hasCustomAnchor: ComputedRef<boolean>;
  parent: EpRootContext | undefined;
  children: ShallowRef<readonly EpRootContext[]>;
  isSub: ComputedRef<boolean>;
  nestingLevel: ComputedRef<number>;
  isPointerInTransit: ShallowRef<boolean>;
  isPointerInTree: ComputedRef<boolean>;
  configureTrigger: (configuration: EpTriggerConfiguration) => void;
  onOpenChange: (value: boolean, reason?: EpOpenChangeReason) => void;
  onOpenToggle: (reason: EpOpenChangeReason) => void;
  onHoverOpen: (reason?: Extract<EpOpenChangeReason, 'trigger-hover' | 'trigger-focus'>) => void;
  onHoverClose: (reason?: Extract<EpOpenChangeReason, 'trigger-hover' | 'trigger-focus'>) => void;
  cancelHoverClose: () => void;
  onTriggerElementChange: (element: HTMLElement | undefined) => void;
  onPositionerElementChange: (element: HTMLElement | undefined) => void;
  onPopupElementChange: (element: HTMLElement | undefined) => void;
  onAnchorElementChange: (element: EpReferenceElement | undefined) => void;
  onPositionerUpdateChange: (update: (() => void) | undefined) => void;
  requestPositionerUpdate: () => void;
  onTriggerPointerInsideChange: (value: boolean) => void;
  onPopupPointerInsideChange: (value: boolean) => void;
  registerCustomAnchor: () => () => void;
  registerChild: (child: EpRootContext) => () => void;
  closeDescendants: () => void;
  clearTimers: () => void;
}
