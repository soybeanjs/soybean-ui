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
  const normalizedSearch = search.length > 1 && search[0].repeat(search.length) === search ? search[0] : search;

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
    if ((!excludeCurrentMatch || value !== currentMatch) && value.toLowerCase().startsWith(normalizedSearchLower)) {
      // Return undefined if it's the same as current match (no change needed)
      return value !== currentMatch ? value : undefined;
    }
  }

  return undefined;
}
