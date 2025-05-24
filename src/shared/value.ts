import type { AcceptableValue, StringOrNumber } from '../types';

export function getOpenFromSingleOrMultiple(
  value: StringOrNumber,
  modelValue: AcceptableValue | AcceptableValue[],
  isSingle: boolean
) {
  if (isSingle) {
    return value === modelValue;
  }

  return Array.isArray(modelValue) && modelValue.includes(value);
}

export function getOpenState(open?: boolean) {
  return open ? 'open' : 'closed';
}

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
