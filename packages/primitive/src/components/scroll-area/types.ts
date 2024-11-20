import type { Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { Direction } from '../../types';

export interface ScrollAreaSizes {
  content: number;
  viewport: number;
  scrollbar: {
    size: number;
    paddingStart: number;
    paddingEnd: number;
  };
}

export type ScrollType = 'auto' | 'always' | 'scroll' | 'hover';

// ScrollAreaRoot
export interface ScrollAreaRootProps {
  /**
   * Describes the nature of scrollbar visibility, similar to how the scrollbar preferences in MacOS control visibility
   * of native scrollbars.
   *
   * `auto` - means that scrollbars are visible when content is overflowing on the corresponding orientation. <br>
   * `always` - means that scrollbars are always visible regardless of whether the content is overflowing.<br> `scroll`
   *
   * - means that scrollbars are visible when the user is scrolling along its corresponding orientation.<br> `hover` -
   *   when the user is scrolling along its corresponding orientation and when the user is hovering over the scroll
   *   area.
   */
  type?: ScrollType;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * If type is set to either `scroll` or `hover`, this prop determines the length of time, in milliseconds, <br> before
   * the scrollbars are hidden after the user stops interacting with scrollbars.
   */
  scrollHideDelay?: number;
}

export type ScrollAreaRootPropsWithPrimitive = ScrollAreaRootProps & PrimitiveProps;

export interface ScrollAreaRootContext {
  type: Ref<ScrollType>;
  dir: Ref<Direction>;
  scrollHideDelay: Ref<number>;
  scrollArea: Ref<HTMLElement | undefined>;
  viewport: Ref<HTMLElement | undefined>;
  onViewportChange: (viewport: HTMLElement | null) => void;
  content: Ref<HTMLElement | undefined>;
  onContentChange: (content: HTMLElement) => void;
  scrollbarX: Ref<HTMLElement | undefined>;
  onScrollbarXChange: (scrollbar: HTMLElement | null) => void;
  scrollbarXEnabled: Ref<boolean>;
  onScrollbarXEnabledChange: (rendered: boolean) => void;
  scrollbarY: Ref<HTMLElement | undefined>;
  onScrollbarYChange: (scrollbar: HTMLElement | null) => void;
  scrollbarYEnabled: Ref<boolean>;
  onScrollbarYEnabledChange: (rendered: boolean) => void;
  onCornerWidthChange: (width: number) => void;
  onCornerHeightChange: (height: number) => void;
}

// ScrollAreaViewport
export interface ScrollAreaViewportProps {
  /**
   * Will add `nonce` attribute to the style tag which can be used by Content Security Policy. <br> If omitted, inherits
   * globally from `ConfigProvider`.
   */
  nonce?: string;
}

export type ScrollAreaViewportPropsWithPrimitive = ScrollAreaViewportProps & PrimitiveProps;

// ScrollAreaScrollbar
export interface ScrollAreaScrollbarProps {
  /** The orientation of the scrollbar */
  orientation?: 'vertical' | 'horizontal';
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

export type ScrollAreaScrollbarPropsWithPrimitive = ScrollAreaScrollbarProps & PrimitiveProps;

export interface ScrollAreaScollbarContext {
  as: Ref<PrimitiveProps['as']>;
  orientation: Ref<'vertical' | 'horizontal'>;
  forceMount?: Ref<boolean>;
  isHorizontal: Ref<boolean>;
  asChild: Ref<boolean>;
}

// ScrollAreaScrollbarVisible
export interface ScrollAreaScrollbarVisibleContext {
  sizes: Ref<ScrollAreaSizes>;
  hasThumb: Ref<boolean>;
  handleWheelScroll: (event: WheelEvent, payload: number) => void;
  handleThumbDown: (event: MouseEvent, payload: { x: number; y: number }) => void;
  handleThumbUp: (event: MouseEvent) => void;
  handleSizeChange: (payload: ScrollAreaSizes) => void;
  onThumbPositionChange: () => void;
  onDragScroll: (payload: number) => void;
  onThumbChange: (element: HTMLElement) => void;
}

// ScrollAreaThumb
export interface ScrollAreaThumbProps {}

export type ScrollAreaThumbPropsWithPrimitive = ScrollAreaThumbProps & PrimitiveProps;

// ScrollAreaCorner
export interface ScrollAreaCornerProps {}

export type ScrollAreaCornerPropsWithPrimitive = ScrollAreaCornerProps & PrimitiveProps;

// ScrollAreaScrollbarAuto
export interface ScrollAreaScrollbarAutoProps {
  forceMount?: boolean;
}

// ScrollAreaScrollbarHover
export interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {}

// ScrollAreaScrollbarScroll
export interface ScrollAreaScrollbarScrollProps {
  forceMount?: boolean;
}

// ScrollAreaScrollbarImpl
export interface ScrollAreaScrollbarImplProps {
  isHorizontal: boolean;
}

export interface ScrollbarAreaScrollbarImplEmits {
  onDragScroll: [payload: { x: number; y: number }];
  onWheelScroll: [payload: { x: number; y: number }];
  onThumbPointerDown: [payload: { x: number; y: number }];
}
