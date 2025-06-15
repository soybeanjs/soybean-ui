import type { ComputedRef, HTMLAttributes } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
import type { Align, Side, VNodeRef } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { ArrowProps as PopperArrowProps } from '../arrow/types';

export interface PopperAnchorProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * The reference (or anchor) element that is being referred to for positioning. If not provided will use the current
   * component as anchor.
   */
  reference?: ReferenceElement;
}

export interface PopperContentProps extends /** @vue-ignore */ HTMLAttributes {
  /**
   * The function to set the floating element.
   *
   * @param el - The floating element.
   */
  floatingRef?: (el: HTMLElement) => void;
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
}

export interface PopperContentEmits {
  /** Event handler called when the content is placed */
  placed: [];
}

/** Context interface for PopperContent */
export interface PopperContentContextParams {
  /** The side where the content is placed */
  placedSide: ComputedRef<Side>;
  /** X position of the arrow */
  arrowX: ComputedRef<number>;
  /** Y position of the arrow */
  arrowY: ComputedRef<number>;
  /** Whether the arrow should be hidden */
  shouldHideArrow: ComputedRef<boolean>;
  /** Function to set the arrow element */
  setArrowElement: (nodeRef: VNodeRef) => void;
}

export type PopperSlot = 'content' | 'arrow';

export interface PopoverThemeContextParams {
  ui: ComputedRef<Record<PopperSlot, string>>;
}

export type { PopperArrowProps };
