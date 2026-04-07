import type { ComputedRef, CSSProperties, HTMLAttributes, ShallowRef } from 'vue';
import type { Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type ScrollAreaType = 'auto' | 'always' | 'hover' | 'scroll' | 'glimpse';
export type ScrollAreaOrientation = 'horizontal' | 'vertical';
export type ScrollAreaState = 'hidden' | 'visible';

export interface ScrollAreaRootProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** Controls scrollbar visibility behavior. */
  type?: ScrollAreaType;
  /** The reading direction of the scroll area. */
  dir?: Direction;
  /** Delay before transient scrollbars are hidden. */
  scrollHideDelay?: number;
}

export interface ScrollAreaViewportProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** Adds a nonce to the injected style tag. */
  nonce?: string;
}

export interface ScrollAreaScrollbarProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /** The scrollbar orientation. */
  orientation?: ScrollAreaOrientation;
}

export interface ScrollAreaThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface ScrollAreaCornerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export type ScrollAreaRootEmits = {};

export interface ScrollAreaRootContext extends PropsToContext<ScrollAreaRootProps, 'scrollHideDelay' | 'type'> {
  dir: ComputedRef<Direction>;
  isHovering: ShallowRef<boolean>;
  rootElement: ShallowRef<HTMLElement | undefined>;
  viewportElement: ShallowRef<HTMLElement | undefined>;
  contentElement: ShallowRef<HTMLElement | undefined>;
  scrollbarXEnabled: ShallowRef<boolean>;
  scrollbarYEnabled: ShallowRef<boolean>;
  scrollbarXVisible: ShallowRef<boolean>;
  scrollbarYVisible: ShallowRef<boolean>;
  scrollbarXSize: ShallowRef<number>;
  scrollbarYSize: ShallowRef<number>;
  onViewportChange: (element?: HTMLElement) => void;
  onContentChange: (element?: HTMLElement) => void;
  onScrollbarEnabledChange: (orientation: ScrollAreaOrientation, enabled: boolean) => void;
  onScrollbarVisibleChange: (orientation: ScrollAreaOrientation, visible: boolean) => void;
  onScrollbarSizeChange: (orientation: ScrollAreaOrientation, size: number) => void;
}

export interface ScrollAreaScrollbarContext {
  orientation: ComputedRef<ScrollAreaOrientation>;
  dataState: ComputedRef<ScrollAreaState>;
  hasOverflow: ComputedRef<boolean>;
  thumbStyle: ComputedRef<CSSProperties>;
  onThumbPointerDown: (event: PointerEvent) => void;
  onThumbPointerUp: () => void;
}

export type ScrollAreaUiSlot = 'root' | 'viewport' | 'scrollbar' | 'thumb' | 'corner';

export type ScrollAreaUi = UiClass<ScrollAreaUiSlot>;
