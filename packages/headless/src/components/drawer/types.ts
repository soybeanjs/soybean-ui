import type { ShallowRef, Ref } from 'vue';
import type { BaseProps, Side, SwipeDirection, UiClass, VNodeRef } from '../../types';
import type {
  DialogCancelEmits,
  DialogCancelProps,
  DialogCloseEmits,
  DialogCloseProps,
  DialogCompactEmits,
  DialogCompactProps,
  DialogCompactSlots,
  DialogConfirmEmits,
  DialogConfirmProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogModal,
  DialogRootEmits,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerEmits,
  DialogTriggerProps,
  DialogUiSlot
} from '../dialog/types';

/**
 * A snap position: a fraction of the viewport (0–1), a pixel offset (> 1), or a CSS length string (`'30rem'`).
 */
export type DrawerSnapPoint = number | string;

/**
 * Modality tier of the drawer. Reuses the dialog tier vocabulary.
 *
 * - `true` — full modal: focus trap, outside pointer blocking, scroll lock
 * - `'trap-focus'` — traps focus but keeps outside pointer events alive (non-modal side panels)
 * - `false` — non-modal
 */
export type DrawerModal = DialogModal;

/**
 * Properties for the UseDrawer component.
 */
export interface UseDrawerProps {
  /**
   * Whether the component is open.
   */
  open: Ref<boolean>;
  /**
   * Snap points.
   */
  snapPoints: Ref<DrawerSnapPoint[] | undefined>;
  /**
   * Whether snapping walks one level at a time instead of jumping to the nearest point.
   */
  snapToSequentialPoints: Ref<boolean>;
  /**
   * Dismissible.
   */
  dismissible: Ref<boolean>;
  /**
   * Nested.
   */
  nested: Ref<boolean>;
  /**
   * Fixed.
   */
  fixed: Ref<boolean | undefined>;
  /**
   * Modal tier of the component context.
   */
  modal: Ref<DrawerModal>;
  /**
   * Whether the component should scale background.
   */
  shouldScaleBackground: Ref<boolean | undefined>;
  /**
   * Set background color on scale.
   */
  setBackgroundColorOnScale: Ref<boolean | undefined>;
  /**
   * Active snap point.
   */
  snapPoint: Ref<DrawerSnapPoint | null | undefined>;
  /**
   * Fade from index.
   */
  fadeFromIndex: Ref<number | undefined>;
  /**
   * Close threshold.
   */
  closeThreshold: Ref<number>;
  /**
   * Scroll lock timeout.
   */
  scrollLockTimeout: Ref<number>;
  /**
   * Direction.
   */
  side: Ref<Side>;
  /**
   * No body styles.
   */
  noBodyStyles: Ref<boolean>;
  /**
   * Prevent scroll restoration.
   */
  preventScrollRestoration: Ref<boolean>;
  /**
   * Handle only.
   */
  handleOnly: Ref<boolean>;
}

/**
 * Parameters used to create the DrawerRoot context.
 */
export type DrawerRootContextParams = UseDrawerProps & DrawerEmitHandlers;

/**
 * Context for the DrawerRoot component.
 */
