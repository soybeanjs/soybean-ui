/**
 * Deep comparison of two values
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @returns boolean indicating if values are equal
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

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * The function `isValueEqualOrExist` checks if a value is equal to or exists in another value or array.
 *
 * @param {T | T[] | undefined} base - It represents the base value that you want to compare with the `current` value.
 * @param {T | T[] | undefined} current - The `current` parameter represents the current value that you want to compare
 *   with the `base` value or values.
 * @returns The `isValueEqualOrExist` function returns a boolean value. It checks if the `base` value is equal to the
 *   `current` value or if the `current` value exists within the `base` value. The function handles cases where `base`
 *   can be a single value, an array of values, or undefined.
 */
export function isValueEqualOrExist<T>(base: T | T[] | undefined, current: T | T[] | undefined) {
  if (isNullish(base)) return false;
  if (Array.isArray(base)) {
    return base.some(val => isEqual(val, current));
  }

  return isEqual(base, current);
}

export function isBlankString(value: unknown | undefined) {
  return typeof value === 'string' && value === '';
}

export function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase());
}

export function toCamelCase(str: string) {
  return str.replace(/(-\w)/g, char => char.replace('-', '').toUpperCase());
}

export function jsonClone<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function cloneValue<T>(value: T) {
  if (typeof structuredClone === 'undefined') {
    return jsonClone(value);
  }

  return structuredClone(value);
}

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]) {
  const result = {} as Omit<T, K>;

  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const k = key as unknown as K;

    if (!keys.includes(k)) {
      (result as T)[k] = obj[k];
    }
  }

  return result;
}
