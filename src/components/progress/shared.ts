export function getProgressIndicatorStyle(valuePercent: number | null, direction: 'ltr' | 'rtl' = 'ltr') {
  if (valuePercent === null) {
    return undefined;
  }

  return {
    transform: `translateX(${direction === 'rtl' ? 100 - valuePercent : -(100 - valuePercent)}%)`
  };
}
