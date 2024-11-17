import type { CheckedState } from './types';

export function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getState(checked: CheckedState) {
  if (isIndeterminate(checked)) {
    return 'indeterminate';
  }

  return checked ? 'checked' : 'unchecked';
}
