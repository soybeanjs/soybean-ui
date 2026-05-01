import type { ComputedRef, CSSProperties, HTMLAttributes, ShallowRef } from 'vue';
import type { Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Supported scroll area values.
 */
export type ScrollAreaType = 'auto' | 'always' | 'hover' | 'scroll' | 'glimpse';
/**
 * Type information for the scroll area orientation component.
 */
export type ScrollAreaOrientation = 'horizontal' | 'vertical';
/**
 * State values for the scroll area component.
 */
export type ScrollAreaState = 'hidden' | 'visible';

/**
 * Props for the scroll area root component.
 */
export interface ScrollAreaRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** Controls scrollbar visibility behavior. */
  type?: ScrollAreaType;
  /** The reading direction of the scroll area. */
  dir?: Direction;
  /** Delay before transient scrollbars are hidden. */
  scrollHideDelay?: number;
}

/**
 * Props for the scroll area viewport component.
 */
export interface ScrollAreaViewportProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** Adds a nonce to the injected style tag. */
  nonce?: string;
}

/**
 * Props for the scroll area scrollbar component.
 */
export interface ScrollAreaScrollbarProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The scrollbar orientation. */
  orientation?: ScrollAreaOrientation;
}

/**
 * Props for the scroll area thumb component.
 */
export interface ScrollAreaThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the scroll area corner component.
 */
export interface ScrollAreaCornerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Emits for the scroll area root component.
 */
export type ScrollAreaRootEmits = {};

/**
 * Context for the scroll area root component.
 */
export interface ScrollAreaRootContext extends PropsToContext<ScrollAreaRootProps, 'scrollHideDelay' | 'type'> {
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Whether the item is hovered.
   */
  isHovering: ShallowRef<boolean>;
  /**
   * Reference to the root element.
   */
  rootElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Viewport element used by the component context.
   */
  viewportElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Content element used by the component context.
   */
  contentElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Whether scrollbar xenabled.
   */
  scrollbarXEnabled: ShallowRef<boolean>;
  /**
   * Whether scrollbar yenabled.
   */
  scrollbarYEnabled: ShallowRef<boolean>;
  /**
   * Whether scrollbar xvisible.
   */
  scrollbarXVisible: ShallowRef<boolean>;
  /**
   * Whether scrollbar yvisible.
   */
  scrollbarYVisible: ShallowRef<boolean>;
  /**
   * Scrollbar xsize used by the component context.
   */
  scrollbarXSize: ShallowRef<number>;
  /**
   * Scrollbar ysize used by the component context.
   */
  scrollbarYSize: ShallowRef<number>;
  /**
   * Callback invoked when the viewport changes.
   */
  onViewportChange: (element?: HTMLElement) => void;
  /**
   * Callback invoked when the content changes.
   */
  onContentChange: (element?: HTMLElement) => void;
  /**
   * Callback invoked when the scrollbar enabled changes.
   */
  onScrollbarEnabledChange: (orientation: ScrollAreaOrientation, enabled: boolean) => void;
  /**
   * Callback invoked when the scrollbar visible changes.
   */
  onScrollbarVisibleChange: (orientation: ScrollAreaOrientation, visible: boolean) => void;
  /**
   * Callback invoked when the scrollbar size changes.
   */
  onScrollbarSizeChange: (orientation: ScrollAreaOrientation, size: number) => void;
}

/**
 * Context for the scroll area scrollbar component.
 */
export interface ScrollAreaScrollbarContext {
  /**
   * Orientation of the component.
   */
  orientation: ComputedRef<ScrollAreaOrientation>;
  /**
   * Data state used by the component context.
   */
  dataState: ComputedRef<ScrollAreaState>;
  /**
   * Whether the component has overflow.
   */
  hasOverflow: ComputedRef<boolean>;
  /**
   * Thumb style used by the component context.
   */
  thumbStyle: ComputedRef<CSSProperties>;
  /**
   * Callback invoked when the thumb pointer down event fires.
   */
  onThumbPointerDown: (event: PointerEvent) => void;
  /**
   * Callback invoked when the thumb pointer up event fires.
   */
  onThumbPointerUp: () => void;
}

/**
 * Available UI slots for the scroll area component.
 */
export type ScrollAreaUiSlot = 'root' | 'viewport' | 'scrollbar' | 'thumb' | 'corner';

/**
 * UI class overrides for the scroll area component.
 */
export type ScrollAreaUi = UiClass<ScrollAreaUiSlot>;
