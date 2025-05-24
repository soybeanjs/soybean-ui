import { isNullish } from './guard';

/**
 * 深度比较两个值是否相等
 *
 * @param a - 第一个值
 * @param b - 第二个值
 * @returns 值是否相等
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
 * 检查值是否相等或存在于数组中
 *
 * @param base - 基础值（可以是单个值、数组或 undefined）
 * @param current - 当前值（可以是单个值、数组或 undefined）
 * @returns 是否相等或存在
 */
export function isValueEqualOrExist<T>(base: T | T[] | undefined, current: T | T[] | undefined) {
  if (isNullish(base)) return false;
  if (Array.isArray(base)) {
    return base.some(val => isEqual(val, current));
  }

  return isEqual(base, current);
}
