import type { ComponentPublicInstance, Ref } from 'vue';
import type { Side } from '../../types';

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

export type DrawerRootContextParams = UseDrawerProps & DialogEmitHandlers;

export interface DrawerRootContext {
  open: Ref<boolean>;
  isOpen: Ref<boolean>;
  modal: Ref<boolean>;
  hasBeenOpened: Ref<boolean>;
  drawerRef: Ref<ComponentPublicInstance | null>;
  overlayRef: Ref<ComponentPublicInstance | null>;
  handleRef: Ref<ComponentPublicInstance | null>;
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

export type DrawerRootProps = {
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
  modal?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  nested?: boolean;
  direction?: DrawerDirection;
  /** When `true` the `body` doesn't get any styles assigned from Vaul */
  noBodyStyles?: boolean;
  handleOnly?: boolean;
  preventScrollRestoration?: boolean;
} & (WithFadeFromProps | WithoutFadeFromProps);

export interface DrawerRootEmits {
  (e: 'drag', percentageDragged: number): void;
  (e: 'release', open: boolean): void;
  (e: 'close'): void;
  (e: 'update:open', open: boolean): void;
  (e: 'update:activeSnapPoint', val: string | number): void;
}

export interface DialogEmitHandlers {
  emitDrag: (percentageDragged: number) => void;
  emitRelease: (open: boolean) => void;
  emitClose: () => void;
  emitOpenChange: (open: boolean) => void;
}

export interface DrawerHandleProps {
  preventCycle?: boolean;
}
