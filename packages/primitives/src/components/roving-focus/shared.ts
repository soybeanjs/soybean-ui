import type { DataOrientation, Direction, FocusIntent, NavigationKeys } from '../../types';

export const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';
export const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export const MAP_KEY_TO_FOCUS_INTENT: Record<NavigationKeys, FocusIntent> = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last'
};

export function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== 'rtl') return key;

  if (key === 'ArrowLeft') return 'ArrowRight';

  if (key === 'ArrowRight') return 'ArrowLeft';

  return key;
}

export function getFocusIntent(event: KeyboardEvent, orientation?: DataOrientation, dir?: Direction) {
  const key = getDirectionAwareKey(event.key, dir);

  if (orientation === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key)) {
    return undefined;
  }

  if (orientation === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key)) {
    return undefined;
  }

  return MAP_KEY_TO_FOCUS_INTENT[key as NavigationKeys];
}

export function focusFirst(candidates: HTMLElement[], preventScroll?: boolean, rootNode?: Document | ShadowRoot) {
  const PREVIOUSLY_FOCUSED_ELEMENT = rootNode?.activeElement ?? document.activeElement;

  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }

    candidate.focus({ preventScroll });

    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) {
      return;
    }
  }
}