export interface DrawerRootContext {
  /**
   * Whether the component is open.
   */
  open: Ref<boolean>;
  /**
   * Whether an open.
   */
  isOpen: Ref<boolean>;
  /**
   * Modal used by the component context.
   */
  modal: Ref<DrawerModal>;
  /**
   * Whether the component has been opened.
   */
  hasBeenOpened: Ref<boolean>;
  /**
   * Drawer ref used by the component context.
   */
  drawerRef: ShallowRef<HTMLElement | null | undefined>;
  /**
   * Set drawer ref used by the component context.
   */
  setDrawerRef: (nodeRef: VNodeRef) => void;
  /**
   * Overlay ref used by the component context.
   */
  overlayRef: ShallowRef<HTMLElement | null | undefined>;
  /**
   * Set overlay ref used by the component context.
   */
  setOverlayRef: (nodeRef: VNodeRef) => void;
  /**
   * Handle ref used by the component context.
   */
  handleRef: ShallowRef<HTMLElement | null | undefined>;
  /**
   * Set handle ref used by the component context.
   */
  setHandleRef: (nodeRef: VNodeRef) => void;
  /**
   * Whether a dragging.
   */
  isDragging: Ref<boolean>;
  /**
   * Whether a swipe gesture is in flight.
   */
  isSwiping: Ref<boolean>;
  /**
   * Callback invoked when a swipe gesture starts or ends.
   */
  onSwipingChange: (swiping: boolean) => void;
  /**
   * Drag start time used by the component context.
   */
  dragStartTime: Ref<Date | null>;
  /**
   * Whether dragging is allowed.
   */
  isAllowedToDrag: Ref<boolean>;
  /**
   * Snap points used by the component context.
   */
  snapPoints: Ref<DrawerSnapPoint[] | undefined>;
  /**
   * Whether the component has snap points.
   */
  hasSnapPoints: Ref<boolean>;
  /**
   * Keyboard is open used by the component context.
   */
  keyboardIsOpen: Ref<boolean>;
  /**
   * Active snap point used by the component context.
   */
  snapPoint: Ref<DrawerSnapPoint | null | undefined>;
  /**
   * Pointer start used by the component context.
   */
  pointerStart: Ref<number>;
  /**
   * Dismissible used by the component context.
   */
  dismissible: Ref<boolean>;
  /**
   * Drawer height ref used by the component context.
   */
  drawerHeightRef: Ref<number>;
  /**
   * Snap points offset used by the component context.
   */
  snapPointsOffset: Ref<number[]>;
  /**
   * Direction used by the component context.
   */
  side: Ref<Side>;
  /**
   * Callback invoked when the press event fires.
   */
  onPress: (event: PointerEvent) => void;
  /**
   * Callback invoked when the drag event fires.
   */
  onDrag: (event: PointerEvent) => void;
  /**
   * Callback invoked when the release event fires.
   */
  onRelease: (event: PointerEvent) => void;
  /**
   * Close drawer used by the component context.
   */
  closeDrawer: () => void;
  /**
   * Whether the component should fade.
   */
  shouldFade: Ref<boolean>;
  /**
   * Fade from index used by the component context.
   */
  fadeFromIndex: Ref<number | undefined>;
  /**
   * Whether the component should scale background.
   */
  shouldScaleBackground: Ref<boolean | undefined>;
  /**
   * Set background color on scale used by the component context.
   */
  setBackgroundColorOnScale: Ref<boolean | undefined>;
  /**
   * Callback invoked when the nested drag event fires.
   */
  onNestedDrag: (percentageDragged: number) => void;
  /**
   * Callback invoked when the nested release event fires.
   */
  onNestedRelease: (o: boolean) => void;
  /**
   * Callback invoked when the nested open changes.
   */
  onNestedOpenChange: (o: boolean) => void;
  /**
   * Emit close used by the component context.
   */
  emitClose: () => void;
  /**
   * Emit drag used by the component context.
   */
  emitDrag: (percentageDragged: number) => void;
  /**
   * Emit release used by the component context.
   */
  emitRelease: (open: boolean) => void;
  /**
   * Emit open change used by the component context.
   */
  emitOpenChange: (o: boolean) => void;
  /**
   * Nested used by the component context.
   */
  nested: Ref<boolean>;
  /**
   * Handle only used by the component context.
   */
  handleOnly: Ref<boolean>;
  /**
   * No body styles used by the component context.
   */
  noBodyStyles: Ref<boolean>;
}

/**
 * Properties for the WithFadeFrom component.
 */
export interface WithFadeFromProps {
  /**
   * Snap points.
   */
  snapPoints: DrawerSnapPoint[];
  /**
   * Fade from index.
   */
  fadeFromIndex: number;
}

/**
 * Properties for the WithoutFadeFrom component.
 */
export interface WithoutFadeFromProps {
  /**
   * Snap points.
   */
  snapPoints?: DrawerSnapPoint[];
  /**
   * Fade from index.
   */
  fadeFromIndex?: never;
}

/**
 * Properties for the DrawerRoot component.
 */
export type DrawerRootProps = Omit<DialogRootProps, 'modal'> & {
  /**
   * Modality tier. `true` blocks outside pointer events, `'trap-focus'` only traps focus,
   * `false` keeps the surface non-modal.
   *
   * @defaultValue true
   */
  modal?: DrawerModal;
  /**
   * The controlled snap point. Can be bound with `v-model:snapPoint`.
   */
  snapPoint?: DrawerSnapPoint | null;
  /**
   * The snap point used when the drawer is initially rendered. Use when you do not need to control it.
   */
  defaultSnapPoint?: DrawerSnapPoint | null;
  /**
   * When `true`, snaps to the next sequential snap point (one step at a time).
   * When `false`, snaps to the nearest snap point by distance.
   *
   * @defaultValue false
   */
  snapToSequentialPoints?: boolean;
  /**
   * Close threshold.
   */
  closeThreshold?: number;
  /**
   * Whether the component should scale background.
   */
  shouldScaleBackground?: boolean;
  /**
   * When `false` we don't change body's background color when the drawer is open.
   *
   * @default true
   */
  setBackgroundColorOnScale?: boolean;
  /**
   * Scroll lock timeout.
   */
  scrollLockTimeout?: number;
  /**
   * Whether fixed.
   */
  fixed?: boolean;
  /**
   * Whether dismissible.
   */
  dismissible?: boolean;
  /**
   * Whether nested.
   */
  nested?: boolean;
  /**
   * Direction.
   */
  side?: Side;
  /** When `true` the `body` doesn't get any styles assigned from Vaul */
  noBodyStyles?: boolean;
  /**
   * Whether handle only.
   */
  handleOnly?: boolean;
  /**
   * Whether prevent scroll restoration.
   */
  preventScrollRestoration?: boolean;
} & (WithFadeFromProps | WithoutFadeFromProps);

