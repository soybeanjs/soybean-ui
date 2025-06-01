/**
 * Select specified properties from an object
 *
 * @param obj - Source object
 * @param keys - Array of property keys to select
 * @returns New object containing specified properties
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

/**
 * Exclude specified properties from an object
 *
 * @param obj - Source object
 * @param keys - Array of property keys to exclude
 * @returns New object with specified properties excluded
 */
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

/**
 * Remove specified element from an array
 *
 * @param array - Source array
 * @param item - Element to remove
 * @returns New array with element removed
 */
export function arrayRemove<T>(array: T[], item: T) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);

  if (index !== -1) {
    updatedArray.splice(index, 1);
  }

  return updatedArray;
}

/**
 * Wraps an array around itself at a given start index Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a',
 * 'b']`
 */
export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}

/**
 * Deep clone using JSON serialization
 *
 * @param value - Value to clone
 * @returns Cloned value
 */
export function jsonClone<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * Deep clone using structured clone or JSON clone
 *
 * @param value - Value to clone
 * @returns Cloned value
 */
export function cloneValue<T>(value: T) {
  if (typeof structuredClone === 'undefined') {
    return jsonClone(value);
  }

  return structuredClone(value);
}
