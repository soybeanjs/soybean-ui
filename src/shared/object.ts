import { isEqual } from './comparison';

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
export function wrapArray<T>(array: T[], startIndex: number): T[] {
  if (array.length === 0) return [];

  const normalizedStartIndex = ((startIndex % array.length) + array.length) % array.length;
  return array.map((_, index) => array[(normalizedStartIndex + index) % array.length]!);
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

/**
 * This is the "meat" of the typeahead matching logic. It takes in all the values, the search and the current match, and
 * returns the next match (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character, we want the exact same behavior as if
 * we only had that one character (ie. cycle through options starting with that character)
 *
 * We also reorder the values by wrapping the array around the current match. This is so we always look forward from the
 * current match, and picking the first match will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the current match from the values because
 * otherwise it would be the first to match always and focus would never move. This is as opposed to the regular case,
 * where we don't want focus to move if the current match still matches.
 */
export function getNextMatch(values?: string[], search?: string, currentMatch?: string): string | undefined {
  // Early return for edge cases
  if (!values?.length || !search) {
    return undefined;
  }

  // Normalize repeated characters (e.g., "aaa" -> "a")
  const normalizedSearch = search.length > 1 && search[0]?.repeat(search.length) === search ? search[0] : search;

  const normalizedSearchLower = normalizedSearch.toLowerCase();
  const excludeCurrentMatch = normalizedSearch.length === 1;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;

  // Start search from the position after current match
  const startIndex = Math.max(currentMatchIndex, 0);
  const valuesLength = values.length;

  // Search through wrapped array without creating a new array
  for (let i = 0; i < valuesLength; i++) {
    const index = (startIndex + i) % valuesLength;
    const value = values[index];

    // Skip current match if we're excluding it and check if value starts with normalized search
    if ((!excludeCurrentMatch || value !== currentMatch) && value?.toLowerCase().startsWith(normalizedSearchLower)) {
      // Return undefined if it's the same as current match (no change needed)
      return value !== currentMatch ? value : undefined;
    }
  }

  return undefined;
}

/**
 * The function `findValuesBetween` takes an array and two values, then returns a subarray containing elements between
 * the first occurrence of the start value and the first occurrence of the end value in the array.
 *
 * @param {T[]} array - The `array` parameter is an array of values of type `T`.
 * @param {T} start - The `start` parameter is the value that marks the beginning of the range you want to find in the
 *   array.
 * @param {T} end - The `end` parameter in the `findValuesBetween` function represents the end value that you want to
 *   find in the array. This function will return a subarray of values that are between the `start` and `end` values in
 *   the original array.
 * @returns The `findValuesBetween` function returns an array of values from the input array that are between the
 *   `start` and `end` values (inclusive). If either the `start` or `end` values are not found in the input array, an
 *   empty array is returned.
 */
export function findValuesBetween<T>(array: T[], start: T, end: T) {
  const startIndex = array.findIndex(i => isEqual(i, start));
  const endIndex = array.findIndex(i => isEqual(i, end));
  if (startIndex === -1 || endIndex === -1) return [];

  const [minIndex, maxIndex] = ([startIndex, endIndex] as [number, number]).sort((a, b) => a - b);

  return array.slice(minIndex, maxIndex + 1);
}
