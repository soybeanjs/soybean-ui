export function getProgressIndicatorStyle(valuePercent: number | null) {
  if (valuePercent === null) {
    return undefined;
  }

  return {
    transform: `translateX(-${100 - valuePercent}%)`
  };
}
