import type { FocusOutsideEvent, PointerDownOutsideEvent } from './event';
import type { DataOrientation, Direction } from './common';

export interface ForceMountProps {
  /**
   * Used to force mounting when more control is needed.
   *
   * Useful when controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}

export interface TrapFocusProps {
  /**
   * When `true`, focus cannot escape the content via keyboard, pointer, or a programmatic focus.
   *
   * @defaultValue false
   */
  trapFocus?: boolean;
}

export interface DismissableLayerProps {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside the `DismissableLayer`. Users will
   * need to click twice on outside elements to interact with them: once to close the `DismissableLayer`, and again to
   * trigger the element.
   */
  disableOutsidePointerEvents?: boolean;
}

export type DismissableLayerEmits = {
  /** Event handler called when the escape key is down. Can be prevented. */
  escapeKeydown: [event: KeyboardEvent];
  /** Event handler called when a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent];
  /** Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented. */
  focusOutside: [event: FocusOutsideEvent];
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown`
   * event happens outside or focus moves outside of it. Can be prevented.
   */
  interactOutside: [event: PointerDownOutsideEvent | FocusOutsideEvent];
};

export type FocusScopeEmits = {
  /** Event handler called when auto-focusing on mount. Can be prevented. */
  mountAutoFocus: [event: Event];
  /** Event handler called when auto-focusing on unmount. Can be prevented. */
  unmountAutoFocus: [event: Event];
};

export interface FormFieldProps<T = unknown> {
  /** The name of the field. Submitted with its owning form as part of a name/value pair. */
  name: string;
  /** The value given as data when submitted with a `name`. */
  value: T;
  /** When `true`, indicates that the user must set the value before the owning form can be submitted. */
  required?: boolean;
}

export interface RovingFocusGroupProps {
  /** The orientation of the group. Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: DataOrientation;
  /** The direction of navigation between items. */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop around
   *
   * @defaultValue false
   */
  loop?: boolean;
  /** The controlled value of the current stop item. Can be bound as `v-model`. */
  currentTabStopId?: string | null;
  /**
   * The value of the current stop item.
   *
   * Use when you do not need to control the state of the stop item.
   */
  defaultCurrentTabStopId?: string;
  /** When `true`, will prevent scrolling to the focus item when focused. */
  preventScrollOnEntryFocus?: boolean;
}

export type RovingFocusGroupEmits = {
  entryFocus: [event: Event];
  'update:currentTabStopId': [value: string | null | undefined];
};

export interface RovingFocusItemProps {
  tabStopId?: string;
  /**
   * When `false`, item will not be focusable.
   *
   * @defaultValue `true`
   */
  focusable?: boolean;
  /** When `true`, item will be initially focused. */
  active?: boolean;
  /** When `true`, shift + arrow key will allow focusing on next/previous item. */
  allowShiftKey?: boolean;
}
