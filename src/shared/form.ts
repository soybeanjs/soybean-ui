import type { FormFieldProps } from '../types';
import { isArrayValue, isNonNullObject, isPrimitive } from './value';

/**
 * 生成表单字段名称，支持嵌套结构
 *
 * @example
 *   createFieldName('user', 0, 'name'); // 'user[0][name]'
 *   createFieldName('form', 'profile', 'email'); // 'form[profile][email]'
 *
 * @param baseName - 基础字段名
 * @param paths - 嵌套路径（可以是字符串或数字）
 * @returns 格式化的字段名，如 "user[0][name]"
 */
export function createFieldName(baseName: string, ...paths: (string | number)[]): string {
  return paths.reduce<string>((name, path) => `${name}[${String(path)}]`, baseName);
}

/**
 * 解析原始值为表单字段
 *
 * @param name - 字段名
 * @param value - 原始值
 * @returns 表单字段数组
 */
export function parsePrimitiveValue(name: string, value: string | number | boolean): FormFieldProps[] {
  return [{ name, value }];
}

/**
 * 解析数组值为表单字段
 *
 * @example
 *   parseArrayValue('items', ['a', 'b']);
 *   // [{ name: 'items[0]', value: 'a' }, { name: 'items[1]', value: 'b' }]
 *
 *   parseArrayValue('users', [{ name: 'John', age: 30 }]);
 *   // [{ name: 'users[0][name]', value: 'John' }, { name: 'users[0][age]', value: 30 }]
 *
 * @param baseName - 基础字段名
 * @param array - 数组值
 * @returns 表单字段数组
 */
export function parseArrayValue(baseName: string, array: unknown[]): FormFieldProps[] {
  return array.flatMap((item, index) => {
    if (isNonNullObject(item)) {
      // 处理对象数组
      return Object.entries(item).map(([key, value]) => ({
        name: createFieldName(baseName, index, key),
        value
      }));
    }
    // 处理原始值数组
    return {
      name: createFieldName(baseName, index),
      value: item
    };
  });
}

/**
 * 解析对象值为表单字段
 *
 * @example
 *   parseObjectValue('user', { name: 'John', age: 30 });
 *   // [{ name: 'user[name]', value: 'John' }, { name: 'user[age]', value: 30 }]
 *
 * @param baseName - 基础字段名
 * @param obj - 对象值
 * @returns 表单字段数组
 */
export function parseObjectValue(baseName: string, obj: Record<string, unknown>): FormFieldProps[] {
  return Object.entries(obj).map(([key, value]) => ({
    name: createFieldName(baseName, key),
    value
  }));
}

/**
 * 解析任意值为表单字段数组
 *
 * @example
 *   parseFormValue('test', 'hello'); // [{ name: 'test', value: 'hello' }]
 *   parseFormValue('items', [1, 2, 3]); // [{ name: 'items[0]', value: 1 }, ...]
 *   parseFormValue('user', { name: 'John' }); // [{ name: 'user[name]', value: 'John' }]
 *
 * @param name - 字段名
 * @param value - 要解析的值
 * @returns 表单字段数组
 */
export function parseFormValue(name: string, value: unknown): FormFieldProps[] {
  if (!name) {
    return [];
  }

  // 处理原始值
  if (isPrimitive(value)) {
    return parsePrimitiveValue(name, value);
  }

  // 处理数组值
  if (isArrayValue(value)) {
    return parseArrayValue(name, value);
  }

  // 处理对象值
  if (isNonNullObject(value)) {
    return parseObjectValue(name, value);
  }

  // 处理 null、undefined
  if (value === null || value === undefined) {
    return [];
  }

  // 兜底处理：将未知类型转换为字符串
  return [{ name, value: String(value) }];
}
