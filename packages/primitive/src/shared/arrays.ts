import { isEqual } from 'ohash';

/**
 * The function `areEqual` compares two arrays and returns true if they are equal in length and have the same elements
 * at corresponding indexes.
 *
 * @param {any[]} arrayA - An array of any type of elements.
 * @param {any[]} arrayB - It looks like you haven't provided the value for `arrayB`. Could you please provide the
 *   arrayB value so that I can assist you further?
 * @returns The function `areEqual` is returning a boolean value, either `true` if the two input arrays `arrayA` and
 *   `arrayB` are equal, or `false` if they are not equal.
 */
export function areEqual(arrayA: any[], arrayB: any[]): boolean {
  if (arrayA.length !== arrayB.length) return false;

  for (let index = 0; index < arrayA.length; index++) {
    if (arrayA[index] !== arrayB[index]) return false;
  }

  return true;
}

/**
 * Splits an array into chunks of a given size.
 *
 * @example
 *   ```ts
 *   const arr = [1, 2, 3, 4, 5, 6, 7, 8];
 *   const chunks = chunk(arr, 3);
 *   // chunks = [[1, 2, 3], [4, 5, 6], [7, 8]]
 *   ```;
 *
 * @param arr The array to split.
 * @param size The size of each chunk.
 * @returns An array of arrays, where each sub-array has `size` elements from the original array.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));

  return result;
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

  const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);

  return array.slice(minIndex, maxIndex + 1);
}

/**
 * Wraps an array around itself at a given start index Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a',
 * 'b']`
 */
export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
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
export function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated = search.length > 1 && Array.from(search).every(char => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;

  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch) {
    wrappedValues = wrappedValues.filter(v => v !== currentMatch);
  }

  const nextMatch = wrappedValues.find(value => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));

  return nextMatch !== currentMatch ? nextMatch : undefined;
}

export function flatten<U, T extends { children: any[] }>(items: T[]): U[] {
  return items.reduce((acc: any[], item: T) => {
    acc.push(item);

    if (item.children) acc.push(...flatten(item.children));

    return acc;
  }, []);
}