/**
 * Events for the DrawerRoot component.
 */
export type DrawerRootEmits = DialogRootEmits & {
  /**
   * Emitted when drag occurs.
   */
  drag: [percentageDragged: number];
  /**
   * Emitted when release occurs.
   */
  release: [open: boolean];
  /**
   * Emitted when close occurs.
   */
  close: [];
  /**
   * Emitted when the snap point value changes.
   */
  'update:snapPoint': [val: DrawerSnapPoint | null];
};

/**
 * Slots for the DrawerRoot component.
 */
export type DrawerRootSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: { open: boolean }) => any;
};

/**
 * Type information for DrawerEmitHandlers.
 */
export interface DrawerEmitHandlers {
  /**
   * Emit drag.
   */
  emitDrag: (percentageDragged: number) => void;
  /**
   * Emit release.
   */
  emitRelease: (open: boolean) => void;
  /**
   * Emit close.
   */
  emitClose: () => void;
  /**
   * Emit open change.
   */
  emitOpenChange: (open: boolean) => void;
}

/**
 * Properties for the DrawerTrigger component.
 */
export interface DrawerTriggerProps extends DialogTriggerProps {}

/**
 * Events for the DrawerTrigger component.
 */
export type DrawerTriggerEmits = DialogTriggerEmits;

/**
 * Properties for the DrawerHeader component.
 */
export interface DrawerHeaderProps extends DialogHeaderProps {}

/**
 * Properties for the DrawerContent component.
 */
export interface DrawerContentProps extends DialogContentProps {}

/**
 * Properties for the DrawerFooter component.
 */
export interface DrawerFooterProps extends DialogFooterProps {}

/**
 * Properties for the DrawerTitle component.
 */
export interface DrawerTitleProps extends DialogTitleProps {}

/**
 * Properties for the DrawerDescription component.
 */
export interface DrawerDescriptionProps extends DialogDescriptionProps {}

/**
 * Properties for the DrawerClose component.
 */
export interface DrawerCloseProps extends DialogCloseProps {}

/**
 * Events for the DrawerClose component.
 */
export type DrawerCloseEmits = DialogCloseEmits;

/**
 * Properties for the DrawerCancel component.
 */
export interface DrawerCancelProps extends DialogCancelProps {}

/**
 * Events for the DrawerCancel component.
 */
export type DrawerCancelEmits = DialogCancelEmits;

/**
 * Properties for the DrawerConfirm component.
 */
export interface DrawerConfirmProps extends DialogConfirmProps {}

/**
 * Events for the DrawerConfirm component.
 */
export type DrawerConfirmEmits = DialogConfirmEmits;

/**
 * Properties for the DrawerHandle component.
 */
export interface DrawerHandleProps extends BaseProps {
  /**
   * Whether prevent cycle.
   */
  preventCycle?: boolean;
}

/**
 * Properties for the DrawerViewport component.
 */
export interface DrawerViewportProps extends BaseProps {}

/**
 * Properties for the DrawerSwipeArea component.
 */
export interface DrawerSwipeAreaProps extends BaseProps {
  /**
   * Override the swipe side that opens the drawer. Defaults to the opposite of the root `side`.
   */
  swipeDirection?: SwipeDirection;
  /**
   * Disable swipe-to-open.
   *
   * @defaultValue false
   */
  disabled?: boolean;
}

/**
 * Properties for the DrawerCompact component.
 */
export type DrawerCompactProps = Omit<DialogCompactProps, 'modal'> &
  DrawerRootProps & {
    /**
     * Properties forwarded to the handle element.
     */
    handleProps?: DrawerHandleProps;
    /**
     * Render the opt-in swipe-to-open area at the drawer's edge.
     *
     * @defaultValue false
     */
    swipeable?: boolean;
    /**
     * Properties forwarded to the swipe area element.
     */
    swipeAreaProps?: DrawerSwipeAreaProps;
  };

/**
 * Events for the DrawerCompact component.
 */
export type DrawerCompactEmits = Omit<DialogCompactEmits, 'close'> & DrawerRootEmits;

/**
 * Slots for the DrawerCompact component.
 */
export type DrawerCompactSlots = DialogCompactSlots;

/**
 * Available UI slots for the Drawer component.
 */
export type DrawerUiSlot = DialogUiSlot | 'handle' | 'swipeArea';

/**
 * UI class overrides for the Drawer component.
 */
export type DrawerUi = UiClass<DrawerUiSlot>;
