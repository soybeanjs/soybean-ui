export function isSegmentNavigationKey(key: string) {
  return key === 'ArrowRight' || key === 'ArrowLeft';
}

export function isNumberString(value: string) {
  return !Number.isNaN(Number.parseInt(value));
}

export function isAcceptableSegmentKey(key: string) {
  const acceptableSegmentKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', ' ', 'a', 'A', 'p', 'P'];

  return acceptableSegmentKeys.includes(key) || isNumberString(key);
}

export function getSegmentElements(parentElement: HTMLElement): Element[] {
  return Array.from(parentElement.querySelectorAll('[data-soybean-date-field-segment]')).filter(
    item => item.getAttribute('data-soybean-date-field-segment') !== 'literal'
  );
}
