export type CheckedState = boolean | 'indeterminate';

export function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

export function getState(checked: CheckedState) {
  if (isIndeterminate(checked)) {
    return 'indeterminate';
  }
  return checked ? 'checked' : 'unchecked';
}

export const checkboxCssVars = {
  size: '--soybean-checkbox-size'
};

export const CHECKBOX_CONSTANTS = {
  DEFAULT_VALUE: 'on'
} as const;
