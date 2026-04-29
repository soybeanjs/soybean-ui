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

export type DrawerDirection = Side;

export interface SnapPoint {
  fraction: number;
  height: number;
}

export interface UseDrawerProps {
  open: Ref<boolean>;
  snapPoints: Ref<(number | string)[] | undefined>;
  dismissible: Ref<boolean>;
  nested: Ref<boolean>;
  fixed: Ref<boolean | undefined>;
  modal: Ref<boolean>;
  shouldScaleBackground: Ref<boolean | undefined>;
  setBackgroundColorOnScale: Ref<boolean | undefined>;
  activeSnapPoint: Ref<number | string | null | undefined>;
  fadeFromIndex: Ref<number | undefined>;
  closeThreshold: Ref<number>;
  scrollLockTimeout: Ref<number>;
  direction: Ref<DrawerDirection>;
  noBodyStyles: Ref<boolean>;
  preventScrollRestoration: Ref<boolean>;
  handleOnly: Ref<boolean>;
}

export type BottomSheetRootContextParams = UseDrawerProps & BottomSheetEmitHandlers;

export interface BottomSheetRootContext {
  open: Ref<boolean>;
  isOpen: Ref<boolean>;
  modal: Ref<boolean>;
  hasBeenOpened: Ref<boolean>;
  drawerRef: ShallowRef<HTMLElement | null | undefined>;
  setDrawerRef: (nodeRef: VNodeRef) => void;
  overlayRef: ShallowRef<HTMLElement | null | undefined>;
  setOverlayRef: (nodeRef: VNodeRef) => void;
  handleRef: ShallowRef<HTMLElement | null | undefined>;
  setHandleRef: (nodeRef: VNodeRef) => void;
  isDragging: Ref<boolean>;
  dragStartTime: Ref<Date | null>;
  isAllowedToDrag: Ref<boolean>;
  snapPoints: Ref<(number | string)[] | undefined>;
  hasSnapPoints: Ref<boolean>;
  keyboardIsOpen: Ref<boolean>;
  activeSnapPoint: Ref<number | string | null | undefined>;
  pointerStart: Ref<number>;
  dismissible: Ref<boolean>;
  drawerHeightRef: Ref<number>;
  snapPointsOffset: Ref<number[]>;
  direction: Ref<DrawerDirection>;
  onPress: (event: PointerEvent) => void;
  onDrag: (event: PointerEvent) => void;
  onRelease: (event: PointerEvent) => void;
  closeDrawer: () => void;
  shouldFade: Ref<boolean>;
  fadeFromIndex: Ref<number | undefined>;
  shouldScaleBackground: Ref<boolean | undefined>;
  setBackgroundColorOnScale: Ref<boolean | undefined>;
  onNestedDrag: (percentageDragged: number) => void;
  onNestedRelease: (o: boolean) => void;
  onNestedOpenChange: (o: boolean) => void;
  emitClose: () => void;
  emitDrag: (percentageDragged: number) => void;
  emitRelease: (open: boolean) => void;
  emitOpenChange: (o: boolean) => void;
  nested: Ref<boolean>;
  handleOnly: Ref<boolean>;
  noBodyStyles: Ref<boolean>;
}

export interface WithFadeFromProps {
  snapPoints: (number | string)[];
  fadeFromIndex: number;
}

export interface WithoutFadeFromProps {
  snapPoints?: (number | string)[];
  fadeFromIndex?: never;
}

export type BottomSheetRootProps = DialogRootProps & {
  activeSnapPoint?: number | string | null;
  closeThreshold?: number;
  shouldScaleBackground?: boolean;
  /**
   * When `false` we don't change body's background color when the drawer is open.
   *
   * @default true
   */
  setBackgroundColorOnScale?: boolean;
  scrollLockTimeout?: number;
  fixed?: boolean;
  dismissible?: boolean;
  nested?: boolean;
  direction?: DrawerDirection;
  /** When `true` the `body` doesn't get any styles assigned from Vaul */
  noBodyStyles?: boolean;
  handleOnly?: boolean;
  preventScrollRestoration?: boolean;
} & (WithFadeFromProps | WithoutFadeFromProps);

export type BottomSheetRootEmits = DialogRootEmits & {
  drag: [percentageDragged: number];
  release: [open: boolean];
  close: [];
  'update:activeSnapPoint': [val: string | number | null];
};

export type BottomSheetRootSlots = {
  default?: (props: { open: boolean }) => any;
};

export interface BottomSheetEmitHandlers {
  emitDrag: (percentageDragged: number) => void;
  emitRelease: (open: boolean) => void;
  emitClose: () => void;
  emitOpenChange: (open: boolean) => void;
}

export interface BottomSheetHandleProps extends /** @vue-ignore */ HTMLAttributes {
  preventCycle?: boolean;
}

export type BottomSheetCompactProps = DialogCompactProps &
  BottomSheetRootProps & {
    handleProps?: BottomSheetHandleProps;
  };

export type BottomSheetCompactEmits = Omit<DialogCompactEmits, 'close'> & BottomSheetRootEmits;

export type BottomSheetCompactSlots = DialogCompactSlots;

export type BottomSheetUiSlot = DialogUiSlot | 'handle';

export type BottomSheetUi = UiClass<BottomSheetUiSlot>;
