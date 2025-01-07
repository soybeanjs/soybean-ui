import type { ClassValueProp, FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import type { PrimitiveProps } from '../primitive';

export interface DismissableLayerProps extends ClassValueProp {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside the `DismissableLayer`. Users will
   * need to click twice on outside elements to interact with them: once to close the `DismissableLayer`, and again to
   * trigger the element.
   */
  disableOutsidePointerEvents?: boolean;
}
export type DismissableLayerPropsWithPrimitive = DismissableLayerProps & PrimitiveProps;

export type DismissableLayerEmits = {
  /** Event handler called when the escape key is down. Can be prevented. */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent];
  /** Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. */
  focusOutside: [event: FocusOutsideEvent];
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown`
   * event happens outside or focus moves outside of it. Can be prevented.
   */
  interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent];
};

export type DismissableLayerPrivateEmits = DismissableLayerEmits & {
  /** Handler called when the `DismissableLayer` should be dismissed */
  dismiss: [];
};

export interface DismissableLayerBranchProps extends ClassValueProp {}
export type DismissableLayerBranchPropsWithPrimitive = DismissableLayerBranchProps & PrimitiveProps;

export interface DismissableLayerState {
  layersRoot: Set<HTMLElement>;
  layersWithOutsidePointerEventsDisabled: Set<HTMLElement>;
  branches: Set<HTMLElement>;
}
