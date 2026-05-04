import type { ShallowRef, Ref, HTMLAttributes } from 'vue';
import type { Side, UiClass, VNodeRef } from '../../types';
import type {
  DialogRootProps,
  DialogRootEmits,
  DialogCompactProps,
  DialogCompactEmits,
  DialogCompactSlots,
  DialogUiSlot
} from '../dialog/types';

/**
 * Type information for the drawer direction component.
 */
export type DrawerDirection = Side;

/**
 * Type information for the snap point component.
 */
export interface SnapPoint {
  /**
   * Fraction.
   */
  fraction: number;
  /**
   * Height.
   */
  height: number;
}

/**
 * Properties for the use drawer component.
 */
export interface UseDrawerProps {
  /**
   * Whether the component is open.
   */
  open: Ref<boolean>;
  /**
   * Snap points.
   */
  snapPoints: Ref<(number | string)[] | undefined>;
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
   * Modal.
   */
  modal: Ref<boolean>;
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
  activeSnapPoint: Ref<number | string | null | undefined>;
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
  direction: Ref<DrawerDirection>;
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
 * Parameters used to create the bottom sheet root context.
 */
export type BottomSheetRootContextParams = UseDrawerProps & BottomSheetEmitHandlers;

/**
 * Context for the bottom sheet root component.
 */
export interface BottomSheetRootContext {
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
  modal: Ref<boolean>;
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
  snapPoints: Ref<(number | string)[] | undefined>;
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
  activeSnapPoint: Ref<number | string | null | undefined>;
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
  direction: Ref<DrawerDirection>;
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
 * Properties for the with fade from component.
 */
export interface WithFadeFromProps {
  /**
   * Snap points.
   */
  snapPoints: (number | string)[];
  /**
   * Fade from index.
   */
  fadeFromIndex: number;
}

/**
 * Properties for the without fade from component.
 */
export interface WithoutFadeFromProps {
  /**
   * Snap points.
   */
  snapPoints?: (number | string)[];
  /**
   * Fade from index.
   */
  fadeFromIndex?: never;
}

/**
 * Properties for the bottom sheet root component.
 */
export type BottomSheetRootProps = DialogRootProps & {
  /**
   * Active snap point.
   */
  activeSnapPoint?: number | string | null;
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
  direction?: DrawerDirection;
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
 * Events for the bottom sheet root component.
 */
export type BottomSheetRootEmits = DialogRootEmits & {
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
   * Emitted when the active snap point value changes.
   */
  'update:activeSnapPoint': [val: string | number | null];
};

/**
 * Slots for the bottom sheet root component.
 */
export type BottomSheetRootSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: { open: boolean }) => any;
};

/**
 * Type information for the bottom sheet emit handlers component.
 */
export interface BottomSheetEmitHandlers {
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
 * Properties for the bottom sheet handle component.
 */
export interface BottomSheetHandleProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * Whether prevent cycle.
   */
  preventCycle?: boolean;
}

/**
 * Properties for the bottom sheet compact component.
 */
export type BottomSheetCompactProps = DialogCompactProps &
  BottomSheetRootProps & {
    /**
     * Properties forwarded to the handle element.
     */
    handleProps?: BottomSheetHandleProps;
  };

/**
 * Events for the bottom sheet compact component.
 */
export type BottomSheetCompactEmits = Omit<DialogCompactEmits, 'close'> & BottomSheetRootEmits;

/**
 * Slots for the bottom sheet compact component.
 */
export type BottomSheetCompactSlots = DialogCompactSlots;

/**
 * Available UI slots for the bottom sheet component.
 */
export type BottomSheetUiSlot = DialogUiSlot | 'handle';

/**
 * UI class overrides for the bottom sheet component.
 */
export type BottomSheetUi = UiClass<BottomSheetUiSlot>;
