/**
 * 类型守卫：检查值是否为原始类型
 *
 * @param value - 要检查的值
 * @returns 值是否为 string | number | boolean
 */
export function isPrimitive(value: unknown): value is string | number | boolean {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
}

/**
 * 类型守卫：检查值是否为非空对象（排除数组）
 *
 * @param value - 要检查的值
 * @returns 值是否为非空对象
 */
export function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * 类型守卫：检查值是否为数组
 *
 * @param value - 要检查的值
 * @returns 值是否为数组
 */
export function isArrayValue(value: unknown): value is unknown[] {
  return typeof value === 'object' && Array.isArray(value);
}

/**
 * 类型守卫：检查值是否为 null 或 undefined
 *
 * @param value - 要检查的值
 * @returns 值是否为 null 或 undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 类型守卫：检查值是否为空字符串
 *
 * @param value - 要检查的值
 * @returns 值是否为空字符串
 */
export function isBlankString(value: unknown | undefined): value is string {
  return typeof value === 'string' && value === '';
}
