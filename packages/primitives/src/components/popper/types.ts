import type { Ref } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
import type { Align, ClassValueProp, PrimitiveProps, Side } from '../../types';
import type { ArrowProps } from '../arrow';

export interface Measurable {
  getBoundingClientRect: () => DOMRect;
}

export interface PopperRootContext {
  anchor: Ref<ReferenceElement | undefined>;
  onAnchorChange: (element: ReferenceElement | undefined) => void;
}

export interface PopperContentProps extends ClassValueProp {
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur and
   * avoidCollisions is enabled.
   *
   * @defaultValue 'top'
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
  collisionPadding?: number | Partial<Record<Side, number>>;

  /**
   * The padding between the arrow and the edges of the content. If your content has border-radius, this will prevent it
   * from overflowing the corners.
   *
   * @defaultValue 0
   */
  arrowPadding?: number;

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

  /** The type of CSS position property to use. */
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
   * Force content to be position within the viewport.
   *
   * Might overlap the reference element, which may not be desired.
   *
   * @defaultValue false
   */
  prioritizePosition?: boolean;

  /**
   * The custom element or virtual element that will be set as the reference to position the floating element.
   *
   * If provided, it will replace the default anchor element.
   */
  reference?: ReferenceElement;
}
export type PopperContentPropsWithPrimitive = PopperContentProps & PrimitiveProps;

export type PopperContentEmits = {
  placed: [void];
};

export interface PopperContentContext {
  placedSide: Ref<Side>;
  onArrowChange: (arrow: HTMLElement | undefined) => void;
  arrowX?: Ref<number>;
  arrowY?: Ref<number>;
  shouldHideArrow: Ref<boolean>;
}

export interface PopperArrowProps extends ArrowProps {}
export type PopperArrowPropsWithPrimitive = PopperArrowProps & PrimitiveProps;

export interface PopperAnchorProps extends ClassValueProp {
  /**
   * The reference (or anchor) element that is being referred to for positioning.
   *
   * If not provided will use the current component as anchor.
   */
  reference?: ReferenceElement;
}
export type PopperAnchorPropsWithPrimitive = PopperAnchorProps & PrimitiveProps;
