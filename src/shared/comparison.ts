import { isNullish } from './guard';

/**
 * Deep compare if two values are equal
 *
 * @param a - The first value
 * @param b - The second value
 * @returns Whether the values are equal
 */
export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;

  const typeA = typeof a;
  const typeB = typeof b;

  if (typeA !== typeB) return false;

  if (typeA === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => isEqual(item, b[index]));
    }

    if (a === null || b === null) return false;

    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);

    if (keysA.length !== keysB.length) return false;

    // @ts-expect-error - b is not undefined
    return keysA.every(key => Object.hasOwn(b, key) && isEqual(a[key], b[key]));
  }

  return false;
}

/**
 * Check if value is equal or exists in array
 *
 * @param base - Base value (can be a single value, array, or undefined)
 * @param current - Current value (can be a single value, array, or undefined)
 * @returns Whether it's equal or exists
 */
export function isValueEqualOrExist<T>(base: T | T[] | undefined, current: T | undefined) {
  if (isNullish(base)) return false;
  if (Array.isArray(base)) {
    return base.some(val => isEqual(val, current));
  }

  return isEqual(base, current);
}
