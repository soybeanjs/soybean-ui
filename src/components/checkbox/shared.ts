import type { CheckedState } from '../../types';

export function isIndeterminate(checked?: CheckedState | null): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getCheckedState(checked?: CheckedState | null) {
  if (isIndeterminate(checked)) {
    return 'indeterminate';
  }
  return checked ? 'checked' : 'unchecked';
}
