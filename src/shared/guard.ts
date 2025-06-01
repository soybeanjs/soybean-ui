/**
 * Type guard: check if value is a primitive type
 *
 * @param value - The value to check
 * @returns Whether the value is string | number | boolean
 */
export function isPrimitive(value: unknown): value is string | number | boolean {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
}

/**
 * Type guard: check if value is a non-null object (excluding arrays)
 *
 * @param value - The value to check
 * @returns Whether the value is a non-null object
 */
export function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Type guard: check if value is an array
 *
 * @param value - The value to check
 * @returns Whether the value is an array
 */
export function isArrayValue(value: unknown): value is unknown[] {
  return typeof value === 'object' && Array.isArray(value);
}

/**
 * Type guard: check if value is null or undefined
 *
 * @param value - The value to check
 * @returns Whether the value is null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Type guard: check if value is an empty string
 *
 * @param value - The value to check
 * @returns Whether the value is an empty string
 */
export function isBlankString(value: unknown | undefined): value is string {
  return typeof value === 'string' && value === '';
}
